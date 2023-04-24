const ProductManager = require("../dao/ProductManager");
const { emitDeleteProduct } = require("../utils/soket.io");
const { emitaddRealtime } = require("../utils/soket.io");
const Product = new ProductManager('./assets/product.json');

const views = async (req, res) => {
    let products = await Product.getProducts();
    res.render("home",{
    products
} );       
}

const RealTimeProduct = async (req, res) =>{
    res.render('realTimeProducts')
}

const deleteRealTimeProduct = async (req, res) =>{
    const id = +req.params.pid 
  const Delete = await Product.deleteProduct (id);
  
  if (Delete.erro){
    res.json(Delete);
  }else{
    emitDeleteProduct(id)
    res.json(Delete);
  }
}

const addRealTimeProduct = async (req, res)=>{
    const body = req.body;
    
    const add = await Product.addProduct(body);
    if (add.erro){
      res.json(add)
    }else{
      emitaddRealtime(add)  
      res.json(add);
    }

}

const renderChats = (req, res)=>{
  res.render('chats')
}

const registerLogin = async(req, res)=>{
  res.render('viewregister')
}

const userLogin = async(req, res)=>{
  res.render('viewlogin')
}

module.exports ={
    views,
    RealTimeProduct,
    deleteRealTimeProduct,
    addRealTimeProduct,
    renderChats,
    registerLogin,
    userLogin
}

