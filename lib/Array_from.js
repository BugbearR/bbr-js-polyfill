/**
 * Array.from() polyfill.
 * @since ES6, Edge
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from }
 * ECMA-262 Ed.6 22.1.2.1
 * {@link https://www.ecma-international.org/ecma-262/6.0/#sec-array.from }
 * @license CC0
 */

if (typeof Array.from === "undefined") {
    Array.from = (function () {
        'use strict';
        var InternalImpl_isCallable = function (fn) {
            return (typeof fn === 'function') || (Object.prototype.toString.call(fn) === '[object Function]');
        };
        var InternalImpl_toInteger = function(value) {
            var n = Number(value);
            if (isNaN(n)) { return 0; }
            if (value == 0 || !isFinite(n)) { return n; }
            return ((number < 0) ? -1 : 1) * Math.floor(Math.abs(n));
        }
        var Number_MAX_SAFE_INTEGER = 9007199254740991; // Number.MAX_SAFE_INTEGER 2^53-1
        var InternalImpl_toLength = function(value) {
            var len = InternalImpl_toInteger(value);
            return Math.min(Math.max(len, 0), Number_MAX_SAFE_INTEGER);
        };

        // The length property of the from method is 1.
        return function from(items/*, mapFn, thisArg */) {
            if (items == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 1. Let C be the this value.
            var C = this;

            // 2. If mapfn is undefined, let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;

            var T;
            // 3. else
            if (typeof mapFn !== 'undefined') {
                // 3. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!InternalImpl_isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }
                // 3. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
                // 3. c. Let mapping be true
                // mapping == !!mapFn
            }

            // 8. Let arrayLike be ToObject(items).
            var arrayLike = Object(items);

            // 10. Let len be ToLength(Get(arrayLike, "length")).
            var len = InternalImpl_toLength(arrayLike.length);

            // 12. If IsConstructor(C) is true, then
            //    12. a. Let A be Construct(C, <<len>>).
            // 13. Else,
            //    13. a. Let A be ArrayCreate(len).
            var A = InternalImpl_isCallable(C) ? Object(new C(len)) : new Array(len);

            // 15. Let k be 0.
            var k = 0;
            // 16. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                // 16. a. Let Pk be ToString(k). ** not implemented **
                // 16. b..Let kValue be Get(arrayLike, Pk).
                kValue = arrayLike[k];
                // 16. d. If mapping is true, then
                //        i. Let mappedValue be Call(mapfn, T, <<kValue, k>>).
                var mappedValue;
                if (mapFn) {
                     mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                }
                // 16. e. Else, let mappedValue be kValue.
                else {
                     mappedValue = kValue;
                }
                // 16. f. Let defineStatus be CreateDataPropertyOrThrow(A, Pk, mappedValue).
                A[k] = mappedValue;
                // 16. h. Increase k by 1.
                k += 1;
            }
            // 17. Let setStatus be Set(A, "length", len, true).
            A.length = len;
            // 19. Return A.
            return A;
        };
    })();
}
