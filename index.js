'use strict';

function supportAsyncFunctions() {
  try {
    new Function('(async function () {})()');
    return true;
  } catch (ex) {
    return false;
  }
}

const asyncSupported = supportAsyncFunctions();

exports.Client = asyncSupported ? require('./lib/client') : require('./es5/client');

exports.SimpleClient = asyncSupported ? require('./lib/simple-client') : require('./es5/simple-client');

//表单类型Content-Type
exports.CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded; charset=UTF-8';
// 流类型Content-Type
exports.CONTENT_TYPE_STREAM = 'application/octet-stream; charset=UTF-8';
//JSON类型Content-Type
exports.CONTENT_TYPE_JSON = 'application/json; charset=UTF-8';
//XML类型Content-Type
exports.CONTENT_TYPE_XML = 'application/xml; charset=UTF-8';
//文本类型Content-Type
exports.CONTENT_TYPE_TEXT = 'application/text; charset=UTF-8';
