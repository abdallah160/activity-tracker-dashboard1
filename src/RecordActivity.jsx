import { useRef, useState } from "react";

export default function RecordActivity({ handleDataSubmittion }) {
    const [error, setError] = useState(false);
    let date = useRef();
    let hours = useRef();
    let activity = useRef();


    function isValid(date, hours, activites) {
        if (date == null || date < 0 || hours <= 0 || activites == null || date == undefined || date == "") return false;
        else return true;

    }

    return <div id="activity-view2">
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
                <option value="sleep">Sleep </option>
                <option value="work">Work</option>
                <option value="sport">Sport</option>
                <option value="reading">Reading</option>
                <option value="eating">Eating</option>
                <option value="tv">TV</option>
                <option value="family">Family/Friends</option>
            </select>
        </div>
        {error ? <p style={{ color: `red` }}>make sure all fields are filles properly</p> : <></>}
        <button onClick={() => {
            if (isValid(date.current.value, Number(hours.current.value), activity.current.value)) {
                setError(false);


                handleDataSubmittion({
                    id: Date.now(),
                    date: date.current.value,
                    hours: Number(hours.current.value),
                    activity: activity.current.value
                })
                date.current.value = "";
                hours.current.value = "";
                activity.current.selectedIndex = 0;
            }
            else setError(true);
        }}>+</button>
    </div>
}