// import fetch from 'node-fetch';
const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8001;

require('dotenv').config();

app.use(express.json()); // Enable JSON parsing for POST requests
app.use(cors()); // Enable CORS for all requests

async function getUserData(accessToken) {
	if (accessToken === null) return;

	try {
		const url = 'https://smurnauth-production.fly.dev/oauth/userinfo';
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			method: 'GET',
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error(
				`Failed to fetch data. Status code: ${response.status}`
			);
		}
	} catch (error) {
		console.error(`An error occurred: ${error}`);
	}
}

async function getAccessToken(code) {
	if (code === null) return;
	try {
		const response = await fetch(
			'https://smurnauth-production.fly.dev/oauth/token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					grant_type: 'authorization_code',
					code: code,
					redirect_uri: 'http://localhost:5173/bank',
				}),
			}
		);

		if (!response.ok) {
			throw new Error(`Request failed with status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error.message);
	}
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/auth/token', async (req, res) => {
	console.log(req.body);
	const {code} = req.body;

	if (!code) {
		return res.status(400).json({error: 'Access token is missing.'});
	}

	try {
		const userData = await getAccessToken(code);
		console.log('this is output in line 80', userData);
		res.status(200).json(userData);
	} catch (error) {
		res.status(500).json({error: 'Failed to retrieve access token.'});
	}
});

app.post('/auth/userinfo', async (req, res) => {
	const {accessToken} = req.body;

	if (!accessToken) {
		return res.status(400).json({error: 'Access token is missing.'});
	}
	try {
		const userData = await getUserData(accessToken);
		console.log('this is output in line 95', userData);
		res.status(200).json(userData);
	} catch (error) {
		res.status(500).json({error: 'Failed to retrieve user data.'});
	}
});

app.get('/', (req, res) => {
	res.json({message: 'Hello from server!'});
});
