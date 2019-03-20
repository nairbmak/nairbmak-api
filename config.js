var NodeRSA = require('node-rsa');

/**
 * Contructor
 */
var config = {};

/**
 * Development configurations
 */
config.development = {
  PORT: 3000,
  PRIVATE_KEY: new NodeRSA(`-----BEGIN RSA PRIVATE KEY-----
  MIIBOQIBAAJBAKx+OtReHHYaWbBmqFr6doJhHkGZLTJ1mkjyrkuR9SzFZcTzQvf4
  o59wrsxNR6y2RVSMzpIeAxp5qepv5ipwPrECAwEAAQJAGIe7Bgh8M697ocJ3nriP
  sertypZl/w8KaeVZNBYFr+AG0U+tPYL9TD+OMZecJ28/Bd22bN7X4oPEazlC9tvB
  gQIhANpA/Ov0TlHd4S5k9eq4myetvGXm04q6BfmSlwc5qIRFAiEAylM4ha1M2gRy
  3jPDGUyRmXIqYqpEaBQZ1+ytMR72FX0CIG2LfOb5Ym4YzbM5nWzIZ6fMvejvqHHS
  2LjhaMiJmhl5AiB+Ux2sYTrluPdbg2giKKuT6jNKrVLOxRYpui2cyN8PJQIgauTa
  P6o7LSIaf07Wph7bnz+dvjzsEu1DQ8FLKM1W068=
  -----END RSA PRIVATE KEY-----`, { encryptionScheme: 'pkcs1' }),
  IPFS: {
    URL: 'localhost',
    PORT: 5001,
    PROTOCOL: 'http'
  },
};

/**
 * Production configurations
 */
config.production = {
  PORT: 3000,
  PRIVATE_KEY: new NodeRSA(`-----BEGIN RSA PRIVATE KEY-----
  MIIBOQIBAAJBAKx+OtReHHYaWbBmqFr6doJhHkGZLTJ1mkjyrkuR9SzFZcTzQvf4
  o59wrsxNR6y2RVSMzpIeAxp5qepv5ipwPrECAwEAAQJAGIe7Bgh8M697ocJ3nriP
  sertypZl/w8KaeVZNBYFr+AG0U+tPYL9TD+OMZecJ28/Bd22bN7X4oPEazlC9tvB
  gQIhANpA/Ov0TlHd4S5k9eq4myetvGXm04q6BfmSlwc5qIRFAiEAylM4ha1M2gRy
  3jPDGUyRmXIqYqpEaBQZ1+ytMR72FX0CIG2LfOb5Ym4YzbM5nWzIZ6fMvejvqHHS
  2LjhaMiJmhl5AiB+Ux2sYTrluPdbg2giKKuT6jNKrVLOxRYpui2cyN8PJQIgauTa
  P6o7LSIaf07Wph7bnz+dvjzsEu1DQ8FLKM1W068=
  -----END RSA PRIVATE KEY-----`, { encryptionScheme: 'pkcs1' }),
  IPFS: {
    URL: 'localhost',
    PORT: 5001,
    PROTOCOL: 'http'
  },
};

/**
 * Module exports
 */
module.exports = config;