import Shipper from './shipper.js';
import fetch from 'node-fetch';
/**
 * @class PostNord
 * @extends Shipper
*/
export default class PostNord extends Shipper {
    /**
     * 
     * @param {object} options
     */
    constructor(options) {
        super();
        this.id = options.id.trim();
    }
    static getOptions() {
        return [
            {
                type: 'input',
                name: 'id',
                message: "What's the package id?"
            }
        ];
    }
    async getStatus() {
        return new Promise(async(resolve, reject) => {
            let res = await fetch(`https://api2.postnord.com/rest/shipment/v5/trackandtrace/ntt/shipment/recipientview?id=${this.id}&locale=en`, {
                "credentials": "omit",
                "headers": {
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Language": "en-US,en;q=0.5",
                    "x-bap-key": "web-ncp",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-site",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                "referrer": "https://tracking.postnord.com/",
                "method": "GET",
                "mode": "cors"
            });
            if(!res.ok)
            {
                reject('Could not authenticate: '+res.statusText);
                console.log(res)
                return;
            }
            let json = await res.json();
            resolve(json.TrackingInformationResponse)
        });;
    }
}