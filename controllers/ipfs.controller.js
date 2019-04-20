const config = global.config;
const property = global.property;

var base58 = require('bs58');
var IPFS = require('ipfs-http-client');

var ipfs = IPFS({
  host: config.IPFS.URL,
  port: config.IPFS.PORT,
  protocol: config.IPFS.PROTOCOL
});


module.exports = {

  welcome: function (req, res, next) {
    return res.send('Welcome to Nairbmak API!');
  },

  encode: function (req, res, next) {
    var hash = req.query.hash;
    if (!hash) return next(property('error.400.1'));

    if (hash.length == 66) hash = hash.replace('0x', '');
    if (hash.length == 64) {
      var bytes = Buffer.from('1220' + hash, "hex");
      hash = base58.encode(bytes);
    }

    req.query.hash = hash;
    return next();
  },

  get: function (req, res, next) {
    var hash = req.query.hash;
    if (!hash) return next(property('error.400.1'));

    ipfs.cat(hash).then(re => {
      return res.send({ status: 'OK', data: JSON.parse(re) });
    }).catch(er => {
      console.error(er);
      return next(property('error.400.1'));
    });
  },

  set: function (req, res, next) {
    const data = req.body.data;

    if (!data) return next(property('error.400.2'));

    ipfs.add(Buffer.from(JSON.stringify(data))).then(re => {
      return res.send({ status: 'OK', data: re[0] });
    }).catch(er => {
      console.error(er);
      return next(property('error.400.2'));
    });
  }
}