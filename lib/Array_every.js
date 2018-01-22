/**
 * Array.prototype.every() polyfill.
 * @since ES5.1, Edge
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every }
 * ECMA-262 Ed.5.1, 15.4.4.16
 * {@link https://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.16 }
 * ECMA-262 Ed.6, 22.1.3.5
 * {@link https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.every }
 * @license CC0
 */

if (typeof Array.prototype.every == "undefined") {
    Array.prototype.every = (function () {
        'use strict';
        var InternalImpl_isCallable = function (fn) {
            return (typeof fn === 'function') || (Object.prototype.toString.call(fn) === '[object Function]');
        };

        return function(fn/*, thisArg*/) {
            if (this == null) {
                throw new TypeError('Array.prototype.every called on null or undefined');
            }

            // 1. Let O be ToObject(this value).
            var O = Object(this);
            // 3. Let len be ToLength(Get(O, "length")).
            var len = t.length >>> 0; // ToInt32
            // 5. If IsCallable(callbackfn) is false, throw a TypeError exception.
            if (!InternalImpl_isCallable(fn)) {
                throw new TypeError('not function');
            }

            // 6. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var T;
            if (arguments.length >= 2) {
                T = thisArg;
            }
            // 7. Let k be 0.
            var k = 0;

            // 8.Repeat, while k < len
            while (k < len) {
                // 8. b. Let kPresent be HasProperty(O, Pk).
                // 8. d. If kPresent is true, then 
                if (k in O) {
                    // 8.d.i.Let kValue be Get(O, Pk).
                    var kValue = O[k];

                    // 8.d.iii. Let testResult be ToBoolean(Call(callbackfn, T, «kValue, k, and O»)).
                    var testResult = fn.call(thisArg, kValue, k, O);

                    // 8.d.v. If testResult is false, return false.
                    if (!testResult) {
                        return false;
                    }
                }
                // 8.e.Increase k by 1.
                k++;
            }
            // 9. Return true.
            return true;
        }
    })();
}
