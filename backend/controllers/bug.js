const express = require('express');
const router = express.Router();
const Bug = require('../models/bug');
const Student = require('../models/student');
const Project = require('../models/project');

const controller = {
    addBug: async (req, res) => {
        const { project_id, repository, severity, priority, description } = req.body;
        const project = await Project.findOne({ _id: project_id })
        if(!project) return res.status(500).send({ msg: 'Project does not exist' });

        //if an already registered tester is later on down the line added as a team member it will show this message, which might be a bug
        if(project.projectMembers.includes(req.student._id)) return res.status(500).send({ msg: 'You are a project member and not a tester' });

        if(!project.testers.includes(req.student._id)) return res.status(500).send({ msg: 'You are not registered as a tester for this project' });

        const newBug = await Bug.create({ severity: severity, repository: repository, priority: priority, description: description, projectID: project._id, reporter: req.student._id, status: 'Open' });

        project.bugs.push(newBug._id)
        await project.save()
        return res.send({ msg: 'Bug has been added' });
    },

    addCommit: async (req, res) => {

        if(!['Open', 'Closed'].includes(req.body.status)) return res.status(500).send('Status is not recognised')

        if(!req.body.commit) return res.status(500).send('No commit link provided')

        const project = await Project.findOne({ _id: req.body.project_id })
        if(!project) return res.status(500).send('Cannot find project')
        if(!project.projectMembers.includes(req.student._id)) return res.status(500).send('You are not a member of the project')
        if(!project.bugs.includes(req.body.bug_id)) return res.status(500).send('Bug ID does not belong to this project')

        const bug = await Bug.findOne({ _id: req.body.bug_id})
        if(!bug) return res.status(500).send('Could not find bug') 

        bug.commits.push({
            status: req?.body?.status,
            commit: req?.body?.commit
        })

        await bug.save()
        return res.status(200).send('Status has been modified') 
    },

    getBug: async (req, res) => {
        Project.findOne({
            where: { projectName: req.body.projectName }
        }).then((project) => {
            User.findOne({
                where: { name: req.body.name }
            }).then(user => {
                Bug.findAll({
                    where: { projectID: project.id, userID: user.id }
                }).then(bug => {
                    res.status(500).send(bug);
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista bug-ul' });
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista user-ul' })
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista proiectul' })
        })
    },

    getBugUser: async (req, res) => {
        User.findOne({
            where: { name: req.params.name }
        }).then(user => {
            Bug.findAll({
                where: { userID: user.id }
            }).then(bug => {
                res.status(500).send(bug);
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista bug-ul' });
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista user-ul' })
        })
    },

    getBugProject: async (req, res) => {
        await Project.findOne({
            where: { projectName: req.params.projectName }
        }).then(async project => {
            await Bug.findAll({
                where: { projectID: project.id }
            }).then(bug => {
                res.status(200).send(bug);
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista bug-ul' });
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista proiectul' })
        })
    },

    getBugsProject: async (req, res) => {
        await Bug.findAll({

        }).then(bug=>{
            res.status(200).send(bug);
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista bug-uri' })
        })
    },

    updateBug: async (req, res) => {
        const bugToBeSent = {
            severity: req.body.severity,
            priority: req.body.priority,
            description: req.body.description
        }

        let errors = [];
        let bug = [];
        Project.findOne({
            where: { projectName: req.body.projectName }
        }).then((project) => {
            User.findOne({
                where: { name: req.body.name }
            }).then(user => {
                bug = Bug.findOne({
                    where: { projectID: project.id, userID: user.id }
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista user-ul' })
            })
        }).catch(err => {
            res.status(500).send({ msg: 'Nu exista proiectul' })
        })

        if (bugToBeSent.severity < 1 && bugToBeSent.severity > 5) {
            errors.push({ msg: 'Necesita o valoare intre 1 si 5 a severitatii' });
        }

        if (bugToBeSent.priority < 1 && bugToBeSent.priority > 5) {
            errors.push({ msg: 'Necesita o valoare intre 1 si 5 a prioritatii' });
        }

        if (bugToBeSent.description.length < 6) {
            errors.push({ msg: 'Lasati o descriere a problemei' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            if (!bug) {
                res.send({ msg: 'Bug-ul nu exista' });
            } else {
                Project.findOne({
                    where: { projectName: req.body.projectName }
                }).then((project) => {
                    User.findOne({
                        where: { name: req.body.name }
                    }).then(user => {
                        try {
                            bugDB = Bug.updateOne(bugToBeSent, {
                                where: { projectID: project.id, userID: user.id },
                            });
                            res.status(200).send({ msg: 'Bug schimbat' });
                        }

                        catch (err) {
                            res.status(200).send(err);
                        }
                    }).catch(err => {
                        res.status(500).send({ msg: 'Nu exista user-ul' })
                    })
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista proiectul' })
                })

            }
        }
    },

    deleteBug: async (req, res) => {
        try {
            Project.findOne({
                where: { projectName: req.body.projectName }
            }).then((project) => {
                User.findOne({
                    where: { name: req.body.name }
                }).then(user => {
                    Bug.findOne({
                        where: { projectID: project.id, userID: user.id }
                    }).then(bug => {
                        if (bug) {
                            bug.destroy();
                            res.status(200).send({ msg: "Bug-ul a fost sters" });
                        }
                        else {
                            res.status(404).send({ msg: "Bug-ul nu a fost gasit" });
                        }
                    })
                }).catch(err => {
                    res.status(500).send({ msg: 'Nu exista user-ul' })
                })
            }).catch(err => {
                res.status(500).send({ msg: 'Nu exista proiectul' })
            })

        }
        catch (err) {
            console.log(err);
        }
    }
}
module.exports = controller;