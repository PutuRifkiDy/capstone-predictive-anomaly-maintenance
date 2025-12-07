const Joi = require('joi');

const maintenanceTicketSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('need_maintenance', 'in_progress', 'completed').default('need_maintenance'),
});

const userIdSchema = Joi.object({
  userId: Joi.number().integer().required(),
});

module.exports = {
  maintenanceTicketSchema,
  userIdSchema
};