const router = require('express').Router();
const { body } = require('express-validator');
const meetingControllers = require('../controllers/meeting');

// POST request to /meeting/create-meeting
router.post(
    '/create-meeting',
    [
        body('email').not().isEmpty().withMessage('Email cannot be empty')
            .trim().isEmail().withMessage('Please Enter a valid email'),
    ],
    meetingControllers.createMeeting
);

// GET request to /meeting/view-meetings
router.get('/view-meetings', meetingControllers.viewMeetings);

// GET request to /meeting/view-meeting/:meetingId
router.get('/view-meeting/:meetingId', meetingControllers.viewMeeting);

module.exports = router;