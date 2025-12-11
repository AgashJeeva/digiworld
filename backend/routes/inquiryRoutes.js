const express = require('express');
const router = express.Router();
const inqCtrl = require('../controllers/inquiryController');
const { protect, adminOnly } = require('../utils/authMiddleware');

router.post('/', inqCtrl.createInquiry);
router.get('/', protect, adminOnly, inqCtrl.getInquiries);

module.exports = router;
