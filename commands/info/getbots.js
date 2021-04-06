'use strict';

const jet = require('../../classes/client');
const SlideTab = require('../../classes/slideTab');
const { EmbedColors } = require('../../tools/constants');
const Command = require('../../classes/command');

const getbots = async (message) => {
       const { guild, channel, author } = message,
              data = [];

       for (const [id, member] of guild.members) {
              const { user, roles } = member;
              if (!user.bot) continue;

              let roleObjs = roles.array(),
                     roleNames = [];
              for (const { name } of roleObjs) {
                     if (name === '@everyone') continue;
                     roleNames.push(name);
              }
              roleNames = roleNames.join(',');

              data.push({
                     name: user.tag,
                     id: user.id,
                     roles: `[ ${roleNames} ]`,
                     joinedAt: new Date(member.joinedTimestamp),
                     imgUrl: user.displayAvatarURL
              });
       }
       const slideTab = new SlideTab(data, BotsEmbed, author.id);
       slideTab.initAt(channel);
};

const BotsEmbed = (data) => {
       const { name, imgUrl, id, roles, joinedAt } = data;
       const embed = jet.Embed.setTitle('Bots on this server')
              .setAuthor(name, imgUrl)
              .setThumbnail(imgUrl)
              .addField('id:', id, true)
              .addField('roles', roles)
              .addField('joined at:', joinedAt, true)
              .setColor(EmbedColors.other);
       return embed;
};

const command = new Command('info');
command.setPerms(['EMBED_LINKS', 'MANAGE_MESSAGES', 'ADD_REACTIONS']);
command.setDescription('creates a slide tab showing every bot in the server the command is used in');
command.setFunc(getbots);
module.exports = command;
