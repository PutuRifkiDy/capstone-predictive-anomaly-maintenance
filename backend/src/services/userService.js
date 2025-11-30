const db = require('../config/db');
const bcrypt = require('bcrypt');

class UserService {
    async getCurrentUser(userId) {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('User not found');
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async getAllUsers() {
        const result = await db.query(
            'SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
        );
        return result.rows;
    }

    async getUserById(id) {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('User not found');
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async updateUserId(id, { name, email, password, role }) {
        const result = await db.query('UPDATE users SET name = $1, email = $2, role = $3, password = $4 WHERE id = $5 RETURNING id', [name, email, role, password, id]);

        if (!result.rows.length) {
            throw new Error('User not found');
        }
    }

    async deleteUserById(id) {
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (!result.rows.length) {
            throw new Error('User not found');
        }
    }

}

module.exports = new UserService();