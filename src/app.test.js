const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
const monogodb = 'mongodb://localhost:27017/JWT';

mongoose.connect(monogodb, { useNewUrlParser: true, useUnifiedTopology: true });

//------------ api/route -------------------

describe('GET /api/spots', () => {
	it('should respond with 200 status code and json header', () => {
		return request(app)
			.get('/api/spots/')
			.expect(200)
			.expect('Content-Type', /json/)
			.then(response => {
				expect(response.body).toEqual({});
			});
	});
});

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

// describe('GET /api/spots/:id', () => {});

// describe('PUT /api/spots/:id', () => {});

// describe('DELETE /api/spots/:id', () => {});

// --------------- auth ---------------------

// describe('JWT /api/user', () => {});

// describe('post /api/login/user', () => {
// 	it('should return a 400 on invalid user/pass', () => {
// 		return request(app)
// 			.post('/api/user/login')
// 			.send({
// 				email: '',
// 				password: '',
// 			})
// 			.expect(400);
// 	});
// it('should return a 200 on valid user/pass', () => {
// 	return request(app)
// 		.post('/api/user/login')
// 		.send({
// 			email: '123123@gmail.com',
// 			password: '123123',
// 		})
// 		.expect(200);
// });
// });

// describe('POST /api/user', () => {});

// describe('PUT /api/user', () => {});

// describe('DELETE /api/user', () => {});
