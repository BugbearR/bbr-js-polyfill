/**
 * Number.isFinite() polyfill.
 * @since ES6, Edge
 * @see ECMAScript 6 Number.isFinite
 * @license CC0
 */

if (typeof Number.isFinite === 'undefined') {
    Number.isFinite = function(value) {
        return (typeof value === 'number') && isFinite(value);
    };
}
