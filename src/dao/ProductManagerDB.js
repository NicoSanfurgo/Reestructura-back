const productModel = require('../dao/models/products.model')

class productManagerDB {
  addProduct = async (product) => {
    return await productModel.create(product);
  
}
  getProduct = async (page = 1, limit = 6 , sort = '', query ={}) => {
      return  await productModel.paginate(query, { page, limit, sort:{price:sort}});
  }

  getProductId = async (id) => {
   return await productModel.findById(id);
  }

  UpdateProduct = async (id, product) => {
     return await productModel.updateOne({_id:id}, product);
     
  }

  DeleteProductId = async (id) => {
     return await productModel.deleteOne({_id:id});

  }

}


module.exports = new productManagerDB