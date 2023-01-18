const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Team = require('../models/team');
const Student = require('../models/student');

const controller = {
    addProject: async (req, res) => {
        console.log(req.body)
        const { projectName, repository } = req.body;
        let errors = [];

        if (projectName.length < 4) {
            errors.push({ msg: 'Name must be at least 4 characters long' });
        }

        if (!repository) {
            errors.push({ msg: 'Repository must be specified' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            Project.findOne({ projectName: projectName }).then(async project => {
                if (project) {
                    errors.push({ msg: 'Name already used' });
                    return res.status(500).send({ msg: 'Project already exists' });
                } else {

                    const team = await Team.findOne({ teamName: req.body.team })

                    if(!team?.teamMembers.includes(req.student._id)) return res.status(500).send({ msg: "Student is not part of the team" })  
                    if(!team){ return res.status(500).send({ msg: "Team doesn't exist" }) }

                    const project = await Project.create({ projectName: projectName, repository: repository, team: req.body.team, projectMembers:[req.student._id]})
                    if(!project) return res.status(500).send({ msg: "It didn't work" });

                    team.projects.push(project._id);
                    project.team = team._id;
                    await team.save()
                    await project.save()
                    return res.status(200).send(project);
                }
            })
        }

    },

    joinAsTester: async(req, res) => {

        console.log(req.body)

        if(!req.body.id) return res.status(500).send('No project ID')
        const project = await Project.findOne({ _id: req.body.id })
        if(!project) return res.status(500).send('Cannot find project')

        if(project.projectMembers.includes(req.student._id)) return res.status(500).send('You are a member of the project and cannot register as a tester')
        if(project.testers.includes(req.student._id)) return res.status(500).send('You are already a tester')

        project.testers.push(req.student._id)
        await project.save()
        return res.status(200).send('Added as tester')
    },


    getProject: async (req, res) => {
        Project.findOne(
            { projectName: req.params.projectName }
        ).then((project) => {
            res.status(200).send(project);
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    getProjects: async (req, res) => {
        Project.findAll({

        }).then((projects) => {
            res.status(200).send(projects);
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    getProjectByIdStudent: async (req, res) => {
        try {
            let student = await Student.findOne({
                where: { id: req.params.id },
                include: [{
                    model: Team,
                    attributes: ['id'],
                }]
            })
            let teams = [];
            student.teams.forEach(team => {
                teams.push(team._id)
            });

            let projects = await Project.findAll({
                where: {
                    teamID: teams
                }
            })
            res.send(projects)
        }
        catch (err) {
            res.status(500).send(err);
        }
    },


    updateProject: async (req, res) => {
        const projectToBeSent = {
            projectName: req.body.projectName,
            repository: req.body.repository
        }

        let errors = [];

        const project = await Project.findOne({ projectName: req.body.projectName });

        if (projectToBeSent.projectName.length < 4) {
            errors.push({ msg: 'Name must be at least 4 characters long' });
        }

        if (!projectToBeSent.repository) {
            errors.push({ msg: 'Repository must me specified' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            if (project != null) {
                res.send({ msg: 'Name already exists' });
            } else {
                try {
                    projectDB = await Project.updateOne(projectToBeSent,
                        { projectName: req.params.projectName }
                );
                    res.status(200).send({ msg: 'Project name has been changed' });
                }

                catch (err) {
                    res.status(500).send({ msg: "Project doesn't exist" });
                }
            }
        }
    },


    deleteTeam: async (req, res) => {
        try {
            const project = await Project.findOne({ projectName: req.params.projectName });
            if (project) {
                await project.destroy();
                res.status(200).send({ msg: "Project has been deleted" });
            }
            else {
                res.status(404).send({ msg: "Project wasn't found" });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = controller;