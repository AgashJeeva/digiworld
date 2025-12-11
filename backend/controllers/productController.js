const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const q = req.query.q ? { name: new RegExp(req.query.q, 'i') } : {};
    const products = await Product.find(q).limit(500);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// low-stock check
exports.lowStock = async (req, res) => {
  try {
    const threshold = Number(process.env.LOW_STOCK_THRESHOLD) || 5;
    const products = await Product.find({});
    const low = [];

    products.forEach((prod) => {
      // check options -> variants
      if (prod.options && prod.options.length) {
        prod.options.forEach((opt) => {
          (opt.variants || []).forEach(v => {
            if (typeof v.stock === 'number' && v.stock <= threshold) {
              low.push({
                productId: prod._id,
                name: prod.name,
                category: prod.category,
                optionRam: opt.ram,
                optionStorage: opt.storage,
                color: v.color,
                stock: v.stock
              });
            }
          });
        });
      }
      // check accessories inside product
      (prod.accessories || []).forEach(acc => {
        if ((acc.stock || 0) <= threshold) {
          low.push({
            productId: prod._id,
            name: `${prod.name} - ${acc.name}`,
            category: acc.category,
            stock: acc.stock
          });
        }
      });
      // check globalStock if present
      if (typeof prod.globalStock === 'number' && prod.globalStock <= threshold) {
        low.push({
          productId: prod._id,
          name: prod.name,
          category: prod.category,
          stock: prod.globalStock
        });
      }
    });

    res.json({ threshold, low });
  } catch (err) {
    console.error('lowStock error', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};
