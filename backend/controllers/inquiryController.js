const Inquiry = require('../models/Inquiry');

exports.createInquiry = async (req, res) => {
  try {
    const { name, email, message, productId } = req.body;
    const inq = await Inquiry.create({ name, email, message, productId });
    res.status(201).json(inq);
  } catch (err) {
    console.error('createInquiry error', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const list = await Inquiry.find({}).sort({ createdAt: -1 }).limit(500);
    res.json(list);
  } catch (err) {
    console.error('getInquiries error', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};
