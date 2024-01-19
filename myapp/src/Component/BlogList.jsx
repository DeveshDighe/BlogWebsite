
import fb from '../firebase';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'

import classes from './styling/Bloglist.module.css'

const DB = fb.firestore();
const Bloglist = DB.collection('blogs');


function BlogList(props) {

  const [blogList, SetBloglist] = useState([]);
  const [CopyblogList, SetCopyBloglist] = useState([]); //Copied variable 
  const [search, Setsearch] = useState('');
  // console.log(search);

  const auth = getAuth();





  const router = useNavigate();

  // // Sign out function
  // const Signout = () => {
  //   const auth = getAuth();

  //   if (auth.currentUser) {           // this say that if user is logged in then only run next code                                             
  //     signOut(auth).then((() => {
  //       // Sign-out successful.
  //       toast.success('LogOut Successfully')
  //     })).catch((error) => {
  //       console.log(error);
  //     })
  //   }
  //   else {
  //     toast.error('LogIn first')
  //   }
  // }


  // Delete blog function

  const DeleteBlog = (id) => {
    Bloglist.doc(id).delete().then(() => {
      alert('Blog deleted successfully');
    }).catch((error) => {
      console.error('Error removing Blog', error);
    })
  }

  // const SearchBlog = (e) =>{
  //   e.preventDefault();
  //   SetBloglist(blogList.filter((blog)=>{
  //     blog.title.toLowerCase().includes(search.toLowerCase())
  //   }))
  // }
  const SearchBlog = (e) => {
    e.preventDefault();
    if (search === '') {
      SetBloglist(CopyblogList)
    }
    else {
      const filteredBlogs = blogList.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())   //blog all title includes search variable (match search variable value or not) (best way)

        // or can do this also
        // blog.title.toLowerCase() === search.toLowerCase()
      );
      console.log(filteredBlogs);
      SetBloglist(filteredBlogs);
    }

  };


  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = Bloglist.limit(10).onSnapshot(querySnapshot => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map(doc => ({       //so what i am doing here is all the array elements {objects} are mapping 1 by 1 and and adding id key to them and giving them id uniquely
        ...doc.data(),      //This will help to get old data if id is present it will not assign another id
        id: doc.id,
      }));
      // Update state
      SetBloglist(data);
      SetCopyBloglist(data);
      console.log(data);
    });

    // Detach listener
    console.log(unsubscribe);
    return unsubscribe;
  }, []);









  // if(auth.currentUser.email == Bloglist.ImgUploader){
  //   Delete.style.display = 'block';
  //   Edit.style.display = 'block';
  // }
  // else{
  //   Delete.style.display = 'none';
  //   Edit.style.display = 'none';
  // }
  return (
    // <div>

    //   <div>
    //     <button onClick={() => router('/signUp')}>SignUp</button>
    //     <button onClick={() => Signout()}>SignOut</button>
    //     <p>{props.name ? `Welcome - ${props.name}` : 'Login Please'}</p>
    //   </div>

    //   <form className='container mt-5 d-flex justify-content-between align-items-center' onSubmit={(e) => SearchBlog(e)}>
    //     <div className="w-100">
    //       <input type="search" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Search Title . . .' onChange={(e) => { Setsearch(e.target.value); SearchBlog(e); }}/>
    //     </div>
    //     <button type="submit" className="btn btn-primary">Submit</button>
    //   </form>


    //   {blogList.map((blg) => (
    //     <div style={{ border: '1px solid red' }} key={blg.id}>
    //       <p>Title : {blg.title}</p>
    //       <p>About : {blg.about}</p>
    //       <p>Body : {blg.body}</p>
    //       <img src={blg.coverImgUrl} alt="BlogImg" />
    //       <button onClick={() => router(`/showBlog/${blg.id}`)} id='view'>View</button>
    //       {auth.currentUser&&auth.currentUser.email === blg.ImgUploader && 
    //         <>
    //           <button onClick={() => router(`/editBlog/${blg.id}`)} id='Edit'>Edit</button>
    //           <button onClick={() => DeleteBlog(blg.id)} id='Delete'>Delete</button>
    //         </>
    //       }
    //     </div>
    //   ))}
    // </div>

    <div className='mb-4'>

      <div className={`${classes.User}`}>
        <p title='user' className={`${classes.UserText}`}>{props.name ? `Welcome - ${props.name}` : 'Login Please'}</p>
      </div>

      <form className='container d-flex justify-content-center align-items-center mb-4' onSubmit={(e) => SearchBlog(e)}>
        <div className="w-50">
          <input type="search" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Search Blog . . .' onChange={(e) => { Setsearch(e.target.value); SearchBlog(e); }} />
        </div>
        <button type="submit" className={`${classes.butSearch} btn btn-secondary`}>Search</button>
      </form>

      <div className={`${classes.blogListMainDiv}`}>
        <div className={`${classes.BlogListContentDiv}`}>
          {blogList.map((blg) => (
            <div className={`${classes.blogListDiv}`}>
              <div className={`${classes.SectionImg}`}>
                <div className={`${classes.listImg}`} >
                  <img className={`${classes.img100} `} src={blg.coverImgUrl} alt="BlogImg" />
                </div>
              </div>

              <div className="kaka">
                <div className={`${classes.SectionContent}`}>
                  <div className={`${classes.listTitle}`}><p>  <strong>Title :</strong>  {blg.title}</p></div>
                  <div className={`${classes.listAbout}`}><p><strong>About :</strong> {blg.about}</p></div>
                  <div className={`${classes.listBody}`}><p><strong>Decription :</strong> {blg.body}</p></div>

                  <div className={`${classes.listButtons}`} >
                    <button id='view' onClick={() => router(`/showBlog/${blg.id}`)} className={`${classes.butView}`} ><svg xmlns="http://www.w3.org/2000/svg" height="20" width="24" viewBox="0 0 576 512"><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /><title>View Blog</title></svg></button>


                    {auth.currentUser && auth.currentUser.email === blg.ImgUploader &&
                      <>
                        <button onClick={() => router(`/editBlog/${blg.id}`)} id='Edit' className={`${classes.butEdit}`}><svg xmlns="http://www.w3.org/2000/svg" height="20" width="24" viewBox="0 0 512 512" title='gfgfgfg'><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /><title>Edit Blog</title></svg></button>
                        <button className={`${classes.butDelete}`} onClick={() => DeleteBlog(blg.id)} id='Delete'><svg xmlns="http://www.w3.org/2000/svg" height="18" width="24" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /><title>Delete Blog</title></svg></button>


                      </>
                    }





                  </div>
                </div>
              </div>


            </div>
          ))}
        </div>
        <div className={`${classes.sideDiv}`}>
          <div>
            <h1 className={`${classes.sideDivh1}`}>Catagories</h1>
            <div className={`${classes.cataDiv}`}>
              <div><span className={`${classes.cata}`}>Animals</span></div>
              <div><span className={`${classes.cata}`}>Games</span></div>
              <div><span className={`${classes.cata}`}>Nature</span></div>
              <div><span className={`${classes.cata}`}>Birds</span></div>
              <div><span className={`${classes.cata}`}>Politics</span></div>
              <div><span className={`${classes.cata}`}>Countries</span></div>
              <div><span className={`${classes.cata}`}>Movies</span></div>
              <div><span className={`${classes.cata}`}>Peoples</span></div>
              <div><span className={`${classes.cata}`}>Recipes</span></div>
              <div><span className={`${classes.cata}`}>Sports</span></div>
              <div><span className={`${classes.cata}`}>Education</span></div>
              <div><span className={`${classes.cata}`}>Fashion</span></div>
              <div><span className={`${classes.cata}`}>Products</span></div>
              <div><span className={`${classes.cata}`}>AI</span></div>
              <div><span className={`${classes.cata}`}>Travel</span></div>
              <div><span className={`${classes.cata}`}>Health</span></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default BlogList