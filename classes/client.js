const { RichEmbed, Collection } = require('discord.js');
const Permission = require('./permission');
const CodeTimer = require('execution-time')();

class Jet extends Permission {
       constructor() {
              super();
              this.config = null;
              this.commands = null; //collection<commandName,command>
              this.mutedUsers = new Collection(); //<userID,mutedUser>
              this.slideTabs = new Collection(); //<userID,slideTab>
              this.incorrectCommandTabs = new Collection();
              this.month = [
                     'January',
                     'Febuary',
                     'March',
                     'April',
                     'May',
                     'June',
                     'July',
                     'August',
                     'September',
                     'October',
                     'November',
                     'December'
              ];
       }
       
       EvalCode(param, message) {
              const { channel, guild, author } = message;
              CodeTimer.start(`${message.id}`);
              const output = eval(param);
              const { time } = CodeTimer.stop(`${message.id}`);
              const execTime = time.toFixed(3);
              return { execTime, output };
       }
       
       async UnMute(mutedUser) {
              const { id, guild_id, channel_id } = mutedUser;

              this.mutedUsers.delete(id);

              const guild = this.guilds.get(guild_id);
              if (!guild || !guild.available) return;
              const channel = guild.channels.get(channel_id);
              const member = guild.members.get(id);
              const mutedRole = guild.roles.find((e) => e.name === 'muted');

              if (!channel || !member || !mutedRole) return;
              if (!member.roles.has(mutedRole.id)) return;
              try {
                     await member.removeRole(mutedRole, '');
                     channel.send(`**${member.displayName}** has been unmuted`);
              } catch (e) {
                     channel.send(`**${member.displayName}** could not be unmuted`);
              }
       }
       
       configure() {
              this.config = require('../jsons/config.json');
              this.commands = new Collection([
                     ...require('../commands/general/@index'),
                     ...require('../commands/admin/@index'),
                     ...require('../commands/fun/@index'),
                     ...require('../commands/info/@index'),
                     ...require('../commands/utility/@index')
              ]);
              this.categories = {
                     general: this.commands.filter((e) => e.category === 'general'),
                     admin: this.commands.filter((e) => e.category === 'admin'),
                     info: this.commands.filter((e) => e.category === 'info'),
                     utility: this.commands.filter((e) => e.category === 'utility'),
                     fun: this.commands.filter((e) => e.category === 'fun')
              };
       }

       get Embed() {
              return new RichEmbed();
       }
}

module.exports = new Jet();
