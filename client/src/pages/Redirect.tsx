import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

function Redirect() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [data, setData] = useState('this is supposed to be the access token');
	useEffect(() => {
		async function getAccessToken(code: string | null) {
			if (code === null) return;
			const response = await fetch(
				'http://smurnauth-production.fly.dev/oauth/token',
				{
					method: 'POST',
					mode: 'no-cors',
					// headers: {
					// 	'Access-Control-Allow-Origin': '*',
					// 	'Content-Type': 'application/json',
					// 	origin: 'http://localhost:5173/bank',
					// },
					body: JSON.stringify({
						client_id: import.meta.env.VITE_CLIENT_ID,
						client_secret: import.meta.env.VITE_CLIENT_SECRET,
						grant_type: 'authorization_code',
						code: code,
						redirect_uri: 'http://localhost:5173/bank',
					}),
				}
			);
			console.log(response);
		}

		getAccessToken(searchParams.get('code'));
	}, [searchParams.get('code')]);

	return (
		<div>
			<h1>{searchParams.get('code')}</h1>
			<h1>{data}</h1>
		</div>
	);
}

export default Redirect;

// https://smurnauth-production.fly.dev/oauth/authorize?client_id=13LTcEHonYQ3S97oUAaQiOcNNvKstoE8ol5GgJGM8Xg&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fbank&response_type=BxPD6StHW7PvO__Zv49DHVm2sZIfxdrN1uw8285zFBU&scope=openid+profile

// https://smurnauth-production.fly.dev/oauth/authorize?client_id=13LTcEHonYQ3S97oUAaQiOcNNvKstoE8ol5GgJGM8Xg&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fbank&response_type=code&scope=openid+profile
