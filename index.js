var fs = require('fs');
var http = require('http');
var request = require('request');
var NodeRSA = require('node-rsa');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = http.createServer(app);

const keyData = `-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAKx+OtReHHYaWbBmqFr6doJhHkGZLTJ1mkjyrkuR9SzFZcTzQvf4
o59wrsxNR6y2RVSMzpIeAxp5qepv5ipwPrECAwEAAQJAGIe7Bgh8M697ocJ3nriP
sertypZl/w8KaeVZNBYFr+AG0U+tPYL9TD+OMZecJ28/Bd22bN7X4oPEazlC9tvB
gQIhANpA/Ov0TlHd4S5k9eq4myetvGXm04q6BfmSlwc5qIRFAiEAylM4ha1M2gRy
3jPDGUyRmXIqYqpEaBQZ1+ytMR72FX0CIG2LfOb5Ym4YzbM5nWzIZ6fMvejvqHHS
2LjhaMiJmhl5AiB+Ux2sYTrluPdbg2giKKuT6jNKrVLOxRYpui2cyN8PJQIgauTa
P6o7LSIaf07Wph7bnz+dvjzsEu1DQ8FLKM1W068=
-----END RSA PRIVATE KEY-----`;

const key = new NodeRSA(keyData);
key.setOptions({
  encryptionScheme: 'pkcs1'
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Welcome to Nairbmak APIs!');
});

app.get('/adr-report', function (req, res) {
  request('http://localhost:5001/api/v0/cat?arg=QmSVit3XXC5fAPGkGmtWJy8KJtNxJJrZ8Smcr8XALabyZK', (err, response, data) => {
    data = JSON.parse(data);
    const decrypted = JSON.parse(key.decrypt(data.privateInfo, 'utf8'));
    res.send({ data: decrypted });
  });
});

app.post('/adr-report/save', function (req, res) {
  const data = req.body;
 
  const encrypted = key.encrypt(JSON.stringify(data.privateInfo), 'base64');
  data.privateInfo = encrypted;

  const fileName = "adr-report-" + Date.now() + '.json';

  fs.writeFile(fileName, JSON.stringify(data), function(err) {
    if (err) {
      return res.status(500).send({ action: 'Save JSON file', message: err.message });
    }

    var formData = {
      file: fs.createReadStream(__dirname + '/' + fileName),
    };

    request({ url:'http://localhost:5001/api/v0/add', formData: formData }, function (err, response, data) {
      if (err) {
        return res.status(500).send({ action: `Save file ${fileName} to IPFS`, message: err.message });
      }
      fs.unlink(__dirname + '/' + fileName);
      
      data = JSON.parse(data);
      res.send({ hash: data.Hash });
    });
  });
});


app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist.");
});


server.listen(3002);
server.on('listening', onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('*** Listening on ' + bind);
}

