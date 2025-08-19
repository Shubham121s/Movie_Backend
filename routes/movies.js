const express = require('express');
const multer = require('multer');
const { createMovie, bulkUpload, listMovies } = require('../controllers/movieController');
const protect = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(protect, authorize('admin'));

router.post('/', createMovie);
router.post('/bulk-upload', upload.single('file'), bulkUpload);
router.get('/', listMovies);

module.exports = router;
