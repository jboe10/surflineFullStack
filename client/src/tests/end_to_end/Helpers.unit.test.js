import {
	nameLoginValidation,
	emailLoginValidation,
	convertArrayToHashOfId,
	surfColorClassNameGen,
} from '../../utils/Helpers';
import { colorClassName } from '../../utils/Constants';

test('validate name is 6 or more characters', () => {
	expect(nameLoginValidation('BobbyJoe')).toBe(true);
	expect(nameLoginValidation('Bobby Joe')).toBe(true);
	expect(nameLoginValidation('BobbyJo!')).toBe(true);
	expect(nameLoginValidation('')).toBe(false);
	expect(nameLoginValidation('12345')).toBe(false);
});

test('validate email is valid email address', () => {
	expect(emailLoginValidation('123456@gmail.com')).toBe(true);
	expect(emailLoginValidation('1234@gmail.com')).toBe(true);
	expect(emailLoginValidation('123 456@gmail.com')).toBe(false);
	expect(emailLoginValidation('123456')).toBe(false);
});

test('turn array into hash', () => {
	expect(
		convertArrayToHashOfId(
			[{ _id: '1' }, { _id: '2' }, { _id: '3' }, { _id: '4' }],
			'_id'
		)
	).toStrictEqual({ 1: '', 2: '', 3: '', 4: '' });
});

test('returns base class and surf quality', () => {
	const baseClass = 'base-class';
	expect(surfColorClassNameGen(baseClass, 'poor')).toBe(
		`${baseClass} ${colorClassName.poor}`
	);
	expect(surfColorClassNameGen(baseClass, 'good')).toBe(
		`${baseClass} ${colorClassName.good}`
	);
	expect(surfColorClassNameGen(baseClass, 'fff')).toBe(
		`${baseClass} ${colorClassName.poor}`
	);
});
