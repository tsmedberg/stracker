import Shipper from './shipper.js';
/**
 * @class InstaBox
 * @extends Shipper
 */
export default class Instabox extends Shipper {
    /**
     * 
     * @param {string} id 
     * @param {string} postalCode 
     */
    constructor(id, postalCode) {
        super();
        this.id = id;
        this.postalCode = postalCode;
    }
    static getOptions() {
        return {
            id: '123',
            postalCode: '12345'
        };
    }


}