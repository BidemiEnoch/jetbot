'use strict';
const Command = require('../../classes/command');

const listemojis = (message) => {
       const { guild } = message;
       const emojis = guild.emojis.map((e) => e.toString()).join(' ');
       if (!emojis.replace(/\s/g, '').length) return message.reply('This server has no custom emojis');
       message.reply(`Heres a list of all the custom emojis on this server..\n${emojis}`);
};

const command = new Command('info');
command.setDescription('displays every custom emoji in the server the command is used in');
command.setFunc(listemojis);
module.exports = command;
