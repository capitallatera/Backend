const express = require('express')
const router = express.Router()
const { getAllVegetables, addVegetable, deleteVegetable } = require('../../controllers/vegetablesController')

router.route('/')
.get(getAllVegetables)
.post(addVegetable)
.delete(deleteVegetable)

module.exports = router;