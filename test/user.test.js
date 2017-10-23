'use strict'

const assert = require('assert')
const should = require('should')
const nock = require('nock')
const request = require('supertest')('http://localhost:3000/oapi/v1/myBarbecue')
const expect = require('chai').expect

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/myBarbecueTest', {useMongoClient: true})

const User = require('../src/api/user/user')

describe('Testing API with a mocked backend', () => {

	it('should create users', (done) => {

		nock('http://localhost:3000/oapi/v1/myBarbecue')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.post('/user', {
				name: 'teste-mocha-mocked',
				email: 'teste-mocha@mocha.com.br',
				password: 'Tteste@12345'
			})
			.reply(200, (uri, req, cb) => {

				const data = JSON.parse(req)

				const newUser = new User({
					name: data.name,
					email: data.email,
					password: data.password
				})

				newUser.save( (err, user) => {
					if(err) cb(err)

					cb(null, user)
				})

			})

			const users = {
				name: 'teste-mocha-mocked',
				email: 'teste-mocha@mocha.com.br',
				password: 'Tteste@12345'
			}

			request
				.post('/user')
				.send(users)
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body.name).to.equal('teste-mocha-mocked');
			        done();
				})
	})

	it('should findOne users', (done) => {

		nock('http://localhost:3000/oapi/v1/myBarbecue')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.get('/user', {
				name: 'teste-mocha-mocked'
			})
			.reply(200, (uri, requestBody, cb) => {

				const data = JSON.parse(requestBody)
				User.findOne({name: data.name}, (err, user) => {

					if(err) cb(err)

					cb(null, user)
				})
			})

			const users = {
				name: 'teste-mocha-mocked'
			}

			request
				.get('/user')
				.send(users)
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body.name).to.equal('teste-mocha-mocked');
			        done();
				})
	})

	it('should update users', (done) => {

		nock('http://localhost:3000/oapi/v1/myBarbecue')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.put('/user', {
				name: 'teste-mocha-mocked'
			})
			.reply(200, (uri, requestBody, cb) => {

				const data = JSON.parse(requestBody)

				User.update({name: data.name}, {email: data.email}, (err, user) => {

					if(err) cb(err)

					cb(null, user)
				})
			})

			const users = {
				name: 'teste-mocha-mocked'
			}

			request
				.put('/user')
				.send(users)
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body.ok).to.equal(1);
			        done();
				})
	})

	it('should delete users', (done) => {

		nock('http://localhost:3000/oapi/v1/myBarbecue')
			.defaultReplyHeaders({
		  		'Content-Type': 'application/json'
		  	})
			.delete('/user', {
				name: 'teste-mocha-mocked'
			})
			.reply(200, (uri, requestBody, cb) => {

				const data = JSON.parse(requestBody)

				User.remove({name: data.name}, (err, user) => {

					if(err) cb(err)

					cb(null, user)
				})
			})

			const users = {
				name: 'teste-mocha-mocked'
			}

			request
				.delete('/user')
				.send(users)
				.set({'Content-Type': 'application/json'})
				.end((err, res) => {
			        expect(res.body.ok).to.equal(1)
			        done()
				})
	})

})
