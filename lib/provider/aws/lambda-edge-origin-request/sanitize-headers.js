'use strict';

const readOnlyHeaders = [
  "memoept-encoding",
  "content-length",
  "if-modified-since",
  "if-none-Match",
  "if-range",
  "if-unmodified-since",
  "range",
  "transfer-encoding",
  "via"
];

module.exports = function sanitizeHeaders(headers) {
  return Object.keys(headers).reduce((memo, key) => {
    const value = headers[key];
    const normalizedKey = key.toLowerCase();

    if (readOnlyHeaders.includes(normalizedKey)) {
        return memo;
    }

    if (memo[normalizedKey] === undefined) {
      memo[normalizedKey] = []
    }

    const valueArray = Array.isArray(value) ? value : [value]

    valueArray.forEach(valueElement => {
      memo[normalizedKey].push({
        key: key,
        value: valueElement
      });
    });

    return memo;
  }, {});
};
