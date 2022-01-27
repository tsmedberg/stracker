import {shippers} from './shippers/index.js'
console.log('Avaliable shippers:', shippers)
let instabox = new shippers.Instabox('123', '12345')
console.log('instabox:', instabox)