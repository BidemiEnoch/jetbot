'use strict';

const jet = require('../../classes/client');
const SlideTab = require('../../classes/SlideTab');
const { EmbedColors, Errors } = require('../../tools/constants');
const { getId, parseUsers } = require('../../tools/basicFuncs');
const Command = require('../../classes/command');

const seeperms = (param, message) => {
       const { channel, guild, author } = message;
       if (param === '') param = [author.id];
       else param = parseUsers(param);
       if (!param) return message.reply(Errors.invalid_members);
       const members = param.map((p) => guild.members.get(getId(p)));
       if (members.some((e) => !e)) return message.reply(Errors.invalid_members);

       const data = [];
       for (const member of members) {
              const { user, permissions } = member,
                     name = user.tag,
                     avatar = user.displayAvatarURL,
                     perms = jet.Perms(member, permissions.bitfield);
              const { acquiredPerms, unacquiredPerms } = perms;
              const Fn = (e) => e.replace(/_/g, ' ').toLowerCase();
              const trueperms = acquiredPerms.map(Fn),
                     falseperms = unacquiredPerms.map(Fn);

              data.push({ name, avatar, trueperms, falseperms });
       }
       const slideTab = new SlideTab(data, SeePermsEmbed, author.id);
       slideTab.initAt(channel);
};

const SeePermsEmbed = (data) => {
       let { name, avatar, trueperms, falseperms } = data;
       const truepermsLength = trueperms.length,
              falsepermsLength = falseperms.length;
       if (truepermsLength) trueperms = `\`\`\`${trueperms.join(', ')}\`\`\``;
       if (falsepermsLength) falseperms = `\`\`\`${falseperms.join(', ')}\`\`\``;
       const embed = jet.Embed.setTitle(`${name}'s permissions`)
              .setThumbnail(avatar)
              .addField(`✅acquired permissions(${truepermsLength})`, trueperms)
              .addField(`❌unacquired permissions(${falsepermsLength})`, falseperms)
              .setColor(EmbedColors.other);

       return embed;
};

const command = new Command('info', '@member(s)', true);
command.setPerms(['EMBED_LINKS', 'MANAGE_MESSAGES', 'ADD_REACTIONS']);
command.setDescription(
       "displays the acquired and unacquired permissions of specified member(s).displays your's if no member(s) are specified"
);
command.setFunc(seeperms);
module.exports = command;
