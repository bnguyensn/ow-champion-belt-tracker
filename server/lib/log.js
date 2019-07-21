const chalk = require('chalk');

const base = 'Fastify: ';

function time() {
  return new Date(Date.now()).toLocaleString();
}

function baseMsg(msg) {
  return `${time()} ${base} ${msg}`;
}

function info(msg) {
  console.log(chalk.blueBright(baseMsg(msg)));
}

function success(msg) {
  console.log(chalk.greenBright(baseMsg(msg)));
}

function warn(msg) {
  console.log(chalk.yellowBright(baseMsg(msg)));
}

function error(msg) {
  console.log(chalk.redBright(baseMsg(msg)));
}

module.exports = {
  info,
  success,
  warn,
  error,
};
