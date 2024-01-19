import fb from '../firebase'
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import './CreateBlog.css'
import classes from './styling/ShowBlog.module.css'


const DB = fb.firestore();
const Bloglist = DB.collection('blogs');


function Showblog() {
  const [blogList, SetBloglist] = useState([])
  const { id } = useParams();

  Bloglist.doc(id).get().then((snapshot) => {
    const data = snapshot.data();
    SetBloglist(data);
  })
  return (
    // <div>
    //     <h1>Title :</h1>
    //     <h5>{blogList.title}</h5>
    //     <h1>Decreption</h1>
    //     <p>{blogList.body}</p>
    //     <h1>About</h1>
    //     <p>{blogList.about}</p>
    //     <img src= {blogList.coverImgUrl} alt="" />
    // </div>

    <div className={`${classes.mainDiv} d-flex justify-content-center`}>
      <div className={`${classes.secDiv} mt-3 text-center`}>
        <div className={`${classes.aboutDiv} mb-5 mb-sm-4 mt-lg-5 mt-sm-0`}>
          <h3 className={`text-center`}>Title :</h3>
          <h5>{blogList.title}</h5>
        </div>
        <div className={`${classes.ImgDiv} d-flex justify-content-center align-items-center mb-5 mb-sm-4 mt-5 `}>
          <div className={`${classes.InnerImgDiv}`}>
            <img className={`${classes.ImgFull} img-fluid `} src={blogList.coverImgUrl} alt="" />
          </div>
        </div>

        <div className={`${classes.aboutDiv} mb-5 mb-sm-4 mt-5`}>
          <h3>About :</h3>
          <p>{blogList.about}</p>
        </div>

        <div className={`${classes.aboutDiv} mb-5 mb-sm-4 mt-5`}>
          <h3 className='mb-4 '>Decreption :</h3>
          <p className={`${classes.Dec_Center}`}><pre className={`${classes.preClass}`}>{blogList.body}</pre></p>
        </div>
      </div>
    </div>
  )
}

export default Showblog