import { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useContexts } from '../context/AppContext'
import { motion } from 'framer-motion'

const Post = () => {
  // Initialization
  const cookie = new Cookies()
  const navigate = useNavigate()
  const apiurl = import.meta.env.VITE_API_URL
  const { getData, user, posts, setUser, setPosts } = useContexts()

  // declaring state and ref
  const contentRef = useRef(null)

  useEffect(() => {
    const res = getData()
    if (!res.success) toast(res.message)
  }, [])

  // handling submit form
  const onSubmit = async () => {
    const content = contentRef.current.value;
    if (content.split(" ").length >= 15) {
      const response = await fetch(`${apiurl}/posts/create`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "Authorization": `Bearer ${cookie.get('token')}`
        },
        body: JSON.stringify({ content: contentRef.current.value })
      })
      const res = await response.json()
      if (res.success) {
        toast.success(res.message)
        getData()
      } else {
        toast.error(res.message)
      }
      contentRef.current.value = ""
    } else {
      toast.error("Post creation failed!")
      toast.error("Post should contain al least 15 words.")
    }
  }

  // functions
  const likePost = async (id) => {
    const response = await fetch(`${apiurl}/posts/like/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${cookie.get('token')}`
      }
    })
    const res = await response.json()
    getData()
  }

  const deletePost = async (postid) => {
    const response = await fetch(`${apiurl}/posts/delete/${postid}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${cookie.get('token')}`
      }
    })
    const res = await response.json()
    if (response.status === 200) {
      toast.success(res.message)
      getData()
    } else {
      toast.error(res.message)
    }
  }

  const calculateTime = (date) => {
    const year = 60 * 60 * 24 * 365
    const month = 60 * 60 * 24 * 30
    const week = 60 * 60 * 24 * 7
    const day = 60 * 60 * 24
    const hour = 60 * 60
    const min = 60

    let time = (Date.now() - Date.parse(date)) / 1000
    if (time >= year) {
      return `${(time / year).toFixed(0)} year ago`
    } else if (time >= month) {
      return `${(time / month).toFixed(0)} month ago`
    } else if (time >= week) {
      return `${(time / week).toFixed(0)} week ago`
    } else if (time >= day) {
      return `${(time / day).toFixed(0)} day ago`
    } else if (time >= hour) {
      return `${(time / hour).toFixed(0)} hour ago`
    } else if (time >= min) {
      return `${(time / min).toFixed(0)} min ago`
    } else {
      return 'now'
    }
  }

  const logOut = () => {
    cookie.remove('token')
    setUser(null)
    setPosts(null)
    navigate('/')
  }

  return (
    <main className='min-h-screen w-full bg-(--bg-main) vflexbox justify-start! p-4'>
      <ToastContainer />
      <section className='min-h-1/2 w-full flex flex-col items-start md:p-4'>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='w-18 md:w-32 h-8 md:h-12 flexbox text-[#F8FAFC] rounded-md bg-red-500 border border-(--border-color) cursor-pointer font-semibold self-end mb-2 text-sm md:text-lg' onClick={logOut}>Logout</motion.button>

        <div className='flexbox justify-start! gap-2 md:gap-4 w-full mb-4'>
          <div className='w-24 h-24 md:w-28 md:h-28 rounded-full border border-(--border-color) overflow-hidden shrink-0 object-center'>
            <img className='w-full h-full object-cover' src={user.profilepic?.secure_url} alt="" />
          </div>
          <div className='h-full w-fit md:w-4/5 vflexbox items-start! justify-evenly!'>
            <h2 className='text-4xl md:text-5xl font-bold text-(--text-primary) pl-2 mb-2'>{user.name && user.name.split(' ')[0]}</h2>
            <p className='flexbox justify-start! gap-12 text-(--text-secondary) text-xs pl-2 md:text-sm'>
              <span className='flex gap-2'>
                <span>Posts:</span>
                <span>{user.posts ? String(user.posts.length).padStart(3, '0') : '000'}</span>
              </span>
            </p>
            <Link to={`/${user.username}`} className='flexbox justify-start! text-blue-500 text-xs md:text-sm gap-2 px-2 py-1 rounded-full hover:bg-(--bg-hover)'> <span>View Profile</span> <span><i className="fa-solid fa-arrow-up-right-from-square"></i></span></Link>
          </div>
        </div>

        <p className='text-(--text-primary) pl-2'>Here you can create a new post here.</p>

        <div className='w-full'>
          <textarea ref={contentRef} className='w-full md:w-3/4 h-32 border border-(--border-color) rounded-md resize-none bg-(--input-bg) text-(--text-secondary) p-4 my-1 outline-transparent outline-0 focus:outline-2 focus:outline-(--btn-primary)' placeholder='What is in your mind?'></textarea>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onSubmit} className='btnClasses w-38!'>Create Post</motion.button>
        </div>
      </section>

      <div className='w-full h-0.5 bg-(--border-color) my-4 md:my-2'></div>

      <section className='w-full md:p-4'>

        <h3 className='text-md md:text-lg text-(--text-primary) font-semibold mb-2 md:mb-4'>All Posts</h3>

        <div
          className="posts min-h-1/2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 justify-center py-2"
        >
          {[...posts]?.reverse().map((p) => {
            return <div key={p._id} className="post p-4 md:p-6 rounded-md grid grid-rows-[auto,1fr,auto] gap-3 md:gap-5 border border-(--border-color) bg-(--card-bg)">
              <div className="info flex items-center gap-4">
                <div className="img w-14 h-14 rounded-full overflow-hidden border border-(--border-color) object-center">
                  <img
                    onClick={() => console.log(p.likes.length)}
                    className="object-cover w-full h-full"
                    src={p.user.profilepic?.secure_url}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h4 className="text-blue-500 text-lg font-medium">{p.user.username}</h4>
                  <p className="text-(--text-secondary) text-xs mt-1">
                    <span className='mr-1'>&#9679;</span>
                    {calculateTime(p.date)}
                  </p>
                </div>
              </div>

              <div className="content">
                <p className="text-sm md:text-md text-(--text-primary) leading-relaxed">
                  {p.content}
                </p>
              </div>

              <div className="btns flex gap-6 text-sm">
                <span className="flexbox gap-1">
                  <span className='text-(--text-secondary)'>{p.likes && p.likes.length}</span>
                  <span onClick={() => p.user._id != user._id && likePost(p._id)} className='text-blue-400 cursor-pointer'>
                    {p.likes.indexOf(user._id) == -1 ? <i className="fa-regular fa-thumbs-up"></i> : <i className="fa-solid fa-thumbs-up"></i>}
                  </span>
                </span>
                {p.user._id == user._id && <span onClick={() => deletePost(p._id)} className="flex gap-1 text-red-400 cursor-pointer">
                  <span className=''>Delete</span>
                  <span className=''>
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </span>}
              </div>
            </div>

          })}

        </div>

      </section>
    </main>
  )
}

export default Post
