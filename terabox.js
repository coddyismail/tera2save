const axios = require('axios');

async function getTeraBoxVideo(link) {
  // Extract share key
  const shareKey = link.split('/s/')[1];

  const response = await axios.get(
    'https://www.terabox.com/api/shorturlinfo',
    {
      params: {
        app_id: 250528,
        shorturl: shareKey,
        root: 1
      }
    }
  );

  const file = response.data.list[0];

  return {
    fileName: file.server_filename,
    directLink: file.dlink
  };
}

module.exports = { getTeraBoxVideo };
