import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const createDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadDir;

        // Determine directory based on route
        if (req.originalUrl.includes('/api/dress')) {
            uploadDir = 'uploads/dress-img/';
        } else if (req.originalUrl.includes('/api/interior')) {
            uploadDir = 'uploads/interior-img/';
        } else {
            uploadDir = 'uploads/user-img/';
        }

        // Create directory if it doesn't exist
        createDirectory(uploadDir);
        
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const randomName = crypto.randomBytes(5).toString('hex');
        cb(null, `${randomName}${ext}`);
    }
});

const upload = multer({ storage: storage });

export default upload;
