const Inventory = require('../model/Inventory');
const Vegetable = require('../model/Vegetable');

const getAllInventory = async(req, res) => {
    const inventory = await Inventory.find()
    if(!inventory) return res.status(204).json({'message': 'No inventory Found!'})
    res.status(200).json(inventory);
}

const addInventory = async(req, res) =>{
    if( !req?.body?.name || !req?.body?.rate || !req?.body?.quantity ) 
    return res.status(400).json({'message': 'Manadatory fields are required.'})
    
    const duplicateInventory = await Inventory.findOne({name: req?.body?.name}).exec();

    if(duplicateInventory?._id){
        return res.status(400).json({'message': 'Record already exist with this name!'})
    }
    
    try{
        const result = await Inventory.create({
            name: req.body.name,
            rate: req.body.rate,
            quantity: req.body.quantity
        })
        return res.status(201).json('Record is added successfully.')
    }catch(err){
        console.error(err);
    }
}

const deleteInventory = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({"message": "Inventory ID is required"})
    const inventory = await Inventory.findOne({ _id: req.body.id }).exec();

    if(!inventory) {
        return res.status(204).json({"message": "No record not found!"});
    }
    try{
        await inventory.deleteOne();
        return res.status(200).json({"message": "Record deleted successfully"})
    }catch(err){
        console.error(err);
    }
}

const singleInventory = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({"message": "Inventory ID is required"})
    const inventory = await Inventory.findOne({_id: req.params.id}).exec();
    res.status(200).json(inventory);
}

const updateInventory = async(req, res) =>{
    if( !req?.body?._id || !req?.body?.name || !req?.body?.rate || !req?.body?.quantity ) 
    return res.status(400).json({'message': 'Manadatory fields are required.'})
    const {_id, name, rate, quantity} = req?.body
    const prior = await Inventory.findOne({_id: _id}).exec();

    if(prior?._id){
        await Inventory.findByIdAndUpdate(_id, {
            name: name,
            rate: rate,
            quantity: quantity,
        })
        return res.status(200).json({'message': 'Record is updated successfully.'})
    } else {
        return res.status(400).json({'message': 'Record does not exist with this name!'})
    }
}

module.exports = {
    getAllInventory,
    addInventory,
    deleteInventory,
    singleInventory,
    updateInventory
}