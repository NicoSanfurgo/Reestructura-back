const {Router} = require('express');
const productsControllerBD = require('../controller/productsDB.controller')


const router =  Router();

router.get ("/",  productsControllerBD.getProductsBd)
router.post("/", productsControllerBD.addProductBd)
router.get ("/:pid",  productsControllerBD.getProductIdBd)
router.put ("/:pid",  productsControllerBD.UpdateProductBd)
router.delete ("/:pid",  productsControllerBD.deleteProductBd)



module.exports = router;