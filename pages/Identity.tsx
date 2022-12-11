import React, { useState, useEffect } from 'react'
import './Identity.scss'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { signInCreator } from '../store/reducers/ActionCreators'
import { authSlice } from '../store/reducers/AuthSlice'

const Identity = () => {

	const [activeWindow, setActiveWindow] = useState<string>('login')
	const [userName, setUserName] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const token = localStorage.getItem('token')
	const { isPending } = useAppSelector(state => state.authReducer)

	const dispatch = useAppDispatch()
	const { signIn } = authSlice.actions

	function changeIdentityWindow() {
		const windows = document.querySelector<HTMLElement>('.identity__windows')
		const windowLeft = document.querySelector<HTMLElement>('.identity__login-window')
		const windowRight = document.querySelector<HTMLElement>('.identity__register-window')
		if (windows && windowLeft && windowRight) {
			if (activeWindow === 'login') {
				windows.style.translate = '0px'
				// делаем прозрачность элемента во время движения
				// и снова НЕпрозрачность когда он уже полностью "уехал"
				windowRight.style.opacity = '0'
				setTimeout(() => {
					windowRight.style.opacity = '1'
				}, 700);
			}
			else {
				//находим ширину элемента
				const [windowsWidth] = window.getComputedStyle(windows).width.split('px');
				//сдвигаем пол элемента
				windows.style.translate = String(-Number(windowsWidth) / 2) + 'px';
				windowLeft.style.opacity = '0'
				setTimeout(() => {
					windowLeft.style.opacity = '1'
				}, 700);
			}
		}
	}

	useEffect(() => {
		changeIdentityWindow()
	}, [activeWindow])

	return (
		<div className='identity'>
			<div className="container">
				<div className="identity__inner">
					<div className="identity__entry-btns">
						<button
							className={`identity__btn ${activeWindow === 'login' ? 'identity__btn_active' : ''}`}
							onClick={() => setActiveWindow('login')}
						>
							<h2 className='identity__btn-title'>Login</h2>
						</button>
						<button
							className={`identity__btn ${activeWindow === 'register' ? 'identity__btn_active' : ''}`}
							onClick={() => setActiveWindow('register')}
						>
							<h2 className='identity__btn-title'>Create account</h2>
						</button>
					</div>
					<div className="identity__windows">
						<div className="identity__window identity__login-window">
							<div className="identity__inputs">
								<input
									className="identity__input identity__username"
									type="text"
									placeholder='Username'
									value={userName}
									onChange={e => setUserName(e.target.value)}
								/>
								<input
									className="identity__input identity__password"
									type="password"
									placeholder='Password'
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<button
								className='identity__btn-accept'
								onClick={() => dispatch(signInCreator(userName, password))}
							>
								sign in
							</button>
						</div>
						<div className="identity__window identity__register-window">
							<div className="identity__inputs">
								<input className="identity__input identity__username" type="text" placeholder='Username' />
								<input className="identity__input identity__password" type="text" placeholder='Password' />
								<input className="identity__input identity__repeat-password" type="text" placeholder='Repeat password' />
							</div>
							<button className='identity__btn-accept'>sign in</button>
						</div>
					</div>
					<h2 className={
						isPending
							?
							"identity__loading-logo identity__loading-logo_active"
							:
							"identity__loading-logo"
					}>
						Wait please...
					</h2>
				</div>
			</div>
		</div>
	)
}

export default Identity

// где Линк - надо сделать переход назад по истории, где был до этого