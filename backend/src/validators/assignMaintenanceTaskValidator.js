const Joi = require('joi');

const assignMaintenanceTaskSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  ticketId: Joi.number().integer().positive().required(),
});

module.exports = {
  assignMaintenanceTaskSchema,
};