import { useRef } from "react";

export default function RecordActivity({ handleDataSubmittion }) {
    let date = useRef();
    let hours = useRef();
    let activity = useRef();

    return <div id="activity-view">
        <h3>Record Your Activity For The Day</h3>
        <div>
            <label>Date: </label>
            <input type="date" ref={date} />
        </div>
        <div>
            <label>How Many Hours: </label>
            <input type="number" ref={hours} />
        </div>
        <div>
            <label >Selet the Activity: </label>
            <select ref={activity}>
                <option value="Sleep">Sleep </option>
                <option value="Work">Work</option>
                <option value="Sport">Sport</option>
                <option value="Reading">Reading</option>
                <option value="Eating">Eating</option>
                <option value="TV">TV</option>
                <option value="Family/Friends">Family/Friends</option>
            </select>
        </div>
        <button onClick={() => handleDataSubmittion({
            'date': date.current.value,
            'hours': hours.current.value,
            'activity': activity.current.value
        })}>+</button>
    </div>
}