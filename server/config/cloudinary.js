const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dniusurt7',
  api_key: '698997592982539',
  api_secret: 'Y8E7f3a6MJuFr-8UvNeuqTP1oqk'
});

module.exports = cloudinary;