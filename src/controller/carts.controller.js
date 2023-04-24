
const ProductManager = require("../dao/ProductManager");
const CartManager = require('../dao/CartManager')
const Product = new ProductManager('./assets/product.json');
const Carts = new CartManager(__dirname + '/../../assets/carts.json');

const createCarts = async (req, res) => {
    const resp = await Carts.CreateCarts();
    res.json({ msg: "Carrito creado con éxito", id: resp })
}

const getCarts = async (req, res) => {
    const cart = await Carts.getCarts(req.params.cid);
    if (cart.error) {
        res.json(cart)
    } else {
        res.json(cart)
    }
}

const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const products = await Product.getProductById(pid);
    
    if (products) {
        const resp = await Carts.addProductCart(cid, products.id);
        res.json({ msg:"Producto Agregado"})  
        }else {
        res.json({ msg:"Producto no encontrado"})  
    }
    
}
module.exports = {
    createCarts,
    getCarts,
    addProductToCart
}