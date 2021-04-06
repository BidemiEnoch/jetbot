'use strict';

const jet = require('../../classes/client');
const MutedUser = require('../../classes/mutedUser');
const TimeParser = require('../../tools/timeutils/@index');
const { getId } = require('../../tools/basicFuncs');
const { Errors, RegPatterns } = require('../../tools/constants');
const Command = require('../../classes/command');

const mute = async (param, message) => {
       const { channel, guild } = message;
       const { stringTimeToSeconds } = TimeParser;
       const { isMuteRole } = RegPatterns;

       const [userMention, mutePeriod] = param.split(/\s(.+)/);
       if (!mutePeriod) return message.reply('this command requires a user and time argument');
       const member = guild.members.get(getId(userMention));
       if (!member) return message.reply(Errors.invalid_member);
       let time;
       try {
              time = stringTimeToSeconds(mutePeriod);
       } catch (e) {
              return message.reply(e.message);
       }

       if (time < 60) return message.reply('the mute period should not be lower than 60seconds');

       const searchFn = (r) => isMuteRole.test(r.name);

       const mutedRole = guild.roles.find(searchFn);
       if (!mutedRole) return message.reply("this server has no 'muted' role");
       if (member.roles.has(mutedRole.id)) return message.reply('this member has already been muted');
       const { id } = member;
       const mutedUser = new MutedUser(id, guild.id, channel.id, time);
       try {
              await member.addRole(mutedRole);
              jet.mutedUsers.set(member.id, mutedUser);
              channel.send(`**${member.displayName}** has been muted`);
       } catch (e) {
              channel.send('failed to mute member');
       }
};

const command = new Command('admin', '@member <time>');
command.setAccess('admin');
command.setPerms(['MANAGE_ROLES']);
command.setDescription('adds a "muted" role to a user which prevents from sending messages in the guild');
command.setFunc(mute);
module.exports = command;
