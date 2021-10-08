function getDecryptKey (value) {
  const key = cryptoJs.enc.Utf8.parse(secretkey)
  const iv = cryptoJs.enc.Utf8.parse(secretkey)
  const decrypted = cryptoJs.AES.decrypt(value, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  })
  return decrypted.toString(cryptoJs.enc.Utf8)
}

function getEncryptKey (value) {
  var key = cryptoJs.enc.Utf8.parse(secretkey)
  var iv = cryptoJs.enc.Utf8.parse(secretkey)
  var encrypted = cryptoJs.AES.encrypt(cryptoJs.enc.Utf8.parse(value.toString()), key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
    })
  return encrypted.toString()
}

function setPernr(data){
  console.log(data)
  pernr=data

}
function getPernr(){
  console.log(pernr)
  return pernr
}


module.exports.getEncryptKey = getEncryptKey
module.exports.getDecryptKey = getDecryptKey
module.exports.setPernr= setPernr
module.exports.getPernr= getPernr
