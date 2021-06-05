import './CreateEvent.css';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import { withRouter } from 'react-router';
import axios from '../../shared/axios-instance';

const CreateEvent = props => {

    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date());

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log(email, date);
        axios.post('/meeting/create-meeting', {
            email: email,
            date: date
        })
            .then(res => {
                console.log(res);
                props.history.push('/events');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="createEvent">
            <div className="createEvent__container">
                <h1>Create Meeting</h1>
                <form onSubmit={onSubmitHandler}>
                    <h5>Enter User Email</h5>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}></input>

                    <h5>Select a Date</h5>
                    <DatePicker
                        selected={date}
                        onChange={date => setDate(date)}
                    />
                    <button type="submit" className="createEvent__submitButton">Send Meeting Invite</button>
                </form>
            </div>
        </div>
    );
}

export default withRouter(CreateEvent);
