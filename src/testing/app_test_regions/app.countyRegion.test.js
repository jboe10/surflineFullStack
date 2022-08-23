const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const monogodb = 'mongodb://localhost:27017/JWT';
const dotenv = require('dotenv');
const countyRegionModel = require('../../resources/regions/countyRegions/countyRegion.model');

dotenv.config();
mongoose.connect(monogodb, { useNewUrlParser: true, useUnifiedTopology: true });

const route = '/api/regions/countyRegions';

describe('POST /api/regions/countyRegion', () => {
	beforeAll(() => {
		countyRegionModel.collection.drop();
	});

	const countyRegion = {
		countyRegion: 'Orange County',
	};
	const invalidCountyRegion = {
		fasd: 'Orange county',
	};

	it('should return 201 with countyRegion name in JSON', () => {
		return request(app)
			.post(route)
			.send(countyRegion)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						countyRegion: countyRegion.countyRegion,
					})
				);
			});
	});
	it('should return 400 due to missing name', () => {
		return request(app).post(route).send(invalidCountyRegion).expect(400);
	});
});

describe('Get /api/regions/countyRegion/', () => {
	beforeAll(() => {
		countyRegionModel.collection.drop();
	});

	const countyRegion = {
		countyRegion: 'Orange County',
	};

	const countyRegion2 = {
		countyRegion: 'Orange County2',
	};

	it('should return 200 with all countries in a [] of JSON', () => {
		return request(app)
			.post(route)
			.send(countyRegion)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				return request(app)
					.get(route)
					.expect(200)
					.expect('Content-type', /json/)
					.then(response2 => {
						expect(response2.body).toEqual(
							expect.arrayContaining([
								expect.objectContaining({
									countyRegion: expect.any(String),
								}),
							])
						);
					});
			});
	});
});

describe('GET /api/regions/countyRegion/:id', () => {
	beforeAll(() => {
		countyRegionModel.collection.drop();
	});

	const countyRegion = {
		countyRegion: 'Orange County',
	};

	it('should return 200 with countyRegion and its contents in JSON', () => {
		return request(app)
			.post(route)
			.send(countyRegion)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				const ID = response.body._id;
				return request(app)
					.get(`${route}/${ID}`)
					.expect(200)
					.expect('Content-type', /json/)
					.then(response2 => {
						expect(response2.body).toEqual(
							expect.objectContaining({
								_id: ID,
								countyRegion: countyRegion.countyRegion,
							})
						);
					});
			});
	});
	it('should return 400 due to invalid id', () => {
		return request(app).get(`${route}/1322123`).expect(400);
	});
});

describe('PUT /api/regions/countyRegion/:id', () => {
	beforeAll(() => {
		countyRegionModel.collection.drop();
	});

	const countyRegion = {
		countyRegion: 'Orange County',
	};
	const countyRegionUpdate = {
		countyRegion: '2Orange County222',
	};
	const invalidUpdate = {
		kounty: 'Orange County',
	};

	it('should return 201 and return new countyRegion obj in JSON', () => {
		return request(app)
			.post(route)
			.send(countyRegion)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				const ID = response.body._id;
				return request(app)
					.put(`${route}/${ID}`)
					.send(countyRegionUpdate)
					.expect(200)
					.expect('Content-type', /json/)
					.then(response2 => {
						expect(response2.body).toEqual(
							expect.objectContaining({
								_id: ID,
								countyRegion: countyRegionUpdate.countyRegion,
							})
						);
					});
			});
	});

	it('should return 400 due to invalid update', () => {
		return request(app)
			.post(route)
			.send(countyRegion)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				const ID = response.body._id;
				return request(app)
					.put(`${route}/${ID}`)
					.send(invalidUpdate)
					.expect(400);
			});
	});
});

// =============2nd phase of testing==============
// describe('PUT/GET states /api/regions/countyRegion/:id', () => {
// 	it('PUT(updating spots) should return 201 and return new  obj in JSON with spot ids');
// 	it('PUT(updating state) should return 201 and return new  obj in JSON with state id');
// 	it('PUT(updating country) should return 201 and return new  obj in JSON with country id');

// 	it(
// 		'GET should return 201 and return country/state/spots IDS populated in JSON'
// 	);
// 	it('should return 400 due to invalid update');
// });
