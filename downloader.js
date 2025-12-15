const axios = require('axios');
const fs = require('fs');

async function downloadVideo(url) {
  const path = './video.mp4';

  const response = await axios({
    method: 'GET',
    url,
    responseType: 'stream'
  });

  const writer = fs.createWriteStream(path);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(path));
    writer.on('error', reject);
  });
}

module.exports = { downloadVideo };
