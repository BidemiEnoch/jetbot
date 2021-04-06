'use strict';
const TimeParser = require('../../tools/timeutils/@index');
const Command = require('../../classes/command');

const toseconds = (param, message) => {
       const { stringTimeToSeconds } = TimeParser;
       const { channel } = message;
       let time;
       try {
              time = stringTimeToSeconds(param);
       } catch (e) {
              return message.reply(e.message);
       }
       channel.send(`${param} converted to secs is:\n**${time}secs⏱️**`);
};

const command = new Command('utility', '<time>');
command.setAccess('public');
command.isGuildOnly = false;
command.setDescription('converts a specific time to seconds');
command.setFunc(toseconds);
module.exports = command;
