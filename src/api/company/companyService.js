'use strict'
const Company = require('./company')
const errorHandler = require('../common/errorHandler')

Company.methods(['get', 'post', 'put', 'delete'])
Company.updateOptions({new: true, runValidators: true})
Company.after('post', errorHandler).after('put', errorHandler)

Company.before('post', validateCnpj).before('put', validateCnpj)

function validateCnpj(req, res, next) {

  const cnpj = req.body.cnpj.replace(/[^\d]+/g,'')

  if (cnpj == '')
    return res.status(400).send({errors: ['Cnpj empty! Please fill.']})

  if (cnpj.length != 14)
    return res.status(400).send({errors: ['Cnpj invalid! Fourteen size.']})

  // Deletes known invalid CNPJs
  if (cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999')
      return res.status(400).send({errors: ['Cnpj invalid! Please fill correctly.']})

  // Valid DVs
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  let digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2)
      pos = 9
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
      return res.status(400).send({errors: ['Cnpj invalid! Please fill correctly.']})

  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2)
      pos = 9
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
  if (resultado != digitos.charAt(1))
        return res.status(400).send({errors: ['Cnpj invalid! Please fill correctly.']})

  next()
}

module.exports = Company
