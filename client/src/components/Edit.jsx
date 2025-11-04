import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditProfile = () => {
  //initialization
  const apiurl = import.meta.env.VITE_API_URL
  const location = useLocation()
  const cookie = new Cookies()
  const nevigate = useNavigate()
  const [user, setUser] = useState({})

  // fetching data
  const getData = async () => {
    const response = await fetch(apiurl + location.pathname, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${cookie.get('token')}`
      }
    })
    const res = await response.json()
    setUser(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  // form object destructuring and setting default value
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: user || {}
  });

  useEffect(() => {
    if (user) reset(user)
  }, [user, reset])

  // submitting form
  const onSubmit = async (data) => {
    const formData = new FormData() // to submit a file with string fields

    Object.keys(data).forEach((key) => {
      if (key === "profilepic") {
        formData.append("profilepic", data.profilepic[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await fetch(`${apiurl}/${user.username}/edit`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${cookie.get('token')}` },
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        getData()
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  // functions
  const handleRemove = async () => {
    const response = await fetch(`${apiurl}/${user.username}/profilepic/delete/${user.profilepic}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${cookie.get('token')}` },
    })
    const res = await response.json()
    if (res.success) {
      getData()
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  const logOut = () => {
    cookie.remove('token')
    nevigate('/')
  }

  return (
    <div className="min-h-screen w-full bg-(--bg-main) vflexbox justify-start!">
      <ToastContainer />
      <nav className='h-[10vh] w-full flexbox justify-between! px-4'>
        <button onClick={() => nevigate(-1)} className="flex gap-2 text-blue-500 cursor-pointer">
          <span><i className="fa-solid fa-arrow-left"></i></span>
          <span className="hidden md:inline">Go Back</span>
        </button>
        <div className="btns flexbox gap-4">
          <button className='w-18 md:w-32 h-8 md:h-12 flexbox text-[#F8FAFC] rounded-md bg-red-500 border border-(--border-color) cursor-pointer font-semibold self-end mb-2 text-sm md:text-md' onClick={logOut}>Logout</button>
        </div>
      </nav>
      <section className="flexbox w-full px-8 py-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="w-full max-w-xl bg-(--card-bg) text-(--text-primary) rounded-md border border-(--border-color) p-8 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-semibold text-center mb-2">Edit Profile</h2>
          <div className="w-36 h-36 rounded-full overflow-hidden border border-(--border-color) mb-2 object-center self-center">
            <img
              className="w-full h-full object-cover"
              src={`${apiurl}/images/profilepic/${user.profilepic}`}
              alt="Profile"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-red-500 underline cursor-pointer"
          >
            Remove Picture
          </button>

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-2">
            <input
              type="file"
              placeholder="Profile picture URL"
              {...register("profilepic")}
              className="w-full bg-(--input-bg) text-(--text-secondary) rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--btn-primary) file:bg-(--card-bg) file:border-2 file:border-(--border-color) file:px-4 file:py-1 file:rounded-md"
            />
          </div>

          {/* Input fields */}
          <input
            type="text"
            placeholder="Name"
            {...register('name', { required: { value: true, message: "Enter your name first" }, minLength: { value: 3, message: "Name should contain at least 3 Charactor" } })}
            className="bg-(--input-bg) text-(--text-secondary) rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--btn-primary)"
          />
          {errors.name && (
            <p className="text-(--accent-like) text-sm">{errors.name.message}</p>
          )}

          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="bg-(--input-bg) text-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--btn-primary)"
            disabled
          />
          {errors.username && (
            <p className="text-(--accent-like) text-sm">{errors.username.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="bg-(--input-bg) text-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--btn-primary)"
            disabled
          />
          {errors.email && (
            <p className="text-(--accent-like) text-sm">{errors.email.message}</p>
          )}

          <input
            type="number"
            placeholder="Phone"
            {...register("phone")}
            className="bg-(--input-bg) text-(--text-secondary) rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--btn-primary)"
          />

          <input
            type="date"
            placeholder="Date of Birth"
            {...register("DOB")}
            className="bg-(--input-bg) text-(--text-secondary) rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--btn-primary)"
          />

          <input
            type="text"
            placeholder="Address"
            {...register("add")}
            className="bg-(--input-bg) text-(--text-secondary) rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-(--btn-primary)"
          />

          <button
            type="submit"
            className="w-full mt-2 py-2 bg-(--btn-primary) hover:bg-(--btn-hover) rounded-md text-white font-medium transition-all"
          >
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
