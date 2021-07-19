const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const monogodb = 'mongodb://localhost:27017/JWT';
const dotenv = require('dotenv');
const stateModel = require('../../resources/regions/states/state.model');

const statesRoute = '/api/regions/states';

dotenv.config();
mongoose.connect(monogodb, { useNewUrlParser: true, useUnifiedTopology: true });

describe('POST /api/regions/state', () => {
	beforeAll(() => {
		stateModel.collection.drop();
	});

	const state = {
		state: 'California',
	};

	const invalidState = {
		skate: 'California',
	};

	it('should return 201 with state name in JSON', () => {
		return request(app)
			.post(statesRoute)
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
		return request(app).post(statesRoute).send(invalidState).expect(400);
	});
});

describe('Get /api/regions/state', () => {
	beforeAll(() => {
		stateModel.collection.drop();
	});

	const state = {
		state: 'California',
	};
	it('no Entries should return 200 with a [] of JSON', () => {
		return request(app)
			.get(statesRoute)
			.expect(200)
			.expect('Content-type', /json/)
			.then(response => {
				expect(response.body).toEqual([]);
			});
	});

	it('should return 200 with all states in a [] of JSON', () => {
		return request(app)
			.post(statesRoute)
			.send(state)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				return request(app)
					.get(statesRoute)
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
		stateModel.collection.drop();
	});

	const state = {
		state: 'California',
	};

	it('should return 200 with state and its contents in JSON', () => {
		return request(app)
			.post(statesRoute)
			.send(state)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				const ID = response.body._id;
				return request(app)
					.get(`${statesRoute}/${ID}`)
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
		return request(app).get(`${statesRoute}/123123123123`).expect(400);
	});
});

describe('PUT /api/regions/state/:id', () => {
	beforeAll(() => {
		stateModel.collection.drop();
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
			.post(statesRoute)
			.send(state)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				ID = response.body._id;
				return request(app)
					.put(`${statesRoute}/${ID}`)
					.send(updateState)
					.expect(200)
					.expect('Content-type', /json/)
					.then(response2 => {
						expect(response2.body).toStrictEqual(
							expect.objectContaining({
								_id: ID,
								state: updateState.state,
							})
						);
					});
			});
	});
	it('should return 400 due to invalid update ID', () => {
		return request(app).put(`${statesRoute}/123123123123`).expect(400);
	});

	it('should return 400 due to invalid update ID', () => {
		return request(app)
			.put(`${statesRoute}/${ID}`)
			.send(invalidUpdate)
			.expect(400);
	});
});

// // ============= 2nd phase of testing ============
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
