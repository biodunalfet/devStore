/**
 * Created by Hamza Fetuga on 1/18/2017.
 */

/**
 * 0 = dev
 * 1 = prod
 * @type {number}
 */
var APP_MODE = 1;
var MONGODB_MODE = 1;

module.exports = function () {
    return {
        mode: {
            app : APP_MODE,
            db : MONGODB_MODE
        }
    }
};