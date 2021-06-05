import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import axios from '../../shared/axios-instance';
import RefreshIcon from '@material-ui/icons/Refresh';
import './Events.css';

import Meeting from '../../components/Meeting/Meeting';

const Events = () => {
    const [meetings, setMeetings] = useState([]);

    // Fetch Posts Util Method
    const fetchPosts = () => {
        axios.get('/meeting/view-meetings')
            .then(meetings => {
                // console.log(meetings.data.meetings);
                setMeetings(meetings.data.meetings);
            });
    }


    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <div className="events">
            <button className="refreshDiv" onClick={fetchPosts}>
                <RefreshIcon />
            </button>
            {(meetings.length < 1) ?
                <h3>
                    No Meetings to show. Add a new meeting
                </h3> :
                meetings?.map(meeting => {
                    const castedDate = new Date(meeting.date);
                    return <Meeting
                        key={meeting._id}
                        email={meeting.email}
                        date={castedDate.getDate().toString()}
                        month={castedDate.getMonth().toString()}
                        year={castedDate.getFullYear().toString()}
                    />;
                })}
        </div>
    )
}

export default withRouter(Events);

