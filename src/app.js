const SlackBot = require('./utils/slack-bot');

const BOT_PARAMS = {
    token: 'xoxb-186811819539-uhUoACH7mSkkWCn95ZPaiRTK',
    name: 'slack-bot'
}

function checkDataFormat(type, subtype) {
    return 'message' === type
        && 'bot_message' !== subtype;
}

function parseMessageToLexemes(messageText) {
    if (0 >= messageText.length) {
        return null;
    }

    let lexemes = [];
    let tokens = messageText.split(' ');    
    tokens.forEach(
        token => lexemes.push(token)
    );

    return lexemes;
}

function getAnswerMessage(
    channelId,
    userId,
    userName,
    messageText,
    lexemes
) {
    return 'SlackBot handle new message:\n' +
        `channel-id: ${channelId}\n` +
        `user-id: ${userId}\n` +
        `user-name: ${userName}\n` +
        `message: ${messageText}\n` +
        `lexemes: {${lexemes}}`;
}

let bot = SlackBot.create(
    BOT_PARAMS,
    data => {
        if (!checkDataFormat(data.type, data.subtype)) {
            return null;
        }

        var userId = data['user'];
        var channelId = data['channel'];
        var messageText = data['text'];

        bot.getUsers().then(
            data => {
                data.members.forEach(
                    user => {
                        if (userId !== user['id']) {
                            return null;
                        }

                        let lexemes = parseMessageToLexemes(messageText);
                        let answerText = getAnswerMessage(
                            channelId,
                            userId,
                            user['name'],
                            messageText,
                            lexemes
                        );

                        bot.sendMessageToChannel(channelId, answerText);
                        console.log(answerText);
                    }
                );
            }
        );
    }
);

console.log('[*] SlackBot listening channels ...');