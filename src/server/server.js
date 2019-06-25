import Express from 'express';
import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../environment/store';
import App from '../environment/container/App';
import { fetchCounter } from '../environment/setup/counter';

const app = new Express();
const port = 3000;

// Middleware to set up hot module reloading - webpack.
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const handleRender = (req, res) => {
	// Asynchronous query - API
	fetchCounter(apiResult => {
		// Get counter
		const params = qs.parse(req.query);
		const counter = parseInt(params.counter, 10) || apiResult || 0;

		// Initial state - Compiling
		const preloadedState = { counter }

		// A new Redux store instance create 
		const store = configureStore(preloadedState);

		// Render the component
		const html = renderToString(
			<Provider store={store}>
				<App />
			</Provider>
		);

		// Initial state from Redux store
		const finalState = store.getState();

		// Rendered page - Send to the client
    res.send(renderFullPage(html, finalState));
    
	});
}

app.use(handleRender);

const renderFullPage = (html, preloadedState) => {
	return `
		<!doctype html>
		<html>
			<head>
				<title>Redux Universal</title>
			</head>
			<body>
				<div id="app">${html}</div>
				<script>
					window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
				</script>
				<script src="/static/bundle.js"></script>
			</body>
		</html>
		`
}

app.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info(`Listening on port ${port}. Open in your web brwoser - http://localhost:${port}/`);
	}
});
