import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js';
import './CreateBlog.css'
import { useNavigate } from 'react-router-dom';
import classes from './styling/SignUp.module.css'

function SignIn() {
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [ErrorMsg, setErrorMsg] = useState('')
    const [submitButtonDisable, setsubmitButtonDisable] = useState(false)
    const router = useNavigate();

    function detectChange(event) {
        setUserData({ ...userData, [event.target.name]: event.target.value })
        console.log(userData);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userData, 'fdfdfdffdfdf');
        if (!userData.email || !userData.password) {
            setErrorMsg('all fields are required')
            return;
        }

        setErrorMsg('');

        setsubmitButtonDisable(true);
        signInWithEmailAndPassword(auth, userData.email, userData.password)
            .then(async (res) => {
                console.log(res, 'afafafafafaddddd');
                setsubmitButtonDisable(false);
                router('/')
                console.log(res, 'rererererrererererererererererererererer');
            }).catch((err) => {
                setsubmitButtonDisable(false);
                setErrorMsg('Something wrong');
            });
    }

    return (
        <div className={`${classes.MainDiv}  mx-auto d-flex align-items-center justify-content-center `}>
            <div className='w-75'>
                <form onSubmit={(event) => { handleSubmit(event) }}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={detectChange} name='email' />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={detectChange} name='password' />
                    </div>
                    <div>
                        <p >Create account ? <span className={`${classes.AlreadyAcc}`} onClick={() => router('/signUp')}>SignUp</span></p>
                    </div>
                    <div>
                        <p className={`${classes.para}`}>{ErrorMsg}</p>
                    </div>
                    <div className='d-flex align-items-center justify-content-center mt-4'>
                        <button type="submit" className={`btn  w-50 ${classes.btnColor}`} disabled={submitButtonDisable}>Submit</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn