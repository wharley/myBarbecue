const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    /*
     * Route protected by Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const Company = require('../api/company/companyService')
    Company.register(protectedApi, '/companys')

    const Order = require('../api/order/orderService')
    Order.register(protectedApi, '/orders')

    const User = require('../api/user/authService')
  	protectedApi.put('/users', User.account)    

    /*
     * Route open
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}
