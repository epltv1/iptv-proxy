const https = require('https');

module.exports = (req, res) => {
  const streamUrl = req.query.url;
  if (!streamUrl) {
    res.status(400).send('No URL provided');
    return;
  }

  https.get(streamUrl, (stream) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain'); // Force text for debugging
    stream.pipe(res);
  }).on('error', (err) => {
    res.status(500).send('Error fetching stream: ' + err.message);
  });
};
