const CartManagerDB = require('../dao/CartManagerDB');
const productManagerDB = require('../dao/ProductManagerDB');
const Carts = new CartManagerDB ('./assets/product.json');


const createCarts = async (req,res)=>{
    const cart = req.body 
    const Createcart = await Carts.CreateCarts(cart);
    if (!Createcart.error){
      return res.json({
        msg: 'Carrito Creado',
        playload: Createcart,
     });      
   }else{
    return res.json({
      msg: 'No Se Creo Carrito',
      
   });      

   }



}


const DBgetCartId = async (req, res) => {
     const id = req.params.cid
     const cart = await CartManagerDB.getCartsID(id);
     if (!cart.error){
      return res.json({
        msg: 'Carrito Encontrado',
        playload: cart,
     });      
   }else{
    return {
      msg: 'No se Encontro Carrito'}
      
          
  }

       
}

const addProductToCart = async (req, res)=>{
  const {cid, pid} = req.params;
  const product = await productManagerDB.getProductId(cid);
  
  if (!product){
    return res.status(400).json({
      msg:'no se encontro el producto',
      ok:false
    })
  }
  const cart = await CartManagerDB.getCartsID;

  if(!cart){
    const newCart = {
      priceTotal: product.price,
      quantityTotal: 1,
      products:[{id:product.id, title:product.title, description:product.description, price:product.price, quantity:1}]
    }
    const CreateCart = await CartManagerDB.addProductToCart(newCart);
    return res.status(200).json({
      msg: 'carrito creado',
      cart:CreateCart
    })
  }

  const findCartProduct = cart.products.find((prod)=>prod.id === pid)

  if(!findCartProduct){
    cart.products.push({id:product.id, title:product.title,description:product.description,price:product.price, quantity:1})
    cart.quantityTotal = cart.quantityTotal + 1
    const total = cart.products.reduce((acumulador,total)=> acumulador +(total.price*total.quantity),0)
    cart.priceTotal = total
    const CartUpdate = await CartManagerDB.CartUpdate(cart)
    return res.status(200).json({
      msg:'product añadido',
      cart:CartUpdate,
    })

  }else{
    findCartProduct.quantity++
    cart.quantityTotal = cart.quantityTotal + 1
    const total = cart.products.reduce((acumulador,total)=> acumulador +(total.price*total.quantity),0)
    cart.priceTotal = total
    const CartUpdate = await CartManagerDB.CartUpdate(cart)
    return res.status(200).json({
      msg:'producto añadido',
      cart:CartUpdate,
    })
  }

}

const deleteCartProduct = async(req,res) =>{
  const {cid, pid} = req.params;
  const cart = await CartManagerDB.getCartsID(cid);

  if(!cart){
    return res.status(400).json({
      msg:'el carrito no existe',
    })
  }

  const findCartProduct = cart.products.find((prod)=> prod.id === pid)

  if(!findCartProduct){
    return res.status(400).json({
      msg:'el producto no existe'
    })
  }else{
    if(findCartProduct.quantity === 1){
      cart.products = cart.products.filter((prod)=> prod.id === pid)
    }else{
      findCartProduct.quantity --
    }
  }
  cart.quantityTotal = cart.quantityTotal - 1
  const total = cart.products.reduce((acuamulador, total)=> acuamulador + (total.price*total.quantity),0)
  cart.priceTotal = total

  const CartUpdate = await CartManagerDB.updateToCart(cart)
  return res.status(201).json({
    msg:'producto eliminado',
    cart:CartUpdate
  })
}

const emptyCart = async(req, res)=>{
  const {cid} = req.params;
  const cart = await CartManagerDB.getCartsID(cid);

  if(!cart){
    return res.status(400).json({
      msg:'no existe el carrito'
    })
  }

    cart.products = [];
    cart.quantityTotal = 0
    cart.priceTotal = 0
    const CartUpdate = await CartManagerDB.updateToCart(cart)
    return res.status(201).json({
      msg:'carrito no encontrado',
      cart:CartUpdate
    })
}

const UpdatequantityProduct = async (req,res)=>{
  const {cid, pid} = req.params;
  const {quantity} = req.body;

  const cart = await CartManagerDB.getCartsID(cid);
  if(!cart){
     return res(400).json({
      msg:'carrito no encontrado',
      ok:false
    })
  }

  const findCartProduct = cart.products.find((prod)=> prod.id === pid)

  if(!findCartProduct){
    return res.status(400).json({
      msg:'producto no encontrado',
      ok:false
    })
  }

  if(quantity === undefined){
    return res.status(400).json({
      msg:'necesita cantidad a  actualizar',
      ok:false
    })
  }else{
    if (quantity < 0){
      return res.status(400).json({
        msg:'la cantidad debe ser mayor a 1',
        ok:false
      })
    }else{
      findCartProduct.quantity = quantity
    }
  }

  cart.quantityTotal = cart.products.reduce((acumulador,total)=> acumulador + quantity,0)
  cart.priceTotal = cart.products.reduce((acumulador,total)=> acumulador + (total.price*total.quantity),0)
  const CartUpdate = await CartManagerDB.updateToCart(cart)
  return res.status(201).json({
    msg:'actualizado',
    cart:CartUpdate
  })

}


module.exports = {
    createCarts,
    DBgetCartId,
    addProductToCart,
    deleteCartProduct,
    emptyCart,
    UpdatequantityProduct
}