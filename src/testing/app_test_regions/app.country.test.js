const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const monogodb = 'mongodb://localhost:27017/JWT';
const dotenv = require('dotenv');
const countryModel = require('../../resources/regions/countries/country.model');

const route = '/api/regions/countries';

dotenv.config();
mongoose.connect(monogodb, { useNewUrlParser: true, useUnifiedTopology: true });

describe('POST /api/regions/countries', () => {
	beforeAll(() => {
		countryModel.collection.drop();
	});

	const country = {
		country: 'United States Of America',
	};
	const invalidCountry = {
		koungtry: 'united State of america',
	};

	it('should return 201 with country name in JSON', () => {
		return request(app)
			.post(route)
			.send(country)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				expect(response.body).toEqual(
					expect.objectContaining({
						country: country.country,
					})
				);
			});
	});
	it('should return 400 due to missing name', () => {
		return request(app).post(route).send(invalidCountry).expect(400);
	});
});

describe('Get /api/regions/countries/', () => {
	beforeAll(() => {
		countryModel.collection.drop();
	});

	const country = {
		country: 'United States Of America',
	};

	it('should return 200 with all countries in a [] of JSON', () => {
		return request(app)
			.post(route)
			.send(country)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				return request(app)
					.get(route)
					.expect(200)
					.expect('Content-type', /json/)
					.then(response => {
						expect(response.body).toEqual(
							expect.arrayContaining([
								expect.objectContaining({
									country: expect.any(String),
								}),
							])
						);
					});
			});
	});
});

describe('GET /api/regions/countries/:id', () => {
	beforeAll(() => {
		countryModel.collection.drop();
	});
	const country = {
		country: 'United States Of America',
	};
	it('should return 200 with country and its contents in JSON', () => {
		return request(app)
			.post(route)
			.send(country)
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
								country: country.country,
							})
						);
					});
			});
	});
	it('should return 400 due to invalid id', () => {
		return request(app).get(`${route}/123124`).expect(400);
	});
});

describe('PUT /api/regions/countries/:id', () => {
	beforeEach(() => {
		countryModel.collection.drop();
	});

	const country = {
		country: 'United States Of America',
	};

	const newCountry = {
		country: 'The United States Of America',
	};

	const invalidCountry = {
		kountry: 'The United States Of America',
	};

	it('should return 201 and return new country obj in JSON', () => {
		return request(app)
			.post(route)
			.send(country)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				const ID = response.body._id;
				return request(app)
					.put(`${route}/${ID}`)
					.send(newCountry)
					.expect(200)
					.then(response2 => {
						expect(response2.body).toEqual(
							expect.objectContaining({
								_id: ID,
								country: newCountry.country,
							})
						);
					});
			});
	});

	it('should return 400 due to invalid update', () => {
		return request(app)
			.post(route)
			.send(country)
			.expect(201)
			.expect('Content-type', /json/)
			.then(response => {
				const ID = response.body._id;
				return request(app)
					.put(`${route}/${ID}`)
					.send(invalidCountry)
					.expect(400);
			});
	});
});

// ==== 2nd phase of testing =======

// describe('PUT/GET states /api/regions/countries/:id', () => {
// 	it('PUT(update states) should return 201 and return new country obj in JSON with state ID');
// 	it(
// 		'GET should return 201 and return new country with States populated in JSON'
// 	);
// 	it('should return 400 due to invalid update');
// });
