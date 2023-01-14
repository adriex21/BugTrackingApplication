
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Student = require('../models/student');


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

    getStudent: async (req, res) => {
        Student.findOne(
            { name: req.params.name }
        ).then((student) => {
            res.status(200).send(student);
        }).catch(err => {
            res.status(500).send(err);
        })
    },

    login: async (req, res) => {
        try {
            let student = await Student.findOne({email: req.body.email } )
            let valid = await bcrypt.compare(req.body.password, student.password);

            if (valid) {
                res.send({ ok: true, id: student.id });
            } else {
                res.send({ ok: false, msg: 'Password/email doesnt match' });
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    getUser: async (req, res) => {
        Student.findOne(
            { _id: req.params.id }
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
                    res.status(200).send({ msg: 'User schimbat' });
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


