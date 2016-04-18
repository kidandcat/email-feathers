'use strict';

// sentMail-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const sentMail = sequelize.define('sentMails', {
    date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    _from: {
      type: Sequelize.STRING,
      allowNull: false
    },
    _to: {
      type: Sequelize.STRING,
      allowNull: false
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false
    },
    attachment: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    freezeTableName: true
  });

  sentMail.sync();

  return sentMail;
};
