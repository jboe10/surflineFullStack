import React, { useState, useEffect } from 'react';
import SignIn from './components/sign-in-page/SignIn';
import SignUp from './components/sign-up-page/SignUp';
import './styles/main.sass';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	// Link,
} from 'react-router-dom';
import Home from './components/Home';
import ArticlePage from './components/ArticlePage';
import large1 from './imgs/large1.jpg';
import large2 from './imgs/large2.jpg';
import large3 from './imgs/large3.jpg';
import feature from './imgs/feature-lg.jpg';
import News from './components/news/News';
import ForecastV2 from './components/forecasts/ForecastV2';
import { getSpotList } from './api/UserApi';
import MobileForecastsNav from './components/forecasts/MobileForecastsNav';

function App() {
	const [spots, setSpots] = useState([]);

	useEffect(() => {
		const getSpots = async () => {
			setSpots(await getSpotList());
		};
		getSpots();
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/join">
					<SignUp />
				</Route>
				<Route exact path="/login">
					<SignIn />
				</Route>
				<Route exact path="/news">
					<News />
				</Route>
				<Route exact path="/forecasts">
					<MobileForecastsNav />
				</Route>
				{spots.map(spot => (
					<Route key={spot._id} exact path={`/forecasts/${spot._id}`}>
						<ForecastV2 spot={spot} />
					</Route>
				))}
				<Route exact path="/article/feature">
					<ArticlePage
						title="Surfing Alone? Not Anymore"
						author="Master Shred"
						banner={feature}
					/>
				</Route>
				<Route exact path="/article/1">
					<ArticlePage
						title="Top Turns, Making Them Look Easy"
						author="Shred Master"
						banner={large1}
					/>
				</Route>
				<Route exact path="/article/2">
					<ArticlePage
						title="Floating Through Baja"
						author="Master Shred"
						banner={large2}
					/>
				</Route>
				<Route exact path="/article/3">
					<ArticlePage
						title="Where Did All The Time Go?"
						author="Shred Master"
						banner={large3}
					/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
