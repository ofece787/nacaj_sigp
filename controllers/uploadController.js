const upload = require('../config/multerConfig')

exports.uploadFile = (req, res) => {
  res.send('FIle uploaded successfully: ' + req.file.filename)
}