import express from 'express';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseControllers.js';
import { signup, signin, getAllInstructors, removeInstructor } from '../controllers/instructorControllers.js';
import upload from '../middlewares/upload-mw.js';
import authenticateInstructor from '../middlewares/instructor-mw.js';
import authenticateAdmin from '../middlewares/admin-mw.js';



const instructorRouter = express.Router();

instructorRouter.post('/signup', authenticateInstructor, signup);
instructorRouter.post('/signin', signin);


instructorRouter.post("/add-courses", authenticateAdmin, upload.single("file"), createCourse);
instructorRouter.get('/get-courses', getCourses);
instructorRouter.put('/update/:id', updateCourse);
instructorRouter.delete('/delete/:id', deleteCourse);


instructorRouter.get("/get-instructors", authenticateInstructor, getAllInstructors);
instructorRouter.delete("/delete-instructors/:id", removeInstructor);

export default instructorRouter;