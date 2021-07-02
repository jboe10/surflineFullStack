import { colorClassName } from './Constants';

export const importAllImgs = requireImgs => {
	return requireImgs.keys().map(requireImgs);
};

export const getRndInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export const nameLoginValidation = (name, inputElement) => {
	const regex = /.{6,}/gm;
	return regex.test(String(name).toLowerCase());
};

export const emailLoginValidation = (email, inputElement) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const passwordLoginValidation = (password, inputElement) => {
	const regex = /.{6,}/gm;
	return regex.test(String(password).toLowerCase);
};

export const convertArrayToHashOfId = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: '',
		};
	}, initialValue);
};

export const surfColorClassNameGen = (baseClass, surfCondition) => {
	let surfQualityColorClassName = '';
	switch (surfCondition) {
		case 'epic':
			surfQualityColorClassName = `${baseClass} ${colorClassName.epic}`;
			break;
		case 'good':
			surfQualityColorClassName = `${baseClass} ${colorClassName.good}`;
			break;
		case 'fair':
			surfQualityColorClassName = `${baseClass} ${colorClassName.fair}`;
			break;
		case 'poor':
			surfQualityColorClassName = `${baseClass} ${colorClassName.poor}`;
			break;
		default:
			surfQualityColorClassName = `${baseClass} ${colorClassName.poor}`;
			break;
	}
	return surfQualityColorClassName;
};

export const scrollLeftSmooth = (ref, left) => {
	if (ref) {
		ref.scrollBy({
			top: 0,
			left: left,
			behavior: 'smooth',
		});
	}
};

export const compareSelectorState = (obj1, obj2) => {
	if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
		return true;
	} else {
		return false;
	}
};
