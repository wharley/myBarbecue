'use strict'
const Order = require('./order')
const errorHandler = require('../common/errorHandler')

Order.methods(['get', 'post', 'put', 'delete'])
Order.updateOptions({new: true, runValidators: true})
Order.after('post', errorHandler).after('put', errorHandler)

module.exports = Order
