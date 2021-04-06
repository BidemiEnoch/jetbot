'use strict';
const { RegPatterns } = require('../../tools/constants');
const Command = require('../../classes/command');

const nuke = async (param, message) => {
       const { channel } = message;
       const { isAllNumbers } = RegPatterns;
       if (!isAllNumbers.test(param)) return message.reply('an invalid number was provided');
       const num = parseInt(param);
       try {
              const { size } = await channel.bulkDelete(num);
              channel.send(`${size} message(s) have been deleted from this channel`);
       } catch (e) {
              message.reply('an error occurred');
       }
};

const command = new Command('admin', '<number>');
command.setAccess('admin');
command.setPerms(['MANAGE_MESSAGES']);
command.setDescription('deletes a specific amount of messages from the channel the command is used in');
command.setFunc(nuke);
module.exports = command;
