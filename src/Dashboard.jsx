import { useEffect, useState } from "react";
import { activities } from "./activities";
import { supabase } from "./supabaseClient";
export default function Dashboard() {
    const [trackerData, setTrackerData] = useState([]);
    const [avgData, setAvgData] = useState(activities);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await supabase.from('tracker').select('*');
                if (response.error) throw new Error();
                setTrackerData(response.data)
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setAvgData(calculateTotals("weeks"))
    }, [trackerData])

    function calculateTotals(opt) {
        if (trackerData.length < 1) return activities;
        const totals = structuredClone(activities);
        let interval;
        if (opt === "weeks") {
            interval = 7;
        }
        else if (opt === "months") {
            interval = 30;
        }
        else if (opt === "years") {
            interval = 365;
        }

        const startDate = new Date();
        const today = new Date();
        startDate.setDate(today.getDate() - interval);
        for (let dataObj of trackerData) {
            const dateValue = new Date(dataObj.date);
            if (dateValue <= today && dateValue >= startDate) {
                totals[dataObj.activity] += dataObj.hours;
            }
        }
        return totals;
    }

    let max = Math.max(...Object.values(avgData), 1);
    return (
        <div id="activity-page">
            <h3>Total hours spent on activites</h3>
            {isLoading && <p>fetching data...</p>}
            <div id="activity-view">
                <div id="all-items">
                    {Object.entries(avgData).map(([key, value]) => {
                        let height = (value / max) * 300;
                        return (
                            <div className="item" key={key}>
                                <div className="bar" style={{ height: `300px` }}>
                                    <div
                                        className="white"
                                        style={{ height: `calc(300px - ${height}px)` }}
                                    ></div>
                                    <div
                                        className="green"
                                        style={{ height: `${height}px`, backgroundColor: `green` }}
                                    ></div>
                                </div>
                                <p>{key}</p>
                                <p>{value}h</p>
                            </div>
                        );
                    })}
                </div>
                <select onChange={(e) => setAvgData(calculateTotals(e.target.value))}>
                    <option value="weeks">last week</option>
                    <option value="months">last month</option>
                    <option value="years">last year</option>
                </select>
            </div>
        </div>
    );
}