#!/usr/bin/env node
import {shippers} from './shippers/index.js'
import inquirer from 'inquirer';
import chalk from 'chalk';
import { ArgumentParser } from 'argparse';
const parser = new ArgumentParser({
  description: 'Argparse example'
});
parser.add_argument('-s', '--shipper', {choices: Object.keys(shippers), help: 'Shipper to use'});
parser.add_argument('-i', '--id', {help: 'Package id'});
parser.add_argument('-p', '--postalCode', {help: 'Postal code'});

let args = parser.parse_args();
if(!args.shipper) args.shipper = await inquirer.prompt({type: 'list', name: 'shipper', message: 'Which shipper do you want to use?', choices: Object.keys(shippers)}).then(({shipper}) => shipper)
console.dir(args);
let Shipper = shippers[args.shipper];
let options = Shipper.getOptions();
for (const option of options) {
  if(!args[option.name])
  {
    const answer = await inquirer.prompt(option);
    args[option.name] = answer[option.name];
  }
}
let shipper = new Shipper(args);
shipper.getStatus().then(console.log).catch(console.error);