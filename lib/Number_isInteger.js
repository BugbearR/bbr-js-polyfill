/**
 * Number.isInteger() polyfill.
 * @since ES6, Edge
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger }
 * @license CC0
 */

if (typeof Number.isInteger === "undefined") {
    Number.isInteger = function(value) {
        return (typeof value === "number")
                && isFinite(value)
                && (Math.floor(value) === value);
    };
}
