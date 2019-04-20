var express = require('express');
var router = express.Router();

const ipfs = require('../controllers/ipfs.controller'),
  crypto = require('../controllers/crypto.controller');


/**
 * GET
 */
router.get('/', ipfs.welcome);
router.get('/report/get', ipfs.encode, ipfs.get);

/**
 * POST
 */
router.post('/report/set', crypto.encrypt, ipfs.set);

/**
 * Module exports
 */
module.exports = router;