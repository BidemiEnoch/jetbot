const { RegPatterns } = require('../tools/constants');

class AwaitingMessage {
       //creates an awaiting message
       async _createAwaitingMessage() {
              const { channel } = this.message;
              const { isAllNumbers } = RegPatterns;
              this.awaitingMessage = await channel.send('What page would you like to move to?');
              const filter = ({ content, author }) => {
                     const num = parseInt(content);
                     return isAllNumbers.test(content) && author.id === this.userID && num > 0 && num <= this.data.length;
              };
              const event = channel.createMessageCollector(filter, { time: 15000 });
              this._handleAwaitingMessage(event);
       }

       //handles a response from an awaiting message
       _handleAwaitingMessage(event) {
              event.once('collect', (message) => {
                     if (!this.awaitingMessage) return;
                     const num = parseInt(message.content);
                     this.index = num - 1;
                     this._removeAwaitingMessage();
                     this.update();
              });

              event.on('end', async () => {
                     this._removeAwaitingMessage();
              });
       }
       //removes an awaiting message
       async _removeAwaitingMessage() {
              if (!this.awaitingMessage) return;
              try {
                     await this.awaitingMessage.delete();
              } catch (e) {}
              this.awaitingMessage = null;
       }
}

module.exports = AwaitingMessage;
