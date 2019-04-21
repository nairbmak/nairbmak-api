var express = require('express');
var router = express.Router();

const ipfs = require('../controllers/ipfs.controller'),
  crypto = require('../controllers/crypto.controller'),
  data = require('../controllers/data.controller');


/**
 * GET
 */
router.get('/', ipfs.welcome);
router.get('/report/get', ipfs.encode, ipfs.get);

/**
 * POST
 */
router.post('/report/set', crypto.encrypt, ipfs.set);
router.post('/data/buy', crypto.validateBuySession, crypto.decrypt, data.buy);

/**
 * Module exports
 */
module.exports = router;