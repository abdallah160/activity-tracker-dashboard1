import { useState } from "react";
import { activities } from "./activities";
export default function RecordActivity({ handleDataSubmittion }) {
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
        hours: "",
        activity: "sleep"
    })
    function handleValidateChange({ date, hours, activity }) {
        if (date == null || date < 0 || hours <= 0 || activity == null || date == undefined || date == "") {
            setError(true);
        }
        else {
            setError(false);
            handleDataSubmittion({
                id: Date.now(),
                date: date,
                hours: Number(hours),
                activity: activity
            })
            setFormData({
                date: "",
                hours: "",
                activity: "sleep"
            });
        }
    }

    return <div id="activity-view2">
        <h3>Record Your Activity For The Day</h3>
        <div>
            <label>Date: </label>
            <input type="date" onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value, }))} value={formData.date} />
        </div>
        <div>
            <label>How Many Hours: </label>
            <input type="number" onChange={(e) => setFormData((prev) => ({ ...prev, hours: e.target.value, }))} value={formData.hours} />
        </div>
        <div>
            <label >Selet the Activity: </label>
            <select onChange={(e) => setFormData((prev) => ({ ...prev, activity: e.target.value, }))} value={formData.activity}>
                {
                    Object.keys(activities).map((key) => <option key={key} value={key}>{key}</option>)
                }
            </select>
        </div>
        {error ? <p style={{ color: `red` }}>make sure all fields are filles properly</p> : <></>}
        <button onClick={() => { handleValidateChange(formData) }}>+</button>
    </div>
}