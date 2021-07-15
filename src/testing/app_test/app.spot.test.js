const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const monogodb = 'mongodb://localhost:27017/JWT';
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

	it('should respond with 200 status code and json header and array of objects with spot model and an id', () => {
		return request(app)
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

	it('should return with 200 and a message containing json OBJ with spot obj and correct obj id', () => {
		// create a spot
		return request(app)
			.post('/api/spots')
			.send(spot)
			.expect(201)
			.expect('Content-Type', /json/)
			.then(response1 => {
				// take spot unique id use get to retrieve it
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
	let newSpot_Id;
	it('should return with 200/json message and updated obj and old _id', () => {
		// create a spot
		return request(app)
			.post('/api/spots')
			.send(spot)
			.expect(201)
			.expect('Content-Type', /json/)
			.then(response1 => {
				// grab spots unique ID && attempt to modify it
				newSpot_Id = response1.body._id;
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

	const badSpotUpdate = {
		name: 'This is a test Spot',
		quality: 'good',
		size: '4-5',
		extra: 'aaa',
	};

	const fieldMissingUpdate = {
		name: 'This is a test Spot',
		quality: 'good',
	};
	it('should return a 400 due to excess field on update', () => {
		return request(app)
			.put(`/api/spots/${newSpot_Id}`)
			.send(badSpotUpdate)
			.expect(400);
	});
	it('should return 200 because fields arent required', () => {
		return request(app)
			.put(`/api/spots/${newSpot_Id}`)
			.send(fieldMissingUpdate)
			.expect(200)
			.expect('Content-type', /json/);
	});
});

// describe('DELETE /api/spots/:id', () => {});
