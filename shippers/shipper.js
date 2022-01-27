/** Abstract shipper class to inherit from
 * @class
 * @abstract
 */
export default class Shipper {
    /**
     * @constructor
     * @param {object} options - Shipper options
     */
    constructor(options) {
        if(this.constructor === Shipper) {
            throw new TypeError('Cannot construct Shipper instances directly');
        }
    }
    /**
     * @abstract
     * @returns {Promise}
     */
    getStatus() {
        throw new TypeError('getStatus() is not implemented');
    }
    /**
     * @abstract
     * @returns {object}
     */
    getOptions() {
        throw new TypeError('getOptions() is not implemented');
    }
}