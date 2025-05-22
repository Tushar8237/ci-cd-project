import multer from 'multer'
import path from 'path'

// storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Folder
    },

    filename : function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits : { fileSize : 5 * 1024 * 1024 }, // 5 mb limit
    fileFilter : function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png|dpf/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Only image and PDFs are allowed'));
    } 
})

export default upload