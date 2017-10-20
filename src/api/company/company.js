const restful = require('node-restful')
const mongoose = restful.mongoose

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    cnpj: { type: String, max: 14, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createAt: { type: Date, default: Date.now }
})

module.exports = restful.model('Company', companySchema)
