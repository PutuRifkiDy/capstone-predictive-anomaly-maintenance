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
}

module.exports = new UserService();