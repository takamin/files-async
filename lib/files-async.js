"use strict";
const fs = require("promise-fs");
const path = require("path");

/**
 * A list of what relate to files that found from the dpecific directory.
 * @async
 * @param {string} dir A root directory to search files.
 * @param {Function|AsyncFunction} callback (Optinal) consuming one filename and
 *      returning a list item object.
 * @returns {Promise<Array<any> >} the promise will resolved by an array of the
 *      values that is returned by callback.
 */
async function filesAsync(root, callback) {
    const files = [];
    await filesAsync_(root, files, callback);
    return files;
}

async function filesAsync_(root, result, callback) {
    const files = await fs.readdir(root);
    return Promise.all(files.map( async file => {
        const pathname = path.join(root, file);
        const stats = await fs.stat(pathname);
        if(stats.isDirectory()) {
            await filesAsync_(pathname, result, callback);
        } else if(!callback) {
            result.push(pathname);
        } else {
            const ret = callback(pathname);
            if(!ret) {
                result.push(pathname);
            } else if(ret.constructor === Promise) {
                result.push(await ret);
            } else {
                result.push(ret);
            }
        }
    }));
}

module.exports = filesAsync;
