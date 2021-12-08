'use strict';

const expect = require('expect.js');
const { fetchPropertyFromHeader } = require('../lib/util');

describe('util', function () {
  it('should be target charset', async function () {
    expect('binary').to.be.eql(fetchPropertyFromHeader('application/json; charset=binary', 'charset'));
    expect(undefined).to.be.eql(fetchPropertyFromHeader('application/json;', 'charset'));
    expect('utf-8').to.be.eql(fetchPropertyFromHeader('application/json;charset=utf-8;', 'charset'));
  });
});
