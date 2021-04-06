'use strict';

const jet = require('./classes/client');
const { Errors, RegPatterns } = require('./tools/constants');
const similarity = require('string-similarity');

module.exports = (message, param) => {
       const { channel, author, guild } = message;
       const { commands, config } = jet;
       const { ownerID } = config;

       if (jet.slideTabs.has(author.id)) {
              const slideTab = jet.slideTabs.get(author.id);
              slideTab.remove();
       }

       let [givenCommand, value = ''] = param.split(/\s(.+)/);
       value = value.trim();
       //  if(!commands.has(givenCommand))
       //   return FetchCorrectCommand(message,givenCommand);

       const command = commands.get(givenCommand);
       if (!command) return;
       //checks if command can be used in dm's
       if (channel.type === 'dm' && command.isGuildOnly) return channel.send(Errors.no_dm);
       //checks if command is owner-only
       if (command.access === 'owner' && author.id !== ownerID) return channel.send(Errors.no_access);
       //checks if command is admin-only
       if (command.access === 'admin' && !IsAdmin(guild, author.id)) return channel.send(Errors.no_access);
       //checks permissions
       if (!jet.HasChannelPerms(message, command.perms)) return;
       //checks if arguments are being provided when not needed
       if (!command.args && value !== '') return channel.send(Errors.unrequired_args);
       //checks if arguments are not being provided when needed
       if (command.args && value === '' && !command.hasOptionalArgs) return channel.send(Errors.required_args(givenCommand));
       //checks if input is too long
       if (value.length > 200) return channel.send(Errors.long_input);

       if (!command.args) command.run(message);
       else command.run(value, message);
};

const FetchCorrectCommand = async (message, param) => {
       const { author, guild } = message;
       const { commands, config } = jet;
       const { ownerID } = config;
       const { isAdmin } = RegPatterns;

       const keys = commands.keyArray();
       const { bestMatch } = similarity.findBestMatch(param, keys);
       const command = commands.get(bestMatch.target);

       if (command.access === 'owner' && author.id !== ownerID) return;
       if (command.access === 'admin' && !IsAdmin(guild, author.id)) return;
       if (bestMatch.rating < 0.5) return;

       const m = await channel.send(`no command named **${param}** found\ndid you mean **${bestMatch.target}**?`);
       await m.react(':regional_indicator_y:');
};

const IsAdmin = (guild, authorID) => {
       const { isAdmin } = RegPatterns;
       if (!guild) return;
       const admin = (e) => isAdmin.test(e.name);
       const { roles } = guild.members.get(author.id);
       if (author.id !== guild.owner.id && !roles.find(admin)) return;
       return true;
};
