const axios = require('axios');

async function getTeraBoxVideo(link) {
  // Normalize domain
  const shareKeyMatch = link.match(/\/s\/([a-zA-Z0-9_-]+)/);
  if (!shareKeyMatch) {
    throw new Error('Invalid TeraBox link format');
  }

  const shorturl = shareKeyMatch[1];

  const response = await axios.get(
    'https://www.terabox.com/api/shorturlinfo',
    {
      params: {
        app_id: 250528,
        shorturl,
        root: 1
      }
    }
  );

  //  DEFENSIVE CHECK
  if (
    !response.data ||
    !Array.isArray(response.data.list) ||
    response.data.list.length === 0
  ) {
    throw new Error('No downloadable files found in this link');
  }

  const file = response.data.list[0];

  if (!file.dlink) {
    throw new Error('Direct download link not available');
  }

  return {
    fileName: file.server_filename || 'video.mp4',
    directLink: file.dlink
  };
}

module.exports = { getTeraBoxVideo };
