/**
 * Array.isArray() polyfill.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray }
 * @since ES5.1, IE9
 */

if (typeof Array.isArray === "undefined") {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}
