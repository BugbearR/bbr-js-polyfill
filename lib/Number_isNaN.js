/**
 * Number.isNaN() polyfill.
 * @since ES6, Edge
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN }, isNaN()
 * @license CC0
 */

if (typeof Number.isNaN === 'undefined') {
    Number.isNaN = function(value) {
        return (typeof value === 'number') && (value !== value);
    };
}
