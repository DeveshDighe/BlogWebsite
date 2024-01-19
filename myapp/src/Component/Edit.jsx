import fb from '../firebase'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import classes from './styling/CreateBlog.module.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


const DB = fb.firestore();
const Bloglist = DB.collection('blogs');
const storageRef = fb.storage().ref();


function Edit() {

  const { id } = useParams();

  const [title, SetTitle] = useState('')
  const [body, SetBody] = useState('')
  const [about, SetAbout] = useState('')
  const [coverImg, SetcoverImg] = useState(null)
  const [submitButtonDisable, setsubmitButtonDisable] = useState(false)
  const [loder, Setloader] = useState(false);
  let floatingTextarea = document.getElementById('floatingTextarea')

  const route = useNavigate();

  useEffect(() => {
    Bloglist.doc(id).get().then((snapshot) => {
      const data = snapshot.data();
      SetBody(data.body);                 //SetBody function will update body with its body data which is stored in firebase server
      SetTitle(data.title);  //Same with title
      SetAbout(data.about);  //Same with title
    })
  }, [])

  const handleCoverImgChange = (e) => {
    if (e.target.files[0]) {
      SetcoverImg(e.target.files[0]); //it wll store selected file detail in coverImg
      console.log(e.target.files[0], 'fdfdfdfddf');
    }
  };

  const submit = (e) => {
    e.preventDefault();

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
          Bloglist.doc(id).update({
            title: title,
            about: about,
            body: body,
            coverImgUrl: url
          }).then((docref) => {
            Setloader(false)
            setsubmitButtonDisable(false);
            toast.success('Blog Edited')
            route('/')
            //This will help to change fileInput value to empty string in html page
          }).catch((error) => {
            console.log(error, '- error');
          })
        })
      }

    )


    // Bloglist.doc(id).update({         //this will update data of bloglist of specific id
    //   title: title,
    //   body: body,
    //   about: about,
    // }).then((docref) => {
    //   alert('data successfully sumbit')
    // }).catch((error) => {
    //   console.log(error, '- error');
    // })
  }


  return (
    <div className={`${classes.border, classes.EditMainDiv} d-flex align-items-center justify-content-center`}>
      <form className={`container`} onSubmit={(event) => { submit(event) }}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Blog Title :</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { SetTitle(e.target.value) }} required value={title} placeholder='Title' />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="floatingTextarea">About :</label>
          <textarea className="form-control" placeholder="Write Something . . . ." id="About" onChange={(e) => { SetAbout(e.target.value) }} required value={about} maxLength={80}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="floatingTextarea">Decription :</label>
          <textarea className="form-control Custom_textarea" placeholder="Write Something . . . ." id="floatingTextarea" onChange={(e) => { SetBody(e.target.value) }} required value={body} minLength={10}></textarea>
        </div>
        <div>
          <input type="file" accept='image/*' name='coverIMG' onChange={(e) => handleCoverImgChange(e)} id='coverImgid' required />

          <div className={`${classes.load} mt-5`}>
            {loder && <ClipLoader color="#f84dba" speedMultiplier={0.9}
            />}
          </div>
        </div>

        <div className='d-flex align-items-center justify-content-center'><button type="submit" className="btn btn-primary" disabled={submitButtonDisable}>Submit</button></div>

        {/* 1. Here added value attribute and assigned it value of  title and body 

            2. whith the onChange event i am able to change input feild ,.it changes title and body . then title and body is shown as value to the perticular input feilds */}
      </form>
    </div>
  )
}

export default Edit