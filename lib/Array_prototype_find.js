/**
 * Array.prototype.find() polyfill.
 * @since ES6, Edge
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find }
 * ECMA-262 Ed.6, 22.1.3.8
 * {@link https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.find }
 * @license CC0
 */

if (typeof Array.prototype.find == "undefined") {
    Array.prototype.find = (function () {
        'use strict';
        var InternalImpl_isCallable = function (fn) {
            return (typeof fn === 'function') || (Object.prototype.toString.call(fn) === '[object Function]');
        };

        return function(fn/*, thisArg*/) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
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
                // 8.b. Let kValue be Get(O, Pk).
                var kValue = O[k];

                // 8.d. Let testResult be ToBoolean(Call(predicate, T, <<kValue, k, O>>)).
                var testResult = fn.call(T, kValue, k, O);

                // 8.f. If testResult is true, return kValue.
                if (testResult) {
                    return kValue;
                }
                // 8.g.Increase k by 1.
                k++;
            }
            // 9. Return undefined.
            return void 0;
        }
    })();
}
