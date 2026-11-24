/**
 * Shared reserved plain-object key names (import + migration hardening).
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.CloudCramReservedKeyNames = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function isReservedKeyName(key) {
    return key === '__proto__' || key === 'constructor' || key === 'prototype';
  }

  return {
    isReservedKeyName: isReservedKeyName
  };
});