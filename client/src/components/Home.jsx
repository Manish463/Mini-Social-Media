import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
    const naviage = useNavigate()

    return (
        <motion.div variants={container} initial='hidden' animate='visible' className='w-full h-full text-(--text-primary) bg-linear-135 from-[#FFF1EB] to-[#ACE0F9] dark:from-[#18181B] dark:via-[#1F2937] dark:to-[#18181B] p-8 vflexbox gap-6 md:gap-8'>
            <motion.h2 variants={item} className="text-3xl md:text-5xl font-black text-center text-nowrap">🚀 Mini Social-Media</motion.h2>
            <div className='vflexbox gap-4 md:gap-6 text-(--text-secondary) text-sm'>
                <motion.p variants={item} className="text-center max-w-xl">
                    Create your account, post updates, and like posts — all stored safely in the database.
                </motion.p>
                <motion.p variants={item} className="text-center">
                    Full authentication and data association included to keep your content secure.
                </motion.p>
            </div>
            <motion.div variants={item} className="btns flexbox gap-8 md:gap-32 text-[#F8FAFC]">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => naviage('/register')} className="btnClasses">
                    Register
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => naviage('/login')} className="btnClasses">
                    Login
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default Home
