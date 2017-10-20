const restful = require('node-restful')
const mongoose = restful.mongoose

const orderSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    product: { type: String,  required: true },
    quantity: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Order', orderSchema)
