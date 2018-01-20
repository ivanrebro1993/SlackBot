const SlackBot = require('slackbots');

const BOT_ICON = ':robot_face:';

class Bot extends SlackBot {
    sendMessageToChannel(channelId, messageText) {
        super.postMessage(channelId, messageText, {
            icon_emoji: BOT_ICON
        });   
    }

    static create(params, messageHandler) {
        let bot = new Bot(params);
        bot.on('message', messageHandler);
        return bot;
    }
}

module.exports.create = Bot.create;