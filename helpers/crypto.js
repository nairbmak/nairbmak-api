const config = global.config;
var ethAbi = require('ethereumjs-abi');
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("https://testnet.tomochain.com"));

var Crypto = function () { }

Crypto.encrypt = (data) => {
  return config.PRIVATE_KEY.encrypt(JSON.stringify(data), 'base64');
};

Crypto.decrypt = (data) => {
  return config.PRIVATE_KEY.decrypt(data, 'utf8');
};

/**
 * Valid buy session
 */
Crypto.validateBuySession = function (txId, callback) {
  web3.eth.getTransaction(txId, (er, tx) => {
    if (er) return callback(false);
    if (!tx) return callback(false);

    // web3.eth.getAccounts((er, re) => {
    //   if (er) return callback(false);
    //   if (!re || re.length <= 0) return callback(false);
    //   if (re[0] !== tx.from) return callback(false);

    var selector = tx.input.slice(0, 10);
    var data = Buffer.from(tx.input.slice(10), 'hex');
    var params = ethAbi.rawDecode(["address", "uint256"], data)

    if (selector !== '0xa9059cbb') return callback(false);
    if ('0x' + params[0] !== config.RETAIL.ADDRESS) return callback(false);
    if (Number(params[1]) / (10 ** 18) < config.RETAIL.MIN_VALUE) return callback(false);

    return callback(true);
    // });
  });
}

module.exports = Crypto;