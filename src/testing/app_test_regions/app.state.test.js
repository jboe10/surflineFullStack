const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const monogodb = 'mongodb://localhost:27017/JWT';
const dotenv = require('dotenv');
const stateModel = require('../../resources/regions/states/state.model');

dotenv.config();
mongoose.connect(monogodb, { useNewUrlParser: true, useUnifiedTopology: true });

describe('POST /api/regions/state', () => {
	beforeAll(() => {
		stateModel.collections.drop();
	});

	const state = {
		state: 'California',
	};

	const invalidState = {
		skate: 'California',
	};

	it('should return 201 with state name in JSON', () => {
		return require(app)
			.post('/api/regions/state')
			.send(state)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						state: state.state,
					})
				);
			});
	});

	it('should return 400 due to missing name', () => {
		return require(app)
			.post('/api/regions/state')
			.send(invalidState)
			.expect(400);
	});
});

describe('Get /api/regions/state', () => {
	beforeAll(() => {
		stateModel.collections.drop();
	});

	const state = {
		state: 'California',
	};
	it('no Entries should return 200 with a [] of JSON', () => {
		return require(app)
			.get('/api/regions/state')
			.expect(200)
			.expect('Content-type', /json/)
			.then(response => {
				expect(response.body).toEqual([]);
			});
	});

	it('should return 200 with all states in a [] of JSON', () => {
		return require(app)
			.post('/api/regions/state')
			.send(state)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				return require(app)
					.get('/api/regions/state')
					.expect(200)
					.expect('Content-type', /json/)
					.then(response2 => {
						expect(response2.body).toEqual(
							expect.arrayContaining([
								expect.objectContaining({
									state: expect.any(String),
								}),
							])
						);
					});
			});
	});
});

describe('GET /api/regions/state/:id', () => {
	beforeAll(() => {
		stateModel.collections.drop();
	});

	const state = {
		state: 'California',
	};

	it('should return 200 with state and its contents in JSON', () => {
		return request(app)
			.post('/api/regions/state')
			.send(state)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				const ID = response.body._id;
				return require(app)
					.get(`/api/regions/state/${ID}`)
					.expect(200)
					.expect('Content-type', /json/)
					.then(response2 => {
						expect(response2.body).toEqual(
							expect.objectContaining({
								_id: ID,
								state: state.state,
							})
						);
					});
			});
	});

	it('should return 400 due to invalid id', () => {
		return require(app).get(`/api/regions/state/123123`).expect(400);
	});
});

describe('PUT /api/regions/state/:id', () => {
	beforeAll(() => {
		stateModel.collections.drop();
	});

	const state = {
		state: 'California',
	};

	const updateState = {
		state: 'Nevada',
	};

	const invalidUpdate = {
		skate: 'Nevada',
	};

	let ID;

	it('should return 201 and return new state obj in JSON', () => {
		return request(app)
			.post('/api/regions/state')
			.send(state)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				ID = response.body._id;
				return request(app)
					.put(`/api/regions/state/${ID}`)
					.expect(200)
					.expect('Content-type', /json/)
					.then(response2 => {
						expect(response2.body).toBe(
							expect.objectContaining({
								_id: ID,
								state: updateState.state,
							})
						);
					});
			});
	});
	it('should return 400 due to invalid update ID', () => {
		return request(app).put('/api/regions/state/123123').expect(400);
	});

	it('should return 400 due to invalid update ID', () => {
		return request(app)
			.put(`/api/regions/state/${ID}`)
			.send(invalidUpdate)
			.expect(400);
	});
});

// ============= 2nd phase of testing ============
// describe('PUT/GET countyRegion IDS in /api/regions/state/:id', () => {
// 	it('PUT should return 201 on update');
// 	it(
// 		'Get after countyRegions updated should return 200 with a populated countyRegions'
// 	);
// });

// describe('PUT/get country ID in /api/regions/state/:id', () => {
// 	it('PUT should return 201 on update');
// 	it('Get after country updated should return 200 with a populated country');
// });
