'use strict';

const parse = require('url').parse;
const querystring = require('querystring');

function loweredKeys(headers = {}) {
  var lowered = {};

  var keys = Object.keys(headers);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    lowered[key.toLowerCase()] = headers[key];
  }

  return lowered;
}


/**
 * API Gateway Client
 */
class Base {
  constructor() {}

  get(url, opts = {}) {
    var parsed = parse(url, true);
    var maybeQuery = opts.query || opts.data;
    if (maybeQuery) {
      // append data into querystring
      Object.assign(parsed.query, maybeQuery);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.data = null;
      opts.query = null;
    }

    // lowerify the header key
    opts.headers = loweredKeys(opts.headers);
    opts.signHeaders = loweredKeys(opts.signHeaders);

    return this.request('GET', parsed, opts);
  }

  post(url, opts = {}) {
    var parsed = parse(url, true);
    var query = opts.query;
    if (query) {
      // append data into querystring
      Object.assign(parsed.query, query);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.query = null;
    }

    // lowerify the header key
    opts.headers = loweredKeys(opts.headers);
    opts.signHeaders = loweredKeys(opts.signHeaders);

    var headers = opts.headers;
    var type = headers['content-type'] || headers['Content-Type'];
    if (!type) {
      headers['content-type'] = 'application/json';
      type = headers['content-type'];
    }

    var originData = opts.data;
    if (type.startsWith('application/x-www-form-urlencoded')) {
      opts.data = querystring.stringify(opts.data);
    } else if (type.startsWith('application/json')) {
      opts.data = JSON.stringify(opts.data);
    } else if (!Buffer.isBuffer(opts.data) && typeof opts.data !== 'string') {
      // 非buffer和字符串时，以JSON.stringify()序列化
      opts.data = JSON.stringify(opts.data);
    }

    return this.request('POST', parsed, opts, originData);
  }

  put(url, opts = {}) {
    var parsed = parse(url, true);
    var query = opts.query;
    if (query) {
      // append data into querystring
      Object.assign(parsed.query, query);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.query = null;
    }

    // lowerify the header key
    opts.headers = loweredKeys(opts.headers);
    opts.signHeaders = loweredKeys(opts.signHeaders);

    var headers = opts.headers;
    var type = headers['content-type'] || headers['Content-Type'];
    if (!type) {
      headers['content-type'] = 'application/json';
      type = headers['content-type'];
    }

    var originData = opts.data;
    if (type.startsWith('application/x-www-form-urlencoded')) {
      opts.data = querystring.stringify(opts.data);
    } else if (type.startsWith('application/json')) {
      opts.data = JSON.stringify(opts.data);
    } else if (!Buffer.isBuffer(opts.data) && typeof opts.data !== 'string') {
      // 非buffer和字符串时，以JSON.stringify()序列化
      opts.data = JSON.stringify(opts.data);
    }

    return this.request('PUT', parsed, opts, originData);
  }

  delete(url, opts) {
    var parsed = parse(url, true);
    var maybeQuery = opts.query || opts.data;
    if (maybeQuery) {
      // append data into querystring
      Object.assign(parsed.query, maybeQuery);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.data = null;
      opts.query = null;
    }

    // lowerify the header key
    opts.headers = loweredKeys(opts.headers);
    opts.signHeaders = loweredKeys(opts.signHeaders);

    return this.request('DELETE', parsed, opts);
  }
}

module.exports = Base;
