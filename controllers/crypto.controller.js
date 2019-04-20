const config = global.config;
const property = global.property;

var base58 = require('bs58');
var IPFS = require('ipfs-http-client');

const crypto = require('../helpers/crypto');


module.exports = {

  encrypt: function (req, res, next) {
    const data = req.body.data;

    if (!data) return next(property('error.400.2'));

    if (data.PhanThamDinhADRCuaDonVi) {
      data.PhanThamDinhADRCuaDonVi = crypto.encrypt(data.PhanThamDinhADRCuaDonVi);
    }

    if (data.ThongTinVeNguoiDonViGuiBaoCao) {
      data.ThongTinVeNguoiDonViGuiBaoCao = crypto.encrypt(data.ThongTinVeNguoiDonViGuiBaoCao);
    }

    req.body.data = data;

    return next();
  },

  decrypt: function (req, res, next) {
    const data = req.body.data;

    if (!data) return next(property('error.400.2'));

    if (data.PhanThamDinhADRCuaDonVi) {
      data.PhanThamDinhADRCuaDonVi = crypto.decrypt(data.PhanThamDinhADRCuaDonVi);
    }

    if (data.ThongTinVeNguoiDonViGuiBaoCao) {
      data.ThongTinVeNguoiDonViGuiBaoCao = crypto.decrypt(data.ThongTinVeNguoiDonViGuiBaoCao);
    }

    req.body.data = data;

    return next();
  },
}