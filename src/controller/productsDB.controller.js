const productManagerDB = require("../dao/ProductManagerDB");


const getProductsBd = async (req, res) => {
  const {limit, page , sort, ...query} = req.query;
       const products = await Products.getProduct(page, limit, sort, query);
       if (products){
          return res.json({
            msg: 'Ok',
            playload: products,
         });      
       }else{
        return res.json({
          msg: 'No se puedo mostrar Producto',
          
       });      

       }

     
};

const addProductBd = async (req, res)=>{
  const product = req.body;
    const newproduct = await Products.addProduct(product);
    if (newproduct){
      return res.json({
        msg: 'Producto Agregado',
        playload: newproduct,
      });      
    }else{
      return res.json({
        msg: 'No se puedo Crear Producto',
        
     });      
    }
  
}


const getProductIdBd = async (req, res)=>{
  const id = req.params.pid 
  const getProductId = await Products.getProductId(id);
  if (getProductId){
    return res.json({
      msg: 'Producto Encontrado',
      playload: getProductId,
    });      
  }else{
    return res.json({
      msg: 'Producto No encontrado',
      
   });      
  }



}

const UpdateProductBd = async (req, res)=>{
  const id = req.params.pid 
  const product = req.body
  const UpdateProductId = await Products.UpdateProduct(id, product);
  if (UpdateProductId){
    return res.json({
      msg: 'Producto Actualizado',
      playload: UpdateProductId,
    });      
  }else{
    return res.json({
      msg: 'Producto No Actualizado',
      
   });      
  }
  

}

const deleteProductBd = async (req, res)=>{
  const id = req.params.pid 
    const deleteproduct = await Products.DeleteProductId(id);
    if (deleteproduct){
      return res.json({
        msg: 'Producto Eliminado',
        playload: deleteproduct,
      });      
    }else{
      return res.json({
        msg: 'Producto No Eliminado'
        
     });      
    }
}

module.exports ={
    getProductsBd, 
    getProductIdBd,    
    addProductBd,
    UpdateProductBd,     
    deleteProductBd,
}