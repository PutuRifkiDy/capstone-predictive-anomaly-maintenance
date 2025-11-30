const { parse } = require('dotenv');
const userService = require('../services/userService');

class UserController {
    async getCurrentUser(req, res, next) {
        try {
            const user = await userService.getCurrentUser(req.user.id);
            res.json({ user });
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json({ users });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(parseInt(id));
            res.json({ user });
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    }

    async updateUserById(req, res, next) {
        try {
            const { id } = parseInt(req.params);
            const { name, email, role, password } = req.body;
            const user = await userService.updateUserId(id, { name, email, role, password });
            res.json({ user });
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    }

    async deleteUserById(req, res, next) {
        try {
            const { id } = parseInt(req.params);
            await userService.deleteUserById(id);
            res.json({
                status: 'success',
                message: 'User deleted successfully',
            });
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    }
}

module.exports = new UserController();