import React from 'react'
import classes from './styling/Footer.module.css'
function Footer() {
    return (
        <>
            <div id='ContactUs' className={`${classes.MainFooter}`}>
                <div className={`${classes.SecondFooterDiv}`}>
                    <div id='github'>
                        <a href="https://www.linkedin.com/in/deveshdighe" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
                        </a>
                    </div>

                    <div id='twitter'>
                        <a href="https://www.instagram.com/im___deveshhh?igsh=MTMwHR2Ym01NXhmaA==" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
                        </a>
                    </div>

                    <div id="G-mail">
                        <a href="https://github.com/DeveshDighe" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/fluent/30/000000/github.png" />
                        </a>
                    </div>

                    <div id="insta">
                        <a href="https://twitter.com/devesh_dighe" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" />
                        </a>
                    </div>

                </div>
                <div>
                    <p className="text-center text-gray-400 font-medium cursor-default">🤍 Thank You For Visiting 🤍</p>
                </div>
            </div>
        </>
    )
}

export default Footer
