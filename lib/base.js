'use strict';

const parse = require('url').parse;
const querystring = require('querystring');

/**
 * API Gateway Client
 */
class Base {
  constructor() {
  }

  * get(url, opts) {
    opts || (opts = {});
    var parsed = parse(url, true);
    if (opts && opts.data) {
      // append data into querystring
      Object.assign(parsed.query, opts.data);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.data = null;
    }
    return yield* this.request('GET', parsed, opts);
  }

  * post(url, opts) {
    opts.data = JSON.stringify(opts.data);
    return yield* this.request('POST', url, opts);
  }
}

module.exports = Base;
