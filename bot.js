require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { getTeraBoxVideo } = require('./terabox');
const { downloadVideo } = require('./downloader');

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN);

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || !text.includes('terabox')) {
    return bot.sendMessage(chatId, 'Send a public TeraBox link.');
  }

  try {
    bot.sendMessage(chatId, '🔍 Fetching video info...');

    const videoInfo = await getTeraBoxVideo(text);

    bot.sendMessage(chatId, '⬇️ Downloading video...');

    const filePath = await downloadVideo(videoInfo.directLink);

    await bot.sendVideo(chatId, filePath, {
      caption: videoInfo.fileName
    });

  } catch (err) {
    bot.sendMessage(chatId, '❌ Failed to process this link.');
    console.error(err.message);
  }
});
