// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import window from 'global/window';

/**
 * Generate a hash string based on number of character
 * @param {number} count
 * @returns {string} hash string
 */
export function generateHashId(count = 6) {
  return Math.random()
    .toString(36)
    .substr(count);
}

/**
 * Detect chrome
 * @returns {boolean} - yes or no
 */
export function isChrome() {
  // Chrome 1+
  return window.chrome && window.chrome.webstore;
}

/**
 * whether is an object
 * @returns {boolean} - yes or no
 */
export function isPlainObject(obj) {
  return (
    obj === Object(obj) && typeof obj !== 'function' && !Array.isArray(obj)
  );
}

/**
 * whether null or undefined
 * @returns {boolean} - yes or no
 */
export function notNullorUndefined(d) {
  return d !== undefined && d !== null;
}

/**
 * Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */
export function capitalizeFirstLetter(str) {
  return typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

/**
 * Convert camel style names to title
 * strokeColor -> Stroke Color
 * @param {string} str
 * @returns {string}
 */
export function camelToTitle(str){
  const breakWord = str.replace( /([A-Z])/g, " $1" );
  return capitalizeFirstLetter(breakWord);
}

export function isObject(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function')
}

/**
 * immutably insert value to an Array or Object
 * @param {Array|Object} obj
 * @param {Number|String} key
 * @param {*} value
 * @returns {Array|Object}
 */
const insertValue = (obj, key, value) => {
  if (Array.isArray(obj) && typeof(key) === 'number') {
  	return [...obj.slice(0, key), value, ...obj.slice(key + 1, obj.length)]
  }

  return {...obj, [key]: value};
}

const setPath = ([key, ...next], value, obj) => {
  if (!isObject(obj)) {
    return obj
  }

  if (next.length === 0) {
    return insertValue(obj, key, value)
  }

  return insertValue(
    obj, key, setPath(next, value, obj.hasOwnProperty(key) ? obj[key] : {})
  );
};

/**
 * Immutable version of _.set
 * @param {Array<String|Number>} path
 * @param {*} value
 * @param {Object} obj
 * @returns {Object}
 */
export const set = (path, value, obj) => obj === null ? obj : setPath(path, value, obj);
