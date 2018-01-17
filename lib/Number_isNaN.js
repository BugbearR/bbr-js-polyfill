/**
 * Number.isNaN() polyfill.
 * @since ES6, Edge
 * @see ECMAScript 6 Number.isNaN
 * @license CC0
 */

if (typeof Number.isNaN === 'undefined') {
    Number.isNaN = function(value) {
        return (typeof value === 'number') && (value !== value);
    };
}
