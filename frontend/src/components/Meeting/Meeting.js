import React from 'react';
import './Meeting.css';

const Meeting = ({ email, date, month, year }) => {

    // Date Formatting
    if (date.length === 1) {
        date = '0' + date;
    }
    if (month.length === 1) {
        month = '0' + month;
    }

    return (
        <div className="meeting">
            <div className="meeting__header">
                <h3>Meeting with {email}</h3>
                <br />
                <h3>Date: {date}/{month}/{year}</h3>
            </div>
        </div>
    )
}

export default Meeting
