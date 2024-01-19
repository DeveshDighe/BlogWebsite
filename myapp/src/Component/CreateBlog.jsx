import fb from '../firebase'
import React, { useState } from 'react';
import './CreateBlog.css'
import { getAuth } from 'firebase/auth'
import toast from 'react-hot-toast';
import classes from './styling/CreateBlog.module.css'
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';


const DB = fb.firestore();
const Bloglist = DB.collection('blogs');
const storageRef = fb.storage().ref();
const auth = getAuth();




function CreateBlog() {

  const [title, SetTitle] = useState('')
  const [body, SetBody] = useState('')
  const [about, SetAbout] = useState('')
  const [coverImg, SetcoverImg] = useState(null)
  const [submitButtonDisable, setsubmitButtonDisable] = useState(false)
  const [loder, Setloader] = useState(false);
  let floatingTextarea = document.getElementById('floatingTextarea')

  const router = useNavigate();



  const handleCoverImgChange = (e) => {
    if (e.target.files[0]) {
      SetcoverImg(e.target.files[0]); //it wll store selected file detail in coverImg
      console.log(e.target.files[0], 'fdfdfdfddf');
    }
  };

  const submit = (e) => {

    e.preventDefault();


    if (auth.currentUser) {
      if (floatingTextarea.value.length < 500) {
        return toast('Description must be at least 500 characters long')
      }

      Setloader(true);
      setsubmitButtonDisable(true);

      const uploadtask = storageRef.child('images/' + coverImg.name).put(coverImg);

      uploadtask.on('state_changed', snapshot => { },

        error => {
          console.log(error);
        },
        () => {
          storageRef.child('images/' + coverImg.name).getDownloadURL().then(url => {
            console.log('img url:', url);
            Bloglist.add({
              title: title,
              about: about,
              body: body,
              coverImgUrl: url,
              ImgUploader: auth.currentUser.email
            }).then((docref) => {
              Setloader(false)
              setsubmitButtonDisable(false);
              setTimeout(() => {
                toast.success('Blog Uploaded Successfully')

                const fileInput = document.getElementById('coverImgid');    //This will help to change fileInput value to empty string in html page
                if (fileInput) {
                  fileInput.value = null;
                }
                SetTitle('')
                SetBody('')
                SetAbout('')
                SetcoverImg(null)
                router('/')
              }, 0);
            }).catch((error) => {
              console.log(error, '- error');
            })
          })
        }

      )

    }
    else {
      return toast('Please logIn First')
    }


  }
  return (
    <div className={`${classes.border, classes.mainDiv} d-flex align-items-center justify-content-center`}>
      <form className={`container`} onSubmit={(event) => { submit(event) }}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Blog Title :</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { SetTitle(e.target.value) }} required value={title} placeholder='Title' />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="floatingTextarea">About :</label>
          <textarea className="form-control" placeholder="Write Something . . . ." id="About" onChange={(e) => { SetAbout(e.target.value) }} required value={about} maxLength={80} ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="floatingTextarea">Decription :</label>
          <textarea className="form-control Custom_textarea" placeholder="Write Something . . . ." id="floatingTextarea" onChange={(e) => { SetBody(e.target.value) }} required value={body} minLength={10} ></textarea>
        </div>
        <div>
          <input type="file" accept='image/*' name='coverIMG' onChange={(e) => handleCoverImgChange(e)} id='coverImgid' className={`${classes.inputFile}`} required />

          {/* <h1 >Loading</h1> */}
          <div className={`${classes.load} mt-5`}>
            {loder && <ClipLoader color="#f84dba" speedMultiplier={0.9}
            />}
          </div>
        </div>

        <div className='d-flex align-items-center justify-content-center'><button type="submit" className="btn btn-primary px-5 py-2 mt-4" id='submitbtn' disabled={submitButtonDisable} >Submit</button></div>

      </form>
    </div>
  )
}

export default CreateBlog
