const config = global.config;
const property = global.property;

var base58 = require('bs58');
var IPFS = require('ipfs-http-client');

const crypto = require('../helpers/crypto');


module.exports = {

  encrypt: function (req, res, next) {
    const data = req.body.data;

    if (!data) return next(property('error.400.1'));

    if (data.TheADRAssessment) {
      data.TheADRAssessment = crypto.encrypt(data.TheADRAssessment);
    }

    if (data.ParticularsOfReporter) {
      data.ParticularsOfReporter = crypto.encrypt(data.ParticularsOfReporter);
    }

    req.body.data = data;

    return next();
  },

  decrypt: function (req, res, next) {
    const { data } = req.body;

    if (!data) return next(property('error.400.1'));

    req.body.data = crypto.decrypt(data);

    return next();
  },

  validateBuySession: function (req, res, next) {
    const { txId } = req.body;

    if (!txId) return next(property('error.400.1'));

    crypto.validateBuySession(txId, isValid => {
      if (isValid) return next();

      return next(property('error.400.4'));
    });
  },
}