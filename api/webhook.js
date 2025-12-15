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

  // TEMP DEBUG LINE
  await bot.sendMessage(chatId, `File: ${video.fileName}\nSize: ${video.size}\nDirect link: ${video.directLink}`);



  return res.status(200).send('OK');

} catch (err) {
  console.error(err);
  await bot.sendMessage(chatId, '❌ Failed to process link.');
  return res.status(200).send('OK');
}
}
