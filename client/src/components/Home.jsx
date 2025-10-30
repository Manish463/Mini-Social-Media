import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const naviage = useNavigate()

    return (
        <div className='w-full h-full vflexbox gap-6 md:gap-8 text-(--text-primary) bg-linear-135 from-[#FFF1EB] to-[#ACE0F9] dark:from-[#18181B] dark:via-[#1F2937] dark:to-[#18181B] p-8'>
            <h2 className="text-3xl md:text-5xl font-black text-center text-nowrap">🚀 Mini Social-Media</h2>
            <div className='vflexbox gap-4 md:gap-6 text-(--text-secondary) text-sm'>
                <p className="text-center max-w-xl">
                    Create your account, post updates, and like posts — all stored safely in the database.
                </p>
                <p className="text-center">
                    Full authentication and data association included to keep your content secure.
                </p>
            </div>
            <div className="btns flexbox gap-8 md:gap-32 text-[#F8FAFC]">
                <button onClick={()=>naviage('/register')} className="btnClasses">
                    Register
                </button>
                <button onClick={()=>naviage('/login')} className="btnClasses">
                    Login
                </button>
            </div>
        </div>
    )
}

export default Home
