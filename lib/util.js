'use strict';

function fetchPropertyFromHeader(headerStr, key) {
  const values = headerStr.split(';') || [];
  let result;
  values.some((pair) => {
    const kv = pair.trim().split('=');
    if(kv.length === 2 && kv[0] === key) {
      result = kv[1];
      return true;
    }
    return false;
  });
  return result;
}

module.exports = {
  fetchPropertyFromHeader
};