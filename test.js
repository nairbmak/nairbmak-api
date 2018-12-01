var NodeRSA = require('node-rsa');

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

// console.log(key.exportKey())

const data = {
    private: {
      DateADR: '',
      DurationADR: '',
      DVTDuration: '',
      DescriptionsADR: '',
      XetNghiemADR: '',
      TienSuADR: '',
      XuTriADR: '',
      DoNghiemTrongADR: '',
      KetQuaXuTriADR: '',
      DanhGiaMLQ: '',
      ThangADR: '',
    },
    public: { 
      BinhLuan: '',
      HoTenNG: '',
      NgheNghiepNG: '',
      EmailNG: '',
      PhoneNumberNG: '',
      ReportType: '',
      ReportDate: '',
      TenDonVi: '',
      DiaChiDV: '',
      ThuocNghiNgoJson: '',
      ThuocDongThoiJson: '',
    }
  };

const encrypted = key.encrypt(JSON.stringify(data.private), 'base64');
// console.log('encrypted: ', encrypted);

decrypted = key.decrypt('hVbti2S2y3GBID7a/V/WqtAgJS1/6kooguzNV3vN7KFZlwQcXgepZxv7u/1N3EfK8JhpzqH4vtlkcLCJG8mBxXDnCv9hbmRkgT0UOsPz3pSwEh+zsZfIi/H7Zb/hvNzJFogHEX4H8Z82n8+mxela60F3J9Jy9bWNAhhlTUjreTudcLEKybxbzUOviVr7ECY47Wggz3OBh5qlu2XaqYQOCh6N0brFYGAXFfTJa8kGIEadJzbxm3J9E6yYfd6+CFnr', 'utf8');
console.log('decrypted: ', decrypted);