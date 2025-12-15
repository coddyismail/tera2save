require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { getTeraBoxVideo } = require('../terabox');

const bot = new TelegramBot(process.env.BOT_TOKEN);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(200).send('OK');

  const msg = req.body.message;
  if (!msg || !msg.text) return res.status(200).send('OK');

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  try {
    if (!text.includes('terabox')) {
      await bot.sendMessage(chatId, '⚠️ Please send a public TeraBox / 1024TeraBox link.');
      return res.status(200).send('OK');
    }

    await bot.sendMessage(chatId, '🔍 Processing your link...');

    // Get file metadata & direct link
    const video = await getTeraBoxVideo(text);

    // Send info + direct download link to user
    await bot.sendMessage(
      chatId,
      `✅ File ready!\n\n📄 Name: ${video.fileName}\n📦 Size: ${video.size || 'Unknown'}\n🔗 Direct download: ${video.directLink}`
    );

    return res.status(200).send('OK');

  } catch (err) {
    console.error(err);
    await bot.sendMessage(chatId, '❌ Failed to process the link. Make sure it is a public 1024TeraBox link.');
    return res.status(200).send('OK');
  }
};
