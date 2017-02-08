'use strict';

const parse = require('url').parse;
const querystring = require('querystring');

/**
 * API Gateway Client
 */
class Base {
  constructor() {}

  * get(url, opts = {}) {
    var parsed = parse(url, true);
    var maybeQuery = opts.query || opts.data;
    if (maybeQuery) {
      // append data into querystring
      Object.assign(parsed.query, maybeQuery);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.data = null;
      opts.query = null;
    }
    return yield* this.request('GET', parsed, opts);
  }

  * post(url, opts = {}) {
    var parsed = parse(url, true);
    var query = opts.query;
    if (query) {
      // append data into querystring
      Object.assign(parsed.query, query);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.query = null;
    }

    var headers = opts.headers || {};
    var type = headers['content-type'] || headers['Content-Type'];
    if (!type) {
      headers['content-type'] = 'application/json';
      type = headers['content-type'];
    }

    if (type.startsWith('application/x-www-form-urlencoded')) {
      opts.data = querystring.stringify(opts.data);
    } else if (type.startsWith('application/json')) {
      opts.data = JSON.stringify(opts.data);
    } else if (!Buffer.isBuffer(opts.data) && typeof opts.data !== 'string') {
      // 非buffer和字符串时，以JSON.stringify()序列化
      opts.data = JSON.stringify(opts.data);
    }

    return yield* this.request('POST', url, opts);
  }

  * delete(url, opts) {
    var parsed = parse(url, true);
    var maybeQuery = opts.query || opts.data;
    if (maybeQuery) {
      // append data into querystring
      Object.assign(parsed.query, maybeQuery);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.data = null;
      opts.query = null;
    }
    return yield* this.request('DELETE', parsed, opts);
  }
}

module.exports = Base;
