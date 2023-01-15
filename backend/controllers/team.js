const express = require('express');
const router = express.Router();

const Team = require('../models/team');

const controller = {
    addTeam: async (req, res) => {
        console.log(req.student);
        const { teamName } = req.body;
        let errors = [];

        if (teamName.length < 4) {
            errors.push({ msg: 'Name must be at least 4 characters long' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            Team.findOne({ teamName: teamName }).then(async team => {
                if (team) {
                    errors.push({ msg: 'Name already used' });

                    res.send({ msg: 'Team already exists' });
                } else {
                    const newTeam = Team.create({ teamName: teamName, createdBy:req.student._id, teamMembers: [req.student._id] });
                    res.send({ msg: 'Team has been created' });
                }
            })
        }

    },

    get: async (req, res) => {
        Team.findOne(
           { _id: req.body.team }
        ).then((team) => {
            console.log(team)
            res.status(200).send(team);
        }).catch(err => {
            res.status(500).send(err)
        })
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
            const team = await Team.findOne({ teamName: req.params.teamName });
            if (team) {
                await team.destroy();
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
