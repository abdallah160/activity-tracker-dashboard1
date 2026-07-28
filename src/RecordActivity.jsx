import { useEffect, useState } from "react";
import { activities } from "./activities";
import { supabase } from "./supabaseClient";
export default function RecordActivity() {
    const initFormData = {
        date: "",
        hours: "",
        activity: "sleep"

    }
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState(initFormData)
    function handleValidateChange({ date, hours, activity }) {
        if (date == null || date < 0 || hours <= 0 || activity == null || date == undefined || date == "") {
            setError(true);
        }
        else {
            setError(false);
            setFormData(initFormData);

            async function fetchPost() {
                const response = await supabase.from('tracker').insert({ date, hours, activity }).select();
                if (response.error) {
                    console.log(response.error)
                    setFormData(formData);
                }
            }
            fetchPost();
        }
    }

    return <div id="activity-view2">
        <h3>Record Your Activity For The Day</h3>
        <div>
            <label>Date: </label>
            <input type="date" value={formData.date} onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value, }))} />
        </div>
        <div>
            <label>How Many Hours: </label>
            <input type="number" value={formData.hours} onChange={(e) => setFormData((prev) => ({ ...prev, hours: e.target.value, }))} />
        </div>
        <div>
            <label >Selet the Activity: </label>
            <select value={formData.activity} onChange={(e) => setFormData((prev) => ({ ...prev, activity: e.target.value, }))} >
                {
                    Object.keys(activities).map((key) => <option key={key} value={key}>{key}</option>)
                }
            </select>
        </div>
        {error ? <p style={{ color: `red` }}>make sure all fields are filles properly</p> : <></>}
        <button onClick={() => { handleValidateChange(formData) }}>+</button>
    </div>
}