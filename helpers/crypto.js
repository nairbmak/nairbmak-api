const config = global.config;

var Crypto = function(){}

Crypto.encrypt = (data) => {
  return config.PRIVATE_KEY.encrypt(JSON.stringify(data), 'base64');
};

Crypto.decrypt = (data) => {
  return config.PRIVATE_KEY.decrypt(data, 'utf8');
};

module.exports = Crypto;