const config = global.config;

module.exports = {
  rsa: (data) => {
    return config.PRIVATE_KEY.encrypt(JSON.stringify(data), 'base64');
  }
}