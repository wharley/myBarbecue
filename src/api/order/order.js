const restful = require('node-restful')
const mongoose = restful.mongoose

const productSchema = new mongoose.Schema({
    description: { type: String, required: true },
    quantity: { type: Number, min: 0, required: true }
})

const orderSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    product: [productSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Order', orderSchema)
