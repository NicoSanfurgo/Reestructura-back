const {Router} = require('express');
const cartsControllerBd = require('../controller/cartsDB.controller')


const router =  Router();

router.post('/', cartsControllerBd.createCarts);
router.get('/:cid', cartsControllerBd.DBgetCartId);
router.post('/:cid/product/:pid', cartsControllerBd.addProductToCart);
router.delete('/:cid/product/:pid',cartsControllerBd.deleteCartProduct);
router.delete('/:cid',cartsControllerBd.emptyCart);
router.put('/:cid/product/:pid',cartsControllerBd.UpdatequantityProduct);


module.exports = router;