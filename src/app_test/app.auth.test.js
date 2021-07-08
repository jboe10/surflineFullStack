const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const monogodb = 'mongodb://localhost:27017/JWT';
const userAuthModel = require('../auth/userAuth.model');
const userModel = require('../resources/users/user.model');
const spotModel = require('../resources/spots/spot.model');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(monogodb, { useNewUrlParser: true, useUnifiedTopology: true });

// --------------- auth ---------------------
describe('POST /api/user/register', () => {
	beforeAll(() => {
		// wipe users
		userAuthModel.collection.drop();
	});

	const userCreationInfo = {
		name: '123123',
		email: '123123@gmail.com',
		password: '123123',
	};

	it('should return user email in JSON with 201 on success', () => {
		return request(app)
			.post('/api/user/register')
			.send(userCreationInfo)
			.expect(201)
			.expect('Content-Type', /json/)
			.then(response => {
				expect(response.body).toEqual({
					email: userCreationInfo.email,
				});
			});
	});

	it('should return a 400 due to missing user Email', () => {
		return request(app)
			.post('/api/user/register')
			.send({
				name: userCreationInfo.name,
				password: userCreationInfo.password,
			})
			.expect(400);
	});
	it('should return a 400 due to missing user Name', () => {
		return request(app)
			.post('/api/user/register')
			.send({
				email: userCreationInfo.email,
				password: userCreationInfo.password,
			})
			.expect(400);
	});
	it('should return a 400 due to missing user Password', () => {
		return request(app)
			.post('/api/user/register')
			.send({
				name: userCreationInfo.name,
				email: userCreationInfo.email,
			})
			.expect(400);
	});
});
describe('POST /api/login/user', () => {
	const userCreationInfo = {
		name: '123123',
		email: '123123@gmail.com',
		password: '123123',
	};
	beforeAll(() => {
		// wipe users
		userAuthModel.collection.drop();
	});

	it('should return user email in JSON with 201 on success of creating user', async () => {
		await request(app)
			.post('/api/user/register')
			.send(userCreationInfo)
			.expect(201)
			.expect('Content-Type', /json/)
			.then(response => {
				expect(response.body).toEqual({
					email: userCreationInfo.email,
				});
			});
	});

	it('should return a 400 on invalid user/pass', async () => {
		await request(app)
			.post('/api/user/login')
			.send({
				email: '',
				password: '',
			})
			.expect(400);
	});
	it('should return a 200 with a JSON JWT on valid user/pass', async () => {
		await request(app)
			.post('/api/user/login')
			.send({
				email: userCreationInfo.email,
				password: userCreationInfo.password,
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.then(response => {
				expect(response.body).toEqual({
					token: expect.any(String),
				});
			});
	});
});
