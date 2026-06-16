const express=require('express')
const router=express.Router()

const {createproducts,getproducts,updateproducts,createbulk,deleteproducts}=require('../controllers/productcontroller')
router.get('/',getproducts)
router.post('/',createproducts)
router.post('/bulk',createbulk)
router.put('/:id',updateproducts)
router.delete('/:id',deleteproducts)

module.exports=router