'use strict';

const jet = require('../classes/client');
const MutedUser = require('../classes/mutedUser');
const { RegPatterns } = require('./constants');

module.exports = () => {
       const { guilds, mutedUsers } = jet;
       const { isMuteRole } = RegPatterns;
       const mutes = [];
       const searchFn = (role) => isMuteRole.test(role.name);

       for (const [id, guild] of guilds) {
              const members = guild.members.array().filter((m) => m.roles.find(searchFn));
              mutes.push(...members);
       }

       mutes.forEach((member) => {
              const { id, guild } = member;
              const user = new MutedUser(id, guild.id);
              mutedUsers.set(id, user);
       });
};
