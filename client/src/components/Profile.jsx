import { Link } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { useContexts } from "../context/AppContext"

const Profile = () => {
  // initialization
  const cookie = new Cookies()
  const navigate = useNavigate()
  const apiurl = import.meta.env.VITE_API_URL
  const location = useLocation()

  // declaring states 
  const { user, setUser, setPosts } = useContexts()

  const logOut = () => {
    cookie.remove('token')
    setUser(null)
    setPosts(null)
    navigate('/')
  }

  return (
    <div className='min-h-screen w-full bg-(--bg-main) vflexbox justify-start!'>
      <nav className='h-[10vh] w-full flexbox justify-between! px-4'>
        <button onClick={() => navigate(-1)} className="flex gap-2 text-blue-500 cursor-pointer">
          <span><i className="fa-solid fa-arrow-left"></i></span>
          <span className="md:inline-block hidden">Go Back</span>
        </button>
        <div className="btns flexbox gap-4">
          <Link to={`/${user?.username}/edit`} className="w-18 md:w-32 h-8 md:h-12 flexbox text-[#F8FAFC] rounded-md bg-(--btn-primary) hover:bg-(--btn-hover) border border-(--border-color) cursor-pointer font-semibold self-end text-sm md:text-lg">
            Edit
          </Link>
          <button className='w-18 md:w-32 h-8 md:h-12 flexbox text-[#F8FAFC] rounded-md bg-red-500 hover:bg-red-600 border border-(--border-color) cursor-pointer font-semibold self-end text-sm md:text-lg' onClick={logOut}>Logout</button>
        </div>
      </nav>
      {user && <main className="w-full md:w-4/5 p-8 md:p-12 vflexbox gap-8">
        <section className="vflexbox">
          <div className="md:w-42 w-36 md:h-42 h-36 rounded-full overflow-hidden border border-(--border-color) mb-2 object-center">
            <img className="w-full h-full object-cover" src={user?.profilepic?.secure_url} alt="" />
          </div>
          <h1 className="text-(--text-primary) text-3xl md:text-4xl font-bold text-center">
            {user?.name}
          </h1>
          <div className="flexbox gap-15 text-gray-400 text-sm">
            {/* <span>Likes</span> */}
            <span className='flex gap-2'>
              <span>Posts:</span>
              <span>{user.posts ? String(user.posts.length).padStart(3, '0') : '000'}</span>
            </span>
          </div>
        </section>
        <section className="w-full flexbox">
          <div className="w-full md:w-3/5 rounded-md p-6 md:p-8 flex flex-col gap-3 bg-(--card-bg) border border-(--border-color) text-(--text-primary)">
            {[
              { label: "Name", value: user.name },
              { label: "Username", value: user.username },
              { label: "Email", value: user.email },
              { label: "Phone No.", value: user.phone || 'x'.padStart(10, 'x') },
              { label: "Date of Birth", value: user.DOB || 'dd-mm-yyyy' },
              { label: "Address", value: user.add || 'NA' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <div className="font-medium text-sm md:text-base">{item.label}:</div>
                <div className="text-sm md:text-base break-all text-(--text-primary) bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-md">{item.value}</div>
              </div>
            ))}
          </div>

        </section>
      </main>}
    </div>
  )
}

export default Profile
