'use strict';

const service = require('feathers-sequelize');
const sentMail = require('./sentMail-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: sentMail(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/sentMails', service(options));

  // Get our initialize service to that we can bind hooks
  const sentMailService = app.service('/sentMails');

  // Set up our before hooks
  sentMailService.before(hooks.before);

  // Set up our after hooks
  sentMailService.after(hooks.after);
};
