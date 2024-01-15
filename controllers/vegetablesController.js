const { ja } = require('date-fns/locale');
const Vegetable = require('../model/Vegetable')

const getAllVegetables = async(req, res) => {
    const vegetables = await Vegetable.find()
    if(!vegetables) return res.status(204).json({'message': 'No Vegetables Found!'})
    res.json(vegetables);
}

const deleteVegetable = async (req, res) => {
    if(!req?.body?.id) return res.status(404).json({'message': 'Vegetable id is required.'})
    
    const vegetable = await Vegetable.findOne({ _id: req.body.id }).exec();
    
    if(!vegetable) return res.status(204).json({'message' : `No vegetable matches ID ${req.body.id}`})
    
    try {
        await vegetable.deleteOne();
        return res.status(200).json({'message': 'Record has been successfully deleted.'})
    } catch (error) {
        console.error(error);
    }
}

const addVegetable = async(req, res) =>{
    if(!req?.body?.name) return res.status(400).json({'message': 'Vegetable name is required.'})
    
    const duplicateVegetable = await Vegetable.findOne({name: req?.body?.name}).exec();
    console.log(duplicateVegetable?.name, "duplicateVegetable")


    if(duplicateVegetable?._id){
        return res.status(400).json({'message': 'Record already exist!'})
    }
    
    try{
        return res.status(201).json({'message' : 'Record is added successfully.'})
    }catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllVegetables,
    addVegetable,
    deleteVegetable
}