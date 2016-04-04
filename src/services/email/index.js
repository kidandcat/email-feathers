'use strict';

const service = require('feathers-sequelize');
const email = require('./email-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: email(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/emails', service(options));

  // Get our initialize service to that we can bind hooks
  const emailService = app.service('/emails');

  // Set up our before hooks
  emailService.before(hooks.before);

  // Set up our after hooks
  emailService.after(hooks.after);
};
