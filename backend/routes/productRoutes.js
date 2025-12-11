const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const { protect, adminOnly } = require('../utils/authMiddleware');

router.get('/', productCtrl.getAllProducts);
router.get('/low-stock', productCtrl.lowStock);
router.get('/:id', productCtrl.getProductById);

// admin routes
router.post('/', protect, adminOnly, productCtrl.createProduct);
router.put('/:id', protect, adminOnly, productCtrl.updateProduct);
router.delete('/:id', protect, adminOnly, productCtrl.deleteProduct);

module.exports = router;
