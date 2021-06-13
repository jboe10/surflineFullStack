import React, { useState, useRef } from 'react';
import surfline from '../../imgs/surfline.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelopeOpenText,
	faNewspaper,
	faCompass,
} from '@fortawesome/free-solid-svg-icons';
import { CreateUser } from '../../api/LoginApi';
import { useHistory } from 'react-router-dom';

export default function LogInPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const history = useHistory();

	const nameForm = useRef(null);
	const emailForm = useRef(null);
	const passwordForm = useRef(null);

	const formSubmit = async event => {
		event.preventDefault();
		const nameValid = nameValidation(name);
		const emailValid = emailValidation(email);
		const passwordValid = passwordValidation(password);

		if (
			nameValid === true &&
			emailValid === true &&
			passwordValid === true
		) {
			const resp = await CreateUser(name, email, password);
			if (resp) {
				history.push('/login');
			} else {
				alert('Email in Use');
			}
		}
	};

	const nameValidation = name => {
		const regex = /.{6,}/gm;
		if (name.match(regex)) {
			nameForm.current.className = 'border-gray';
			return true;
		} else {
			nameForm.current.className = 'border-red';
			return false;
		}
	};
	const emailValidation = email => {
		const regex = /\S+@\S+\.\S+/;
		if (regex.test(email) === true) {
			emailForm.current.className = 'border-gray';
			return true;
		} else {
			emailForm.current.className = 'border-red';
			return false;
		}
	};
	const passwordValidation = password => {
		const regex = /.{6,}/gm;
		if (name.match(regex)) {
			passwordForm.current.className = 'border-gray';
			return true;
		} else {
			passwordForm.current.className = 'border-red';
			return false;
		}
	};

	return (
		<div className="sign-up-page">
			<div className="sign-up-form">
				<div className="header">
					<a href="/">
						<img
							width="50px"
							height="50px"
							src={surfline}
							alt="FF"
						/>
					</a>
				</div>
				<div className="body-wrap">
					<div className="bodys">
						<h3>Sign Up!</h3>
						<div className="sign-up">
							Have have an account?{' '}
							<a href="/login">Sign In</a>
						</div>
						<form onSubmit={formSubmit}>
							<div className="login-input">
								<input
									className="border-gray"
									type="text"
									onChange={e =>
										setName(
											e.target.value
										)
									}
									placeholder="FULL NAME"
									ref={nameForm}
								/>
							</div>
							<div className="register-info">
								(Min 6 Characters)
							</div>
							<div className="login-input email">
								<input
									className="border-gray"
									type="text"
									onChange={e =>
										setEmail(
											e.target.value
										)
									}
									placeholder="EMAIL"
									ref={emailForm}
								/>
							</div>
							<div className="register-info">
								(Valid Email)
							</div>
							<div className="login-input">
								<input
									className="border-gray"
									type="text"
									onChange={e =>
										setPassword(
											e.target.value
										)
									}
									placeholder="PASSWORD"
									ref={passwordForm}
								/>
							</div>
							<div className="register-info">
								(Min 6 Characters)
							</div>
							<button
								type="submit"
								className="sign-in-btn"
							>
								SIGN UP
							</button>
						</form>
					</div>
				</div>
			</div>

			<div className="benefits">
				<div className="benefit-wrap">
					<h2>Account Benefits</h2>

					<div className="blurb">
						<FontAwesomeIcon icon={faCompass} />
						<div className="blurb-text">
							<h4>Favorite Your Spots</h4>
							<p>
								Quickly access cams and
								forecasts for the{' '}
							</p>
							<p>breaks your care bost about</p>
						</div>
					</div>

					<div className="blurb">
						<FontAwesomeIcon
							icon={faEnvelopeOpenText}
						/>
						<div className="blurb-text">
							<h4>Email Newsletter</h4>
							<p>
								The best of surfline delivered
								straight to your
							</p>
							<p>inbox.</p>
						</div>
					</div>

					<div className="blurb">
						<FontAwesomeIcon icon={faNewspaper} />
						<div className="blurb-text">
							<h4>Personalized Homepage</h4>
							<p>
								Recieve news and forecasts
								tailored to your
							</p>
							<p>local area.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
