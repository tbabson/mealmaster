import multer from "multer"; // Middleware to handle file uploads


// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });


// const upload = multer({ storage });


//Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Define upload directory
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`
        // Define unique filename using timestamp and original name
        cb(null, fileName);
    },

});



// Initialize Multer with the storage configuration
const upload = multer({ storage });


export default upload;