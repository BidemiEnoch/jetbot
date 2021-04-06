const jet = require('./classes/client');

module.exports = () => {
       CheckForUnmutes();
};

const CheckForUnmutes = () => {
       const users = jet.mutedUsers.array();
       for (const user of users) {
              const { unmuteTimestamp } = user;
              if (!unmuteTimestamp) continue;
              const currentTimestamp = Date.now();
              if (unmuteTimestamp < currentTimestamp) jet.UnMute(user);
       }
};
