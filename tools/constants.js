'use strict';

exports.EmbedColors = {
       xkcd: '#ffff88',
       info: '#00ff00',
       other: '#ff00ff'
};

exports.Urls = {
       hasteBin: 'https://hastebin.com',
       xkcd(num) {
              if (!num) return `http://xkcd.com/info.0.json`;
              return `http://xkcd.com/${num}/info.0.json`;
       }
};

exports.Errors = {
       invalid_user: 'an invalid user was mentioned',
       invalid_member: 'an invalid  member was mentioned',
       invalid_members: 'some of the mentioned members are invalid',
       invalid_channel: 'an invalid channel was mentioned',
       invalid_channels: 'some of the mentioned channels are invalid',
       invalid_role: 'an invalid role was mentioned',
       invalid_command: 'an unrecognized command was mentioned',
       no_access: 'you have no access to this command',
       no_dm: 'This command must be used in a server',
       unrequired_args: 'This command requires **zero** arguments',
       long_input: 'The parameters provided are too long',
       missing_perms: 'The action could not be carried out due to missing permissions',
       required_args(command) {
              return `This command requires an/some argument(s) \nuse j:help ${command} to see them`;
       },

       permission(perms) {
              return `the action could not be carried out due to missing permission(s) \n**missing permission(s)**:\n${perms.join(', ')}`;
       }
};

exports.RegPatterns = {
       isAdmin: /^(admin|administrator|staff|mod|moderator)+$/i,
       isRole: /<@&[0-9]+>/,
       isChannel: /<#[0-9]+>/,
       isUser: /<@!?[0-9]+>/,
       isAllNumbers: /^\d+$/,
       isMuteRole: /^(mute|muted)+$/i
};
