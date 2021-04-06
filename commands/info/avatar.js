'use strict';

const jet = require('../../classes/client');
const SlideTab = require('../../classes/slideTab');
const { EmbedColors, Errors } = require('../../tools/constants');
const { getId, parseUsers } = require('../../tools/basicFuncs');
const Command = require('../../classes/command');

const avatar = async (param, message) => {
       const { channel, author } = message;
       if (param === '') param = [author.id];
       else param = parseUsers(param);
       if (!param) return message.reply(Errors.invalid_user);
       const users = [];
       try {
              for (const p of param) users.push(await jet.fetchUser(getId(p)));
       } catch (e) {
              return message.reply(Errors.invalid_user);
       }

       const data = [];
       for (const user of users) {
              const avatar = user.displayAvatarURL;
              const name = user.tag;
              data.push({ avatar, name });
       }

       const slideTab = new SlideTab(data, AvatarEmbed, author.id);
       slideTab.initAt(channel);
};

const AvatarEmbed = (data) => {
       const { avatar, name } = data;
       const embed = jet.Embed.setTitle(`${name}'s avatar`).setImage(avatar).setColor(EmbedColors.info);

       return embed;
};

const command = new Command('info', '@user(s)', true);
command.setPerms(['EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES']);
command.setDescription('displays the avatar of specified user(s), displays your avatar if no user(s) are specified');
command.setFunc(avatar);
module.exports = command;
