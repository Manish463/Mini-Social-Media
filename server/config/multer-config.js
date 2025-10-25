import multer from "multer"; // package
import crypto from 'crypto' // module
import path from 'path' // module
import { fileURLToPath } from "url";
import { dirname } from "path";

// Initializing importent variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// DiskStroage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/profilepic'))
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(12, (err, bytes) => {
        const fn = bytes.toString('hex') + path.extname(file.originalname)
        cb(null, fn)
    })
  }
})

// export upload floder
export default multer({ storage: storage })