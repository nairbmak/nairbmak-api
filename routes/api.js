var express = require('express');
var router = express.Router();
var ipfs = require('../controllers/ipfs.controller');


/**
 * GET
 */
router.get('/', ipfs.welcome);
router.get('/report/get', ipfs.encode, ipfs.get);

/**
 * POST
 */
router.post('/report/set', ipfs.set);

/**
 * Module exports
 */
module.exports = router;