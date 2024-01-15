const express = require('express');
const router = express.Router();
const { getAllFiles, createNewFile, getSingleFile } = require('../../controllers/uploadController.js');


router.route('/')
.get(getAllFiles)
.post(createNewFile)

router.route('/:id')
.get(getSingleFile)

// Delete file should be automatic
module.exports = router;