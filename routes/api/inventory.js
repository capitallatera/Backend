const express = require('express')
const router = express.Router()
const { getAllInventory, addInventory, deleteInventory, singleInventory, updateInventory } = require('../../controllers/inventoryController')

router.route('/')
.get(getAllInventory)
.post(addInventory)
.delete(deleteInventory)
.put(updateInventory)

router.route('/:id')
.get(singleInventory)

module.exports = router;