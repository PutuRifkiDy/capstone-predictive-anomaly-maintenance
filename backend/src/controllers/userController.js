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
}

module.exports = new UserController();