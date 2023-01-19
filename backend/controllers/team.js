const express = require('express');
const router = express.Router();

const Team = require('../models/team');
const Student = require('../models/student');
const Project = require('../models/project');
// const student = require('../models/student');

const controller = {
    addTeam: async (req, res) => {
        console.log(req.body)
        const { teamName } = req.body;
        let errors = [];

        if (teamName.length < 4) {
            errors.push({ msg: 'Name must be at least 4 characters long' });
        }

        if (errors.length > 0) {
            return res.status(500).send(errors);
        } else {
            await Team.findOne({ teamName: teamName }).then(async team => {
                if (team) {   
                    errors.push({ msg: 'Name already used' });
                    return res.status(500).send({ msg: 'Team already exists' });
                } else {
                    const student = await Student.findOne({_id: req.student._id})
                    if(!student) return res.status(500).send({ msg: 'Student does not exist' });
                    if(student.team !== 'none') return res.status(500).send({ msg: 'You are already part of a team' });

                    const newTeam = await Team.create({ teamName: teamName, createdBy:req.student._id, teamMembers: [req.student._id] });

                    student.team = newTeam._id
                    await student.save()

                    return res.send({ msg: 'Team has been created' });
                }
            })
        }
    },

    // addMember: async(req,res) => {
    //     console.log(req.body)

    //     try {
    //         const { email, teamName } = req.body;
    //         const student = await Student.findOne({ email });
    //         if (!student) return res.status(404).json({ message: 'Student not found' });
    //         if (student.team !== 'none') return res.status(400).json({ message: 'Student already belongs to a team' });
    //         if(!team?.createdBy===(req.student._id)) return res.status(500).send({ msg: "Student is not the leader of the team" })  
    //         const team = await Team.findOne({ teamName });
    //         if (!team) return res.status(404).json({ message: 'Team not found' });
    //         team.teamMembers.push(student._id);
    //         student.team = team._id;
    //         await student.save();
    //         await team.save();
    //         return res.status(200).json({ message: 'Member added successfully' });
    //     } catch (err) {
    //         return res.status(500).json({ message: 'Error adding member', error: err });
    //     }
    // },

    getProjects: async (req, res) => {
        
        if(!req.body.teamName) return res.status(500).send({msg: 'Team id is missing'})

        try{
            const team = await Team.findOne({teamName: req?.body?.teamName})
            if(!team) return res.status(500).send({msg: 'Team could not be found'})
            if(!team.teamMembers.includes(req.student._id)) return res.status(500).send({msg: 'You are not part of this team'})

            const projects = await Project.find({ team: team._id })
            if(!projects) return res.status(500).send({msg: 'Could not query projects'})
            return res.status(200).send(projects)

        }catch(err){
            console.log(err)
        }
    },




    getTeam: async (req, res) => {
        Team.findOne(
            { _id: req.body.team }
         ).then((team) => {
             console.log(team)
             res.status(200).send(team);
         }).catch(err => {
             res.status(500).send(err)
         })
    },

    

    updateTeam: async (req, res) => {
        const teamToBeSent = {
            teamName: req.body.teamName
        }

        let errors = [];

        const team = await Team.findOne({ teamName: req.body.teamName });

        if (teamToBeSent.teamName.length < 4) {
            errors.push({ msg: 'Name must be at least 4 characters long' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            if (team != null) {
                res.send({ msg: 'Team already exists' });
            } else {
                try {
                    teamDB = await Team.updateOne(teamToBeSent, 
                       { teamName: req.params.teamName },
                    );
                    res.status(200).send({ msg: 'Team changed' });
                }

                catch (err) {
                    res.status(200).send(err);
                }
            }
        }
    },

    deleteTeam: async (req, res) => {
        try {
            const team = await Team.findOne({ _id: req.body.id });
            if (team) {

                await team.deleteOne();
                res.status(200).send({ msg: "Team has been deleted" });
            }
            else {
                res.status(404).send({ msg: "Team wasn't found" });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
module.exports = controller;
