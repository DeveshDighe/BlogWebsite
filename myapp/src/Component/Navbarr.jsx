import React, { useState } from 'react'
import { signOut, updateProfile } from 'firebase/auth';
import Navbar from 'react-bootstrap/Navbar';
import classes from './styling/ShowBlog.module.css'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'



function Navbarr() {
    const [user, setuser] = useState(false)
    const [dropDown, setdropDown] = useState(false);
    const auth = getAuth();

    const router = useNavigate();

    const Show = () => {
        setdropDown((prev) => !prev)
    }

    const Signout = () => {


        if (auth.currentUser) {           // this say that if user is logged in then only run next code                                             
            signOut(auth).then((() => {
                // Sign-out successful.
                toast.success('SignOut Successfully')
            })).catch((error) => {
                console.log(error);
            })
        }
        else {
            toast.error('LogIn first')
        }
    }
    return (
        <Navbar className={`${classes.Navbg} ${classes.navForm}`}>
            <div>
                <h4 className={`${classes.Navh4}`}>DevBlog</h4>
                <h5 onClick={() => router('/')} className={`${classes.Navh5}`}>Home</h5>
                <h5 onClick={() => router('/createBlogs')} className={`${classes.Navh5}`}>Create Blog</h5>
                <h5 className={`${classes.Navh5}`}>Contact Us</h5>
            </div>
            <div>
                {
                    !auth.currentUser ? <button className={`${classes.Sign}`} onClick={() => router('/SignUp')}>SignUp</button> : <button className={`${classes.Sign}`} onClick={() => Signout()}>SignOut</button>
                }
                <div >
                    <svg className={`${classes.icons}`} onClick={() => Show()} xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>

                </div>
                {/* {dropDown &&(
            <ul className={`${classes.DropDown}`}  id="toggle">
                <li><a>abc</a></li>
                <li><a >drf</a></li>
                <li><a >ghi</a></li>
                <li><a >lij</a></li>
            </ul>)
            } */}

                <ul className={`${dropDown ? classes.DropDown : classes.DropDownHide}`} id="toggle">
                    <div>
                        <li><a href='#' onClick={() => router('/')} className={`${classes.Drop_A}`}>Home</a></li>
                        <li><a href='#' onClick={() => router('/createBlogs')} className={`${classes.Drop_A}`}>Create Blog</a></li>
                        <li><a href='#' className={`${classes.Drop_A}`}>Contact Us</a></li>
                        <li><a href='#' className={`${classes.Drop_A}`} onClick={() => router('/SignUp')}>SignIn</a></li>
                        <li><a href='#' className={`${classes.Drop_A}`} onClick={() => Signout()}>SignOut</a></li>
                    </div>
                </ul>

            </div>
        </Navbar>
    )
}

export default Navbarr