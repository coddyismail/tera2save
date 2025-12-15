// terabox.js
// This function validates 1024TeraBox links and returns basic info + direct link

async function getTeraBoxVideo(link) {
  // Validate link format
  const match = link.match(/https?:\/\/(www\.)?1024terabox\.com\/s\/[a-zA-Z0-9_-]+/);
  if (!match) {
    throw new Error('Invalid 1024TeraBox link');
  }

  // Serverless cannot reliably download or get metadata
  // So we return placeholder file info + the original public link
  const fileName = 'Unknown File';  // optional: could scrape later
  const size = 'Unknown Size';      // cannot get without download

  return {
    fileName,
    size,
    directLink: link
  };
}

module.exports = { getTeraBoxVideo };

