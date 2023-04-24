const cartsModel = require('../dao/models/carts.model')

class CartManagerDB {
	constructor() {
		this.carts = []
	}

    CreateCarts = async (cart)=>{
        try{  
            const Createcart = await cartsModel.create(cart);
            return Createcart

         } catch (error) {
           return {msg:"Error al crear Carritos"}
           
         }   
    } 	

    getCartsID = async (id) =>{

        try{
            const cart = await cartsModel.findById(id);
            return cart
        }catch(error){
            return undefined
        }
    }

    addProductToCarts = async (newCart) => {
        const Createcart = await cartsModel.create(newCart);
        return Createcart

    }  

    updateCart = async(cart) => {
        const CartUpdate = await cartsModel.findByIdAndUpdate(cart.id, cart,{
            new:true
        })
        return CartUpdate
    }
}

module.exports = CartManagerDB


