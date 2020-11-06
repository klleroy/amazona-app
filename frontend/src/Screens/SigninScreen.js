import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SigninScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	};

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);

	return (
		<div>
			<form className='form' onSubmit={onSubmitHandler}>
				<div>
					<h1>Sign In</h1>
				</div>
				{loading && <LoadingBox />}
				{error && <MessageBox variant='danger'>{error}</MessageBox>}
				<div>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
						id='email'
						placeholder='Enter email'
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='password'>Email Address</label>
					<input
						type='password'
						id='password'
						placeholder='Enter password'
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label />
					<button className='primary' type='submit'>
						Sign In
					</button>
				</div>
				<div>
					<label />
					New customer? <Link to='/register'>Create Your Account</Link>
				</div>
			</form>
		</div>
	);
};

export default SigninScreen;
