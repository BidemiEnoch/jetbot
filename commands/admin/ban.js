'use strict';
const { Errors } = require('../../tools/constants');
const { getId } = require('../../tools/basicFuncs');
const Command = require('../../classes/command');

const banMember = async (param, message) => {
       const { channel, guild } = message;
       if (!/^(<@\d+>|\d+)\s*\d+$/.test(param))
              return message.reply('an invalid input was provided,please use `j:help ban` for more info on this command');

       const [userMention, days] = param.match(/(<@\d+>|\d+)/g);
       const member = guild.members.get(getId(userMention));
       if (!member) return message.reply(Errors.invalid_member);
       try {
              await member.ban(parseInt(days));
              channel.send(
                     `${member.user.tag} has been banned from this server🔨,the messages they sent in the past ${days} days have been deleted`
              );
       } catch (e) {
              message.reply('could not ban member from server');
       }
};

const command = new Command('admin', '@member <number>');
command.setAccess('admin');
command.setPerms(['BAN_MEMBERS']);
command.setDescription(
       'bans a specified member from the server,the <number> argument specificies that the recent messages sent by the member in that amount of days should be deleted '
);
command.setFunc(banMember);
module.exports = command;
