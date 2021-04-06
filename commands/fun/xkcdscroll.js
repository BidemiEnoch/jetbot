'use strict';

const jet = require('../../classes/client');
const SlideTab = require('../../classes/slideTab');
const { EmbedColors, Urls, RegPatterns } = require('../../tools/constants');
const axios = require('axios');
const { datePostfix } = require('../../tools/basicFuncs');
const Command = require('../../classes/command');

const xkcdscroll = async (param, message) => {
       const { guild, channel, author } = message;
       const { isAllNumbers } = RegPatterns;
       param = param.split(',');
       const isValidParam = param.every((e) => isAllNumbers.test(e));

       if (param.length != 2 || !isValidParam) return message.reply("the command argument provided for 'xkcdscroll' is invalid");

       const [start, end] = param.filter((e) => parseInt(e)).sort((a, b) => a - b);

       if (start < 1 || end > 2050) return message.reply('the bounds should be not exceed range 1-2050');
       if (end - start > 100) return message.reply('You cannot scroll across more than a 100 items');

       const data = [];
       for (let i = start; i <= end; i++) {
              data.push({
                     title: 'fetching data',
                     title_description: 'fetching data',
                     img: 'https://www.ledr.com/colours/white.jpg',
                     date: 'fetching data',
                     refnum: i
              });
       }

       const slideTab = new SlideTab(data, XkcdScrollEmbed, author.id);
       await slideTab.initAt(channel);
       FetchXkcd(slideTab, 0);
};

const XkcdScrollEmbed = (data) => {
       const { title, title_description, img, date } = data;

       const embed = jet.Embed.setTitle(title)
              .addField('description', title_description)
              .setImage(img)
              .setColor(EmbedColors.xkcd)
              .addField('date', date);
       return embed;
};

const FetchXkcd = async (slideTab, fetchIndex) => {
       const { userID, index, data } = slideTab;
       if (!jet.slideTabs.has(userID) || fetchIndex >= data.length) return;
       const prop = data[fetchIndex];
       try {
              const url = Urls.xkcd(prop.refnum);
              const xkcd = (await axios.get(url)).data;
              const postfix = datePostfix(xkcd.day);
              prop.title = xkcd.safe_title;
              prop.title_description = xkcd.alt;
              prop.img = xkcd.img;
              prop.date = `xkcd no ${xkcd.num},created on ${xkcd.day}${postfix} of ${jet.month[xkcd.month - 1]} ${xkcd.year}`;

              if (fetchIndex === index) slideTab.update();

              FetchXkcd(slideTab, fetchIndex + 1);
       } catch (e) {
              DisplayError(data);
              slideTab.update();
              slideTab.remove();
       }
};

const DisplayError = (data) => {
       for (const prop of data) {
              prop.title = 'An error occured';
              prop.title_description = 'An error occured';
              prop.date = 'An error occured';
       }
};

const command = new Command('fun', '<bound1,bound2>');
command.setPerms(['EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES']);
command.setDescription('creates a slide tab where you can view several xkcd comics based on the range speicified');
command.setFunc(xkcdscroll);
module.exports = command;
