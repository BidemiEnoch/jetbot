'use strict';
const jet = require('../../classes/client');
const { EmbedColors } = require('../../tools/constants');
const TimeParser = require('../../tools/timeutils/@index');
const Command = require('../../classes/command');

const botinfo = (message) => {
       const { channel } = message;
       const { secondsToStringTime } = TimeParser;
       const { user, users, config, channels, guilds, uptime } = jet,
              owner = users.get(config.ownerID),
              ownersName = owner.tag,
              botsPFP = user.displayAvatarURL,
              ownersPFP = owner.displayAvatarURL,
              runtime = secondsToStringTime(uptime / 1000);
       const embed = jet.Embed.setThumbnail(botsPFP)
              .setAuthor(`owner(${ownersName})`, ownersPFP)
              .addField('build🏠', 'environment : node.js\ncore-library : discordjs\nlanguages : Javascript,typescript')
              .addField('details', `users : ${users.size}\nguilds : ${guilds.size}\nchannels : ${channels.size}\nuptime : ${runtime}`)
              .setFooter(`created on ${user.createdAt}`)
              .setColor(EmbedColors.info);

       channel.send(embed);
};

const command = new Command('info');
command.setPerms(['EMBED_LINKS']);
command.setDescription('displays information about me');
command.isGuildOnly = false;
command.setFunc(botinfo);
module.exports = command;
