const CartManagerDB = require("../dao/CartManagerDB");


const viewsBd = async (req, res) => {
    const {cid} = req.params 
    const Carts= await CartManagerDB.getCartsId(cid);
    
    let products = []
    Carts.products.map((cart)=>{
    products.push({
    quantity:cart.quantity,
    price:cart.price,
    title:cart.product.title,
    description:cart.product.description
    })})
    res.render("viewCarts", {products,quantityTotal:Carts.quantityTotal, priceTotal:Carts.priceTotal})
}

module.exports ={
    viewsBd
}