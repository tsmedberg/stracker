import Shipper from './shipper.js';
import fetch from 'node-fetch';
/**
 * @class InstaBox
 * @extends Shipper
 */
export default class Instabox extends Shipper {
    /**
     * 
     * @param {object} options 
     */
    constructor(options) {
        super();
        this.id = options.id;
        this.postalCode = options.postalCode;
    }
    static getOptions() {
        return [
            {
              type: 'text',
              name: 'id',
              message: "What's the package id?"
            },
            {
              type: 'number',
              name: 'postalCode',
              message: "What's your postal code?"
            }
          ];
    }

    async getStatus()
    {
        return new Promise(async(resolve, reject) => {
            let res = await fetch("https://tracking-api.instabox.se/v1/signin-by-phone", {
                "headers": {
                    "Content-Type": "application/json",
                },
                "referrer": "https://track.instabox.io/",
                /* "body": "{\"auth_code\":\"30237\",\"parcel_id\":\"MP0108831597\"}", */
                "body": JSON.stringify({
                    "auth_code": `${this.postalCode}`,
                    "parcel_id": this.id
                }),
                "method": "POST",
            });
            if(!res.ok)
            {
                reject('Could not authenticate: '+res.statusText);
                console.log(res)
                return;
            }
            let json = await res.json();
            let token = json.token;
            res = await fetch(`https://tracking-api.instabox.se/v1/unauthenticated/track?parcel_id=${this.id}&parcel_path=true`, {
                "credentials": "include",
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "cross-site"
                },
                "method": "GET",
                "mode": "cors"
            });
            if(!res.ok)
            {
                reject('Could not get status: '+res.statusText);
                return;
            }
            json = await res.json();
            resolve(json)
            
        });
    }

}