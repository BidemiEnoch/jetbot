'use strict';
const { getId } = require('../../tools/basicFuncs');
const { Errors } = require('../../tools/constants');
const Command = require('../../classes/command');

const roles = (param, message) => {
       const { channel, guild, author } = message;
       let member;
       if (param === '') member = guild.members.get(author.id);
       else member = guild.members.get(getId(param));
       if (!member) return message.reply(Errors.invalid_member);

       const roles = member.roles.array();
       const roleNames = [];
       for (const { name } of roles) {
              if (name === '@everyone') continue;
              roleNames.push(name);
       }
       const txt = `${member.user.tag}'s roles:\n`;
       channel.send(txt + '```[' + roleNames.join(' ') + ']```');
};

const command = new Command('info', '@user', true);
command.setDescription(
       'displays every role a specified user has.Displays the roles of the user who triggered the command if no users are specified'
);
command.setFunc(roles);
module.exports = command;
