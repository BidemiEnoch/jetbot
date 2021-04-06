class MutedUser {
       constructor(userId, guild_id, channel_id = '', time = '') {
              this.id = userId;
              this.guild_id = guild_id;
              this.channel_id = channel_id;
              this.muteDuration = time ? ~~(time * 1000) : '';
              this.muteTimestamp = time ? Date.now() : '';
              this.unmuteTimestamp = this.muteTimestamp + this.muteDuration;
              this.member = null;
       }
       get timeLeft() {
              if (!this.unmuteTimestamp) return '';
              const muteEnd = this.unmuteTimestamp - Date.now();
              return muteEnd / 1000;
       }
}

module.exports = MutedUser;
