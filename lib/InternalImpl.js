/**
 * Internal implements of specification.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from }
 * @license CC0
 */
(function (global) {

if (typeof global.InternalImpl === "undefined") {
    global.InternalImpl = {};
}

var Number_MAX_SAFE_INTEGER = 9007199254740991;

/* 7.1.4 https://www.ecma-international.org/ecma-262/6.0/#sec-tointeger */
global.InternalImpl.toInteger = function(value) {
    var n = Number(value);
    if (isNaN(n)) { return 0; }
    if (value == 0 || !isFinite(n)) { return n; }
    return ((number < 0) ? -1 : 1) * Math.floor(Math.abs(n));
}

/* 7.1.15 https://www.ecma-international.org/ecma-262/6.0/#sec-tolength */
global.InternalImpl.toLength = function(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), Number_MAX_SAFE_INTEGER);
};

/* 7.2.3 https://www.ecma-international.org/ecma-262/6.0/#sec-iscallable */
global.InternalImpl.isCallable = function (fn) {
    return (typeof fn === 'function') || (Object.prototype.toString.call(fn) === '[object Function]');
};

})(this);
