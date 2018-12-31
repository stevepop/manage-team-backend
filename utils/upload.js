require('dotenv').config()

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3')

const s3Config = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_S3_BUCKET,
    acl: 'public-read',
  });

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        cb(null, { image: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
})

exports.profileImage = upload;