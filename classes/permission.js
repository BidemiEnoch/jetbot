const { Errors } = require('../tools/constants');
const { Permissions, Client, Collection } = require('discord.js');

class Permission extends Client {
       constructor() {
              super();
       }
       //@method 1
       Perms(member, permissions) {
              let perms = new Permissions(member, permissions).serialize();
              perms = new Collection(Object.entries(perms));
              const acquiredPerms = perms.filter((e) => e).keyArray();
              const unacquiredPerms = perms.filter((e) => !e).keyArray();
              return { acquiredPerms, unacquiredPerms };
       }

       //@method 2
       HasChannelPerms(message, permarr) {
              const { channel, guild } = message;
              if (channel.type === 'dm') return true;
              const { me } = guild;
              const falsePerms = [];
              const perms = channel.permissionsFor(me).serialize();
              for (const p in perms) {
                     if (!perms[p] && permarr.includes(p)) falsePerms.push(p.toLowerCase());
              }
              if (falsePerms.includes('send_messages')) return false;
              if (!permarr.length) return true;
              if (falsePerms.length !== 0) message.reply(Errors.permission(falsePerms));
              return falsePerms.length === 0;
       }
}

module.exports = Permission;
