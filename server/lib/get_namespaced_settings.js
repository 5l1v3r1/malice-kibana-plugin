var _ = require('lodash');
var configFile = require('../../malice.json');

module.exports = function () {
  function flattenWith(dot, nestedObj, flattenArrays) {
    let stack = []; // track key stack
    let flatObj = {};
    (function flattenObj(obj) {
      _.keys(obj).forEach(function (key) {
        stack.push(key);
        if (!flattenArrays && _.isArray(obj[key])) flatObj[stack.join(dot)] = obj[key];
        else if (_.isObject(obj[key])) flattenObj(obj[key]);
        else flatObj[stack.join(dot)] = obj[key];
        stack.pop();
      });
    }(nestedObj));
    return flatObj;
  };

  var maliceDefaults = flattenWith('.', configFile);
  return _.reduce(maliceDefaults, (result, value, key) => {
    result['malice:' + key] = value;
    return result;
  }, {});
};
