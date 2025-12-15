require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { getTeraBoxVideo } = require('../terabox');
const { downloadVideo } = require('../downloader');

const bot = new TelegramBot(process.env.BOT_TOKEN);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(200).send('OK');
  }

  const msg = req.body.message;
  if (!msg || !msg.text) {
    return res.status(200).send('OK');
  }

  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    if (!text.includes('terabox')) {
      await bot.sendMessage(chatId, 'Send a public TeraBox link.');
      return res.status(200).send('OK');
    }

    await bot.sendMessage(chatId, '🔍 Processing your link...');

    const video = await getTeraBoxVideo(text);
    const filePath = await downloadVideo(video.directLink);

    await bot.sendVideo(chatId, filePath, {
      caption: video.fileName
    });

    return res.status(200).send('OK');
  } catch (err) {
    await bot.sendMessage(chatId, '❌ Failed to download video.');
    return res.status(200).send('OK');
  }
};
