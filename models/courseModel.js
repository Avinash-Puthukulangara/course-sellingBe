import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
            unique: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        instructor: [{ type: mongoose.Types.ObjectId, ref:'Instructor'}],
    },
    { timestamps: true}
);

const Course = mongoose.model('Course', userSchema);

export default Course;