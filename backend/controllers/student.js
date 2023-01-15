
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require("jsonwebtoken")
const Student = require('../models/student');
const Team = require('../models/team');
const moment = require('moment');

const generateToken = (studentId, expires, secret = "secret") => {
    const payload = {
      sub: studentId,
      iat: moment().unix(),
      exp: expires.unix(),
    };
    return jwt.sign(payload, secret);
  };


const controller = {
    register: async (req, res) => {
        console.log(req.body)
        const { name, email, password, password2} = req.body;
        let errors = [];

        if (!name || !email || !password || !password2 ) {
            errors.push({ msg: 'Please fill all the fields' });
        }

        if (name.length < 4) {
            errors.push({ msg: 'Name must be at least 4 characters long' });
        }

        if (!email.includes("@") || !email.includes(".")) {
            errors.push({ msg: 'Invalid email format' });
        }

        if (password != password2) {
            errors.push({ msg: 'Passwords not matching' });
        }

        if (password.length < 4) {
            errors.push({ msg: 'Passwod must be at least 4 characters long' });
        }

    
        if (errors.length > 0) {

            res.send(errors);
        } else {

             Student.findOne({ email: email }).then(student => {
                if (student) {
                    errors.push({ msg: 'Email already used' });

                    res.send({ msg: 'Student already exists' });
                } else {
                    Student.findOne({ name: name }).then(async (student) => {
                        if (student) {
                            errors.push({ msg: 'Name already used' });

                            res.send({ msg: 'Student already exists' });
                        } else {
                            const newStudent = new Student({
                                name,
                                email,
                                password
                                
                            });

                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newStudent.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    newStudent.password = hash;
                                    newStudent
                                        .save()
                                        .then(student => {
                                            res.send({ msg: 'Student was created' });
                                        })
                                        .catch(err => console.log(err));
                                });
                            });
                        }
                    })

                }
            });
        }
    },


    login: async (req, res) => {
        console.log(req.body)
        try {
            let student = await Student.findOne({email: req.body.email } )
            let valid = await bcrypt.compare(req.body.password, student.password);
            console.log(student._id)

            if (valid) {
                const expires = moment().add(10, 'days');
                const token = generateToken(student._id, expires);
                res.send({ ok: true, id: student._id, token:token });

                
            } else {
                res.send({ ok: false, msg: 'Password/email doesnt match' });
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    getMyTeams: async (req, res) => {
        const teams = await Team.find({"team.teamMembers": req.student._id})
        if(!teams) return res.status(200).send({msg : 'You are not a member of any teams'})
        return res.status(200).send(teams)
    },

    getMyProjects: async (req, res) => {
        const teams = await Team.find({"team.teamMembers": req.student._id})
        if(!teams) return res.status(200).send({msg : 'You are not a member of any teams'})
        if(teams.length > 1) return

        const projects = await Project.find({"project.team": teams._id, "project.projectMembers": req.student._id})
        if(!projects) return res.status(200).send('You are not a member of any projects on your team')
        return res.status(200).send(projects)
    },

    getOpenProjects: async (req, res) => {
        const projects = await Project.find({"project.projectMembers" : { $nin : [req.student._id]}})
        if(projects) return res.status(200).send('No projects could be found')
        return res.status(200).send(projects)
    },

    getStudent: async (req, res) => {
        Student.findOne(
            { _id: req.student._id }
        ).then(student =>{
            res.status(200).send(student);
        }).catch(err => {
            res.status(500).send(err);
            res.send({ msg: "Student doesn't exist" });
        })
    },

    updateStudent: async (req, res) => {
        const studentToBeSent = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        const student = await Student.findOne({ name: req.params.name });
        let errors = [];

        const studentNameEmail = await Student.findOne({ name: req.body.name, email: req.body.email });

        if (studentNameEmail) {
            errors.push({ msg: 'Name or email already used' });
        }

        if (studentToBeSent.name.length < 4) {
            errors.push({ msg: 'Name must be at least 4 characters long' });
        }

        if (!studentToBeSent.email.includes("@") || !userToBeSent.email.includes(".")) {
            errors.push({ msg: 'Invalid email format' });
        }

        if (studentToBeSent.password.length < 4) {
            errors.push({ msg: 'Password must be at least 4 characters long' });
        }

        if (studentToBeSent.role != 'default' || studentToBeSent.role != 'PM' ||studentToBeSent.role != 'TST' ) {
            errors.push({ msg: 'Invalid format' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            if (!student) {
                res.send({ msg: "Student doesn't exist" });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(studentToBeSent.password, salt, (err, hash) => {
                        if (err) throw err;
                        student.password = hash;
                        student
                            .save()
                            .then(student => {
                                console.log('Student already saved');
                            })
                            .catch(err => console.log(err));
                    });
                });

                try {
                    studentDB = await Student.updateOne(studentToBeSent, 
                         { name: req.params.name },);
                    res.status(200).send({ msg: 'Student changed' });
                }

                catch (err) {
                    res.status(200).send(err);
                }
            }

        }
    },

    deleteStudent: async (req, res) => {
        try {
            const student = await Student.findOne({ name: req.params.name } );
            if (student) {
                await student.deleteOne({ name: req.params.name });
                res.status(200).send({ msg: "Student already deleted" });
            }
            else {
                res.status(404).send({ msg: "Student wasn't found" });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = controller;


