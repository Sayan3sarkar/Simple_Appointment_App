const { validationResult } = require('express-validator');
const Meeting = require('../models/meeting');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: `${process.env.SENDGRID_API_KEY}`
    }
}));

/**
 * Controller to schedule a new meeting
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createMeeting = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error('Validation Failed');
        err.statusCode = 422;
        err.data = errors.array();
        throw err;
    }

    const { email, date } = { ...req.body };
    const castedDate = new Date(date);

    const newMeeting = new Meeting({
        email: email,
        date: castedDate
    });

    // Date Formatting
    let dd = castedDate.getDate().toString();
    let mm = castedDate.getMonth().toString();
    let yyyy = castedDate.getFullYear().toString();

    if (dd.length === 1) {
        dd = '0' + dd;
    }
    if (mm.length === 1) {
        mm = '0' + mm;
    }

    newMeeting
        .save()
        .then(result => {
            return transporter.sendMail({
                to: email,
                from: `${process.env.SENDGRID_SENDER_EMAIL}`,
                subject: `Appointment at ${dd}/${mm}/${yyyy}`,
                html:
                    `
                        <p> You have an appointment at ${dd}/${mm}/${yyyy}</p>
                        <p> Thanks and Regards,</p>
                        <br />
                    Event Biz Admin
                    `
            })
        })
        .then(result => {
            res.status(201).json({
                message: 'New Meeting created successfully'
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

/**
 * Controller to view all meetings
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.viewMeetings = (req, res, next) => {
    Meeting.find()
        .then(meetings => {
            res.status(200).json({
                message: 'Fetched Meetings Successfully',
                meetings: meetings
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

/**
 * Controller to view a specific meeting by ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.viewMeeting = (req, res, next) => {
    const { meetingId } = { ...req.params };

    console.log(meetingId);

    Meeting.findById(meetingId)
        .then(meeting => {
            if (!meeting) {
                const error = new Error("Couldn't find meeting with the given ID");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: 'Meeting Found',
                meeting: meeting
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}