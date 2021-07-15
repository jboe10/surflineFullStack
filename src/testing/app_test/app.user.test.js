const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const monogodb = 'mongodb://localhost:27017/JWT';
const userAuthModel = require('../../auth/userAuth.model');
const userModel = require('../../resources/users/user.model');
const spotModel = require('../../resources/spots/spot.model');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(monogodb, { useNewUrlParser: true, useUnifiedTopology: true });

describe('GET /api/user', () => {
	const userCreationInfo = {
		name: '123123',
		email: '123123@gmail.com',
		password: '123123',
	};
	beforeAll(() => {
		// wipe users
		userAuthModel.collection.drop();

		// wipe userInfo
		userModel.collection.drop();
	});

	// create user, get user Info
	it('attempt login, get JWT, get userInfo', async () => {
		// create new user
		await request(app)
			.post('/api/user/register')
			.send(userCreationInfo)
			.then(response => {
				expect(response.body).toEqual({
					email: userCreationInfo.email,
				});

				// get JWT auth
				return request(app)
					.post('/api/user/login')
					.send({
						email: userCreationInfo.email,
						password: userCreationInfo.password,
					})
					.then(response => {
						expect(response.body).toEqual({
							token: expect.any(String),
						});

						// test get userInfo
						return request(app)
							.get('/api/user')
							.set('auth-token', response.body.token)
							.expect('Content-type', /json/)
							.expect(200)
							.then(response => {
								expect(response.body).toEqual(
									expect.objectContaining({
										_id: expect.any(String),
										email: expect.any(String),
										favoriteSpots: expect.any(Array),
										id: expect.any(String),
									})
								);
							});
					});
			});
	});
});

describe('PUT /api/user', () => {
	// create user and update userInfo
	const userCreationInfo = {
		name: '123123',
		email: '123123@gmail.com',
		password: '123123',
	};

	const spotCreationInfo = {
		name: 'Bolsa Chica',
		quality: 'epic',
		size: '3-4',
	};

	const spotCreationInfo2 = {
		name: 'This is a test Spot',
		quality: 'good',
		size: '4-5',
	};
	beforeAll(async () => {
		// wipe users
		userAuthModel.collection.drop();

		// wipe userInfo
		userModel.collection.drop();

		// wipe spot info
		spotModel.collection.drop();

		// create 2 new spots
		await request(app).post('/api/spots').send(spotCreationInfo);
		await request(app).post('/api/spots').send(spotCreationInfo2);
	});

	//
	it('attempt login, get JWT, get userInfo and modify favorite spots', async () => {
		// get array of spots we added as just the spots ids
		const spotIds = await request(app)
			.get('/api/spots/')
			.then(response => {
				return response.body.map(i => i._id);
			});

		// create new user
		await request(app)
			.post('/api/user/register')
			.send(userCreationInfo)
			.then(response => {
				expect(response.body).toEqual({
					email: userCreationInfo.email,
				});

				// get JWT auth
				return request(app)
					.post('/api/user/login')
					.send({
						email: userCreationInfo.email,
						password: userCreationInfo.password,
					})
					.then(response => {
						expect(response.body).toEqual({
							token: expect.any(String),
						});

						// add favorite spots ids to user using JWT auth
						return request(app)
							.put('/api/user')
							.set('auth-token', response.body.token)
							.send({ favoriteSpots: spotIds })
							.expect('Content-type', /json/)
							.expect(200)
							.then(response => {
								expect(response.body.favoriteSpots).toEqual(spotIds);
							});
					});
			});
	});
});
/*
describe('DELETE /api/user', () => {
	// create user and update userInfo
	const userCreationInfo = {
		name: '123123',
		email: '123123@gmail.com',
		password: '123123',
	};

	beforeAll(async () => {
		// wipe users
		userAuthModel.collection.drop();
		// wipe userInfo
		userModel.collection.drop();
	});

	it('delete user', async () => {
		// get array of spots we added as just the spots ids

		// create new user
		await request(app)
			.post('/api/user/register')
			.send(userCreationInfo)
			.then(response => {
				expect(response.body).toEqual({
					email: userCreationInfo.email,
				});

				// get JWT auth
				return request(app)
					.post('/api/user/login')
					.send({
						email: userCreationInfo.email,
						password: userCreationInfo.password,
					})
					.then(response => {
						expect(response.body).toEqual({
							token: expect.any(String),
						});

						// add favorite spots ids to user using JWT auth
						return request(app)
							.delete('/api/user')
							.set('auth-token', response.body.token)
							.expect('Content-type', /json/)
							.expect(200)
							.then(response => {
								expect(response.body).toEqual(
									expect.objectContaining({
										id: expect.any(String),
									})
								);
							});
					});
			});
	});
});
*/
