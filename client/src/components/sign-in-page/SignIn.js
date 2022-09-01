import React, { useState } from 'react';
import surfline from '../../imgs/surfline.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelopeOpenText,
	faNewspaper,
	faCompass,
} from '@fortawesome/free-solid-svg-icons';
import LoginRequest from '../../api/LoginApi';
import { useHistory } from 'react-router-dom';

export default function SignIn() {
	const [login, setLogin] = useState();
	const [password, setPassword] = useState();
	const history = useHistory();

	const formSubmit = async event => {
		event.preventDefault();
		try {
			const resp = await LoginRequest(login, password);
			localStorage.setItem('auth-token', resp);
			history.push('/');
		} catch {
			alert('invalid user/pass');
		}
	};

	const loginInputChangeHandler = event => {
		setLogin(event.target.value);
	};

	const passwordInputChangeHandler = event => {
		setPassword(event.target.value);
	};

	return (
		<div className="sign-in">
			<div className="login">
				<div className="header">
					<a href="/">
						<img width="50px" height="50px" src={surfline} alt="FF" />
					</a>
				</div>
				<div className="body-wrap">
					<div className="bodys">
						<h3>Sign in</h3>
						<div className="sign-up">
							Dont have an account? <a href="/join">Sign Up</a>
						</div>
						<form onSubmit={formSubmit}>
							<div className="login-input">
								<input
									type="text"
									onChange={loginInputChangeHandler}
									placeholder="EMAIL"
								/>
							</div>
							<div className="login-input">
								<input
									type="text"
									onChange={passwordInputChangeHandler}
									placeholder="PASSWORD"
								/>
							</div>
							{/* <a href="/">Forgot Password?</a> */}
							<button type="submit" className="sign-in-btn">
								SIGN IN
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
							<p>Quickly access cams and forecasts for the </p>
							<p>breaks your care bost about</p>
						</div>
					</div>

					<div className="blurb">
						<FontAwesomeIcon icon={faEnvelopeOpenText} />
						<div className="blurb-text">
							<h4>Email Newsletter</h4>
							<p>The best of surfline delivered straight to your</p>
							<p>inbox.</p>
						</div>
					</div>

					<div className="blurb">
						<FontAwesomeIcon icon={faNewspaper} />
						<div className="blurb-text">
							<h4>Personalized Homepage</h4>
							<p>Recieve news and forecasts tailored to your</p>
							<p>local area.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
