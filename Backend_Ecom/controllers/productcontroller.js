let products=require('../models/productmodel')
exports.getproducts=async(request,response)=>{
    try {
        let allProducts = await products.find();
        response.status(200).json(allProducts);
    } catch (error) {
        response.json(error.message);
    }
}

exports.createproducts=async(request,response)=>{
    try {
        await products.create(request.body);
        response.status(201).json({msg:"Products saved"});
    } catch (error) {
        response.json(error.message);
    }
}

exports.createbulk=async(request,response)=>{
    try {
        await products.insertMany(request.body)
        response.status(201).json({msg:"All Products saved"});

    } catch (error) {
        response.json(error.message);
    }
}

exports.updateproducts=async(request,response)=>{
    try {
        let prodcutId = request.params.id;
        await products.findByIdAndUpdate(prodcutId,request.body);
        response.json({msg:"products are updated"})
    } catch (error) {
        response.json(error.message);
    }
}

exports.deleteproducts=async(request,response)=>{
    try {
        let productId = request.params.id;
        await products.findByIdAndDelete(productId);
        response.json({msg:"product is deleted"})
    } catch (error) {
        response.json(error.message);
    }
}