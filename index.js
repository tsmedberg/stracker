#!/usr/bin/env node
import {shippers} from './shippers/index.js'
import prompts from 'prompts';
await prompts({
    type: 'select',
    name: 'shipper',
    message: 'Select a shipper',
    choices: Object.keys(shippers).map(key => ({title: key, value: key}))
}).then(({shipper}) => {
  let Shipper = shippers[shipper];
  let options = Shipper.getOptions();
  prompts(options).then((op) => {
    let shipper = new Shipper(op);
    shipper.getStatus().then(console.log).catch(console.error);
  });
});