'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('sentMail service', () => {
  it('registered the sentMails service', () => {
    assert.ok(app.service('sentMails'));
  });
});
