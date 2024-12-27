import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

export const uploadMiddeware = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})
    .single('file');