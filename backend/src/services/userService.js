const db = require('../config/db');

class UserService {
    async getCurrentUser(userId) {
        const result = await db.query('SELECT name, email, role FROM users WHERE id = $1', [userId]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async getAllUsers() {
        const result = await db.query(
            'SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
        );
        return result.rows;
    }

    async getUserById(id) {
        const result = await db.query('SELECT name, email, role, password FROM users WHERE id = $1', [id]);
        const user = result.rows[0];
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async updateUserId(id, { name, email, role }) {
        const result = await db.query('UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING id', [name, email, role, id]);

        if (!result.rows.length) {
            throw new Error('User not found');
        }
    }

    async deleteUserById(id) {
        const isAdmin = await db.query('SELECT role FROM users WHERE id = $1', [id]);
        if (isAdmin.rows[0].role === 'admin') {
            throw new Error('Cannot delete admin user');
        }
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (!result.rows.length) {
            throw new Error('User not found');
        }
    }

}

module.exports = new UserService();