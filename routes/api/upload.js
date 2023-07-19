const express = require('express');
const router = express.Router();
const uploadFile = require('../../controllers/uploadController.js');


router.route('/')
.post(uploadFile)

module.exports = router;