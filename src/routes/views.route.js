const {Router} = require('express')
const viewControllers = require('../controller/views.controller')
const viewProductsController = require('../controller/viewProducts.controller')
const viewCartsController = require('../controller/viewCarts.controller')

const router = Router();

router.get('/', viewControllers.views)
router.get('/products',viewProductsController.viewsBd)
router.get('/carts/cid:',viewCartsController.viewsBd)
router.get('/realtimeproducts/', viewControllers.RealTimeProduct)
router.delete('/realtimeproducts/:pid', viewControllers.deleteRealTimeProduct)
router.post('/realtimeproducts/', viewControllers.addRealTimeProduct)
router.get('/chats',viewControllers.renderChats)
router.get('/login',viewControllers.userLogin)
router.get('/register',viewControllers.registerLogin)

module.exports = router;