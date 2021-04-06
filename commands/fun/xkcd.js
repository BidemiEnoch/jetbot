'use strict';

const jet = require('../../classes/client');
const axios = require('axios');
const { EmbedColors, Urls, RegPatterns } = require('../../tools/constants');
const { datePostfix } = require('../../tools/basicFuncs');
const Command = require('../../classes/command');

const xkcd = async (param, message) => {
       const { channel } = message;
       const { isAllNumbers } = RegPatterns;
       let num;
       if (param === '') num = ~~(Math.random() * 2000) + 1;
       else if (!isAllNumbers.test(param)) return message.reply('Invalid xkcd number');
       else num = parseInt(param);

       const msg = await channel.send('fetching image');
       try {
              const { data } = await axios.get(Urls.xkcd(num));
              const postfix = datePostfix(data.day),
                     title = data.safe_title,
                     date = `xkcd no ${data.num},created on ${data.day}${postfix} of ${jet.month[data.month - 1]} ${data.year}`,
                     title_description = data.alt;
              const embed = jet.Embed.setTitle(title)
                     .addField('description', title_description)
                     .setImage(data.img)
                     .setColor(EmbedColors.xkcd)
                     .setFooter(date);
              msg.edit(embed);
       } catch (e) {
              msg.edit('An error occured(the number provided to the xkcd command might be out of range)');
       }
};

const command = new Command('fun', '<integer>', true);
command.setPerms(['EMBED_LINKS']);
command.setDescription('generates a xkcd comic based on a provided number,generates a comic with a random index if no number is provided');
command.isGuildOnly = false;
command.setFunc(xkcd);
module.exports = command;
