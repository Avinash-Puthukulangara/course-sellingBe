const express = require('express');
const { getCourses, createCourse, updateCourse, deleteCourse } = require('../controllers/courseControllers.js');
const { signup, signin, getAllInstructors, removeInstructor } = require('../controllers/instructorControllers.js')
const upload = require('../middlewares/upload-mw.js')
const authenticateInstructor = require('../middlewares/instructor-mw.js')
const authenticateAdmin = require('../middlewares/admin-mw.js');



const instructorRouter = express.Router();

instructorRouter.post('/signup', authenticateInstructor, signup);
instructorRouter.post('/signin', signin);


instructorRouter.post("/add-courses", authenticateAdmin, upload.single("file"), createCourse);
instructorRouter.get('/get-courses', getCourses);
instructorRouter.put('/update/:id', updateCourse);
instructorRouter.delete('/delete/:id', deleteCourse);


instructorRouter.get("/get-instructors", authenticateInstructor, getAllInstructors);
instructorRouter.delete("/delete-instructors/:id", removeInstructor);

module.exports = instructorRouter;