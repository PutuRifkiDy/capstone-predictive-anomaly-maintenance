const bcrypt = require('bcrypt');
const db = require('../config/db');
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require('../utils/tokenUtils');

class AuthService {
    async register({ name, email, password, role }) {
        const exitingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (exitingUser.rows[0]) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, email, role, created_at`,
            [name, email, hashedPassword, role]
        );

        return result.rows[0];
    }

    async login({ email, password }) {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }

        // Generate tokens
        const payload = { id: user.id, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days in ms
        await db.query(
            'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
            [user.id, refreshToken, expiresAt]
        );
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken
        };
    }

    async refreshToken(oldRefreshToken) {
        try {
            const tokenResult = await db.query(
                'SELECT rt.*, u.role FROM refresh_tokens rt JOIN users u ON rt.user_id = u.id WHERE rt.token = $1 AND rt.expires_at > NOW()',
                [oldRefreshToken]
            );

            const tokenRecord = tokenResult.rows[0];
            if (!tokenRecord) {
                throw new Error('Invalid or expired refresh token');
            }

            const decoded = verifyRefreshToken(oldRefreshToken);

            const payload = { id: decoded.id, role: tokenRecord.role };
            const accessToken = generateAccessToken(payload);

            return { accessToken };
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    async logout(refreshToken) {
        await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);

        return { message: 'Logged out successfully' };
    }
}

module.exports = new AuthService();