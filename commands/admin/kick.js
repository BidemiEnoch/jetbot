'use strict';
const { Errors } = require('../../tools/constants');
const { getId } = require('../../tools/basicFuncs');
const Command = require('../../classes/command');

const kickMember = async (param, message) => {
       const { channel, guild } = message;
       const member = guild.members.get(getId(param));
       if (!member) return message.reply(Errors.invalid_member);
       try {
              await member.kick();
              channel.send(`${member.user.tag} has been kicked👢 from this server`);
       } catch (e) {
              console.log(e);
              message.reply('could not ban member from server');
       }
};

const command = new Command('admin', '@member');
command.setAccess('admin');
command.setPerms(['KICK_MEMBERS']);
command.setDescription('kicks a specified member from the server');
command.setFunc(kickMember);
module.exports = command;
