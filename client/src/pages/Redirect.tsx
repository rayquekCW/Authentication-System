import {useSearchParams} from 'react-router-dom';
import {useState} from 'react';

function Redirect() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [data, setData] = useState({
		access_token: 'this is supposed to be the access token',
	});
	const [userData, setUserData] = useState({
		name: 'this is supposed to be the user data',
		email: 'this is supposed to be the user email',
		given_name: 'this is supposed to be the user given name',
		family_name: 'this is supposed to be the user family name',
		birthdate: 'this is supposed to be the user birthdate',
		gender: 'this is supposed to be the user gender',
		phone_number: 'this is supposed to be the user phone number',
	});
	async function getAccessToken(code: string | null) {
		if (code === null) return;
		try {
			const response = await fetch('http://localhost:8001/auth/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					code: code, // Pass the code from your form or wherever you get it
				}),
			});

			if (response.ok) {
				const data = await response.json();
				console.log('coming from client', data);
				setData(data); // Update the access token state
			} else {
				console.error(
					`Failed to fetch access token. Status code: ${response.status}`
				);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	}

	async function getUserData(accessToken: string | null) {
		if (accessToken === null) return;
		try {
			const response = await fetch(
				'http://localhost:8001/auth/userinfo',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						accessToken: accessToken,
					}),
				}
			);
			if (response.ok) {
				const data = await response.json();
				console.log('coming from client', data);
				setUserData(data); // Update the access token state
			} else {
				console.error(
					`Failed to fetch access token. Status code: ${response.status}`
				);
			}
		} catch (error) {
			console.error('Something went wrong');
		}
	}

	return (
		<div>
			<h1>{searchParams.get('code')}</h1>
			{/* <h1>{data?.access_token}</h1> */}
			<h1>{userData.name}</h1>
			<h1>{userData.given_name}</h1>
			<h1>{userData.family_name}</h1>
			<h1>{userData.email}</h1>
			<h1>{userData.gender}</h1>
			<h1>{userData.phone_number}</h1>
			<button onClick={() => getAccessToken(searchParams.get('code'))}>
				generate access token
			</button>
			<button onClick={() => getUserData(data.access_token)}>
				generate User Data
			</button>
		</div>
	);
}

export default Redirect;

// https://smurnauth-production.fly.dev/oauth/authorize?client_id=13LTcEHonYQ3S97oUAaQiOcNNvKstoE8ol5GgJGM8Xg&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fbank&response_type=BxPD6StHW7PvO__Zv49DHVm2sZIfxdrN1uw8285zFBU&scope=openid+profile

// https://smurnauth-production.fly.dev/oauth/authorize?client_id=13LTcEHonYQ3S97oUAaQiOcNNvKstoE8ol5GgJGM8Xg&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fbank&response_type=code&scope=openid+profile
