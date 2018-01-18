/**
 * Number.isFinite() polyfill.
 * @since ES6, Edge
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite }, isFinite()
 * @license CC0
 */

if (typeof Number.isFinite === 'undefined') {
    Number.isFinite = function(value) {
        return (typeof value === 'number') && isFinite(value);
    };
}
