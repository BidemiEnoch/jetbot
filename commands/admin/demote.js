'use strict';
const { Errors } = require('../../tools/constants');
const { getId } = require('../../tools/basicFuncs');
const Command = require('../../classes/command');

const demote = async (param, message) => {
       const { channel, guild } = message;
       const member = guild.members.get(getId(param));
       if (!member) return message.reply(Errors.invalid_member);
       if (member.roles.every((e) => e.name === 'everyone')) return message.reply(`${member.displayName} does not have any roles`);
       const { highestRole } = member;
       try {
              await member.removeRole(highestRole);
              channel.send(`The **${highestRole.name}** role has been removed from user **${member.displayName}**`);
       } catch (e) {
              message.reply(Errors.missing_perms);
       }
};

const command = new Command('admin', '@member');
command.setAccess('admin');
command.setPerms(['MANAGE_ROLES']);
command.setDescription('removes the highest role from a user.perfect for removing shi\\*\\*y moderators');
command.setFunc(demote);
module.exports = command;
