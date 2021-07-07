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

//------------ api/route -------------------
describe('GET /api/spots', () => {
	beforeAll(() => {
		// cleanup old data
		spotModel.collection.drop();

		// insert test data
		spotModel.create({
			name: '17th street',
			quality: 'epic',
			size: '5-6',
		});
		spotModel.create({
			name: 'Bolsa Chica',
			quality: 'epic',
			size: '3-4',
		});
	});

	it('should respond with 200 status code and json header and array of objects with spot model and an id', async () => {
		await request(app)
			.get('/api/spots/')
			.expect(200)
			.expect('Content-Type', /json/)
			.then(response => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							_id: expect.any(String),
							name: expect.any(String),
							quality: expect.any(String),
							size: expect.any(String),
						}),
					])
				);
			});
	});
});

describe('POST /api/spots', () => {
	// clean up data
	beforeAll(() => {
		spotModel.collection.drop();
	});

	const spot = {
		name: 'This is a test Spot',
		quality: 'good',
		size: '4-5',
	};
	it('should return with 200 and a message containing json OBJ with new spot with ID', () => {
		return request(app)
			.post('/api/spots')
			.send(spot)
			.expect(201)
			.expect('Content-Type', /json/)
			.then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						name: expect.any(String),
						quality: expect.any(String),
						size: expect.any(String),
					})
				);
			});
	});

	const spot1 = {
		quality: 'good',
		size: '4-5',
	};
	it('should return with 400 because of missing name field', () => {
		return request(app).post('/api/spots').send(spot1).expect(400);
	});
	const spot2 = {
		name: 'This is a test Spot',
		size: '4-5',
	};
	it('should return with 400 because of missing quality field', () => {
		return request(app).post('/api/spots').send(spot2).expect(400);
	});
	const spot3 = {
		name: 'This is a test Spot',
		quality: 'good',
	};
	it('should return with 400 because of missing size field', () => {
		return request(app).post('/api/spots').send(spot3).expect(400);
	});
});

// describe();
// describe('POST /api/spots', () => {
// it('should respond with 200 and json header and previous obj with an ID', () => {
// 	return request(app)
// 		.post('/api/spots/')
// 		.send({
// 			name: 'Seal Beach South Sidesss',
// 			quality: 'good',
// 			size: '2-3',
// 		})
// 		.expect(200)
// 		.expect('Content-Type', /json/)
// 		.then(response => {
// 			expect(response.body).toEqual(
// 				expect.objectContaining({
// 					_id: expect.any(String),
// 					name: '45th street',
// 					quality: 'good',
// 					size: '3-4',
// 				})
// 			);
// 		});
// });
// it('should respond with json header');
// it('should respond with and object of input plus an id');
// it('should respond with 200');
// });

describe('GET /api/spots/:id', () => {
	// clean up data
	beforeAll(() => {
		spotModel.collection.drop();
	});

	const spot = {
		name: 'This is a test Spot',
		quality: 'good',
		size: '4-5',
	};

	it('should return with 200 and a message containing json OBJ with spot obj and correct obj id', async () => {
		await request(app)
			.post('/api/spots')
			.send(spot)
			.expect(201)
			.expect('Content-Type', /json/)
			.then(response1 => {
				return request(app)
					.get(`/api/spots/${response1.body._id}`)
					.expect(200)
					.expect('Content-Type', /json/)
					.then(response2 => {
						expect(response2.body).toEqual(
							expect.objectContaining({
								_id: response1.body._id,
								name: spot.name,
								quality: spot.quality,
								size: spot.size,
							})
						);
					});
			});
	});
});

describe('PUT /api/spots/:id', () => {
	// clean up data
	beforeAll(() => {
		spotModel.collection.drop();
	});

	const spot = {
		name: 'This is a test Spot',
		quality: 'good',
		size: '4-5',
	};

	const newSpot = {
		name: 'New Spot',
		quality: 'fair',
		size: '3-4',
	};

	it('should return with 200/json message and updated obj and old _id', async () => {
		await request(app)
			.post('/api/spots')
			.send(spot)
			.expect(201)
			.expect('Content-Type', /json/)
			.then(response1 => {
				return request(app)
					.put(`/api/spots/${response1.body._id}`)
					.send(newSpot)
					.expect(200)
					.expect('Content-Type', /json/)
					.then(response2 => {
						expect(response2.body).toEqual(
							expect.objectContaining({
								_id: response1.body._id,
								name: newSpot.name,
								quality: newSpot.quality,
								size: newSpot.size,
							})
						);
					});
			});
	});
});

// describe('DELETE /api/spots/:id', () => {});
