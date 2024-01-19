import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase.js';
import './CreateBlog.css'
import { useNavigate } from 'react-router-dom';
import classes from './styling/SignUp.module.css'

function SignUp() {

    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
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
        if (!userData.name || !userData.email || !userData.password) {
            setErrorMsg('all fields are required')
            return;
        }

        setErrorMsg('');

        setsubmitButtonDisable(true);
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then(async (res) => {
                console.log(res, 'afafafafafaddddd');
                setsubmitButtonDisable(false);
                const user = res.user;
                await updateProfile(user, {
                    displayName: userData.name
                })
                router('/signIn')

            }).catch((err) => {
                setsubmitButtonDisable(false);
                setErrorMsg('Something wrong');
            });
    }

    return (
        <div className={`${classes.MainDiv}  mx-auto d-flex align-items-center justify-content-center `}>
            <div className='w-75'>
                <form onSubmit={(event) => { handleSubmit(event) }} >
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">User name</label>
                        <input type="text" className="form-control" onChange={detectChange} name='name' />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={detectChange} />

                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' onChange={detectChange} />
                    </div>

                    <div>
                        <p >Already have an account ?  <span className={`${classes.AlreadyAcc}`} onClick={() => router('/signIn')} >SingIn</span></p>
                    </div>

                    <p className={`${classes.para}`}>{ErrorMsg}</p>
                    <div className='d-flex align-items-center justify-content-center mt-4'>
                        <button type="submit" id='disablebtn' className={`btn  w-50 ${classes.btnColor}`} disabled={submitButtonDisable}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp