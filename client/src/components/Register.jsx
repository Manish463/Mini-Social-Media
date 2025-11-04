import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ThreeDot } from 'react-loading-indicators'
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'universal-cookie'

const Register = () => {
  // initialization
  const cookie = new Cookies()
  const naviagte = useNavigate()
  const apiurl = import.meta.env.VITE_API_URL

  // declearing states
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [show, setShow] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

    // fuction to submit the form
  const onSubmit = async (data) => {
    setIsSubmiting(true)

    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data),
      })

      const res = await response.json()

      if (response.status === 200) {
        cookie.set('token', res.token)
        naviagte('/posts')
      } else {
        toast.error(res.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setIsSubmiting(false)
  }

  return (
    <div className='h-screen w-full bg-(--bg-main) grid grid-cols-1 md:grid-cols-2'>

      <section className='w-full h-screen flexbox text-(--text-primary) p-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-98 vflexbox bg-(--card-bg) rounded-lg border-2 border-(--border-color) px-6 md:px-8 py-14'>
          <h3 className='text-3xl md:text-4xl font-bold mb-1'>Register</h3>
          <p className='text-xs md:text-sm'>Already have a Account? <Link to='/login' className='text-blue-500 font-semibold'>Login</Link> </p>
          <div className='w-full mt-8 relative  text-sm md:text-md'>
            <input type="text" {...register('name', { required: { value: true, message: "Enter your name first" }, minLength: { value: 3, message: "Name should contain at least 3 Charactor" } })} className='w-full rounded-md bg-(--input-bg) text-(--text-secondary) px-4 py-2 h-10 md:h-12 focus:outline-2 focus:outline-(--btn-primary)' placeholder='Name' />
            <span className='absolute right-3 top-3'><i className="fa-solid fa-signature"></i></span>
            {errors.name && <span className='text-xs text-red-500'>{errors.name.message}</span>}
          </div>
          <div className='w-full mt-4 relative  text-sm md:text-md'>
            <input type="text" {...register('username', { required: { value: true, message: "Enter username first" } })} className='w-full rounded-md bg-(--input-bg) text-(--text-secondary) px-4 py-2 h-10 md:h-12 focus:outline-2 focus:outline-(--btn-primary)' placeholder='Username' />
            <span className='absolute right-3 top-3'><i className="fa-solid fa-user"></i></span>
            {errors.username && <span className='text-xs text-red-500'>{errors.username.message}</span>}
          </div>
          <div className='w-full mt-4 relative  text-sm md:text-md'>
            <input type="email" {...register('email', { required: { value: true, message: "Enter an email" } })} className='w-full rounded-md bg-(--input-bg) text-(--text-secondary) px-4 py-2 h-10 md:h-12 focus:outline-2 focus:outline-(--btn-primary)' placeholder='Email' />
            <span className='absolute right-3 top-3'><i className="fa-solid fa-envelope"></i></span>
            {errors.email && <span className='text-xs text-red-500'>{errors.email.message}</span>}
          </div>
          <div className='w-full mt-4 relative  text-sm md:text-md'>
            <input type={`${show ? "text" : "password"}`} {...register('password', { required: { value: true, message: "Enter a strong password", minLength: { value: 8, message: "Enter your password" } } })} className='w-full rounded-md bg-(--input-bg) text-(--text-secondary) px-4 py-2 h-10 md:h-12 focus:outline-2 focus:outline-(--btn-primary)' placeholder='Password' />
            <span className='absolute right-3 top-3 cursor-pointer' onClick={()=>setShow(!show)}>
              { show ? <i className="fa-solid fa-lock-open"></i> : <i className="fa-solid fa-lock"></i>}
            </span>
          </div>
          <button className='btnClasses w-full! mt-8!'>
            {isSubmiting ? <ThreeDot color="#F8FAFC" size="small" /> : "Submit"}
          </button>
        </form>
      </section>

      <section className='flexbox'>
        <img className='h-full object-cover object-right hidden md:block' src="/images/register.jpg" alt="Register image" />
        <ToastContainer />
      </section>

    </div>
  )
}

export default Register
