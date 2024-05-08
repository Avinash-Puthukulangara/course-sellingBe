const bcrypt = require('bcrypt');
const Instructor =require('../models/instructorModel')
const adminToken = require('../utils/generateToken')

const signup = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password, name } = req.body;
    const instructorrExist = await Instructor.findOne({ email });
    if (instructorrExist) {
      return res.send("Instructor is already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newInstructor = new Instructor({
      name,
      email,
      hashPassword,
      role: "instructor",
    });
    const newInstructorCreated = await newInstructor.save();

    if (!newInstructorCreated) {
      return res.send("instructor is not created");
    }

    const token = adminToken(newInstructorCreated);
    res.cookie("token", token);
    res.json({ message: "signned in!", token });
  } catch (error) {
    console.log(error, "Something wrong");
  }
};

const signin = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;
    console.log(body);

    const instructor = await Instructor.findOne({ email });

    if (!instructor) {
      return res.send("instructor is not found");
    }

    const matchPassword = await bcrypt.compare(
      password,
      instructor.hashPassword
    );

    console.log(matchPassword, "matchpassword");
    if (!matchPassword) {
      return res.send("password is not match");
    }

    const token = adminToken(instructor);

    res.cookie("token", token);
    res.json({ message: "Logged in!", token });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllInstructors = async (req, res) => {
  console.log("hitted intstrt get request")
  const instructors = await Instructor.find();
  return res.send(instructors);
};

const removeInstructor = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const instructor = await Instructor.find({ _id: id });
  if (!instructor) {
    return res.send("Instructor is not exist");
  }
  const remove = await Instructor.deleteOne({ _id: id });

  if (!remove) {
    return res.send("failed to remove");
  }

  return res.send("removed sucessfully");
};

module.exports = { signup, signin, getAllInstructors, removeInstructor }