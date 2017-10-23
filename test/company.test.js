'use strict'

const assert = require('assert')
const should = require('should');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Company = require('../src/api/company/company')

mongoose.connect('mongodb://localhost/myBarbecueTest', {useMongoClient: true})

describe('Company testing', () => {
	it('should create companys', (done) => {

		const newCompany = new Company({
			name: 'rodrigo',
			cnpj: '12345678901234'
		})

		newCompany.save( (err, company) => {

			if(err) return done(err)

			company.name.should.equal('rodrigo')
			done()
		})

	})

	it('should findOne companys', (done) => {

		Company.findOne({
			name: 'rodrigo'
		}, (err, company) => {

			if(err) return done(err)

			company.should.be.ok()
			done()
		})
	})

	it('should delete companys', (done) => {

		Company.remove({}, (err, company) => {

			if(err) return done(err)

			company.should.be.ok()
			done()
		})
	})
})
