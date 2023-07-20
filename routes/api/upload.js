const express = require('express');
const router = express.Router();
const { uploadFile, createNewFile, getSingleFile } = require('../../controllers/uploadController.js');


router.route('/')
.post(createNewFile)

router.route('/:id')
.get(getSingleFile)

// Delete file should be automatic
module.exports = router;