import { useState } from "react";
import { activities } from "./activities";
export default function Dashboard({ trackerData }) {
    const [avgData, setAvgData] = useState(handleOptionChange("weeks"));
    function handleOptionChange(opt) {
        const totals = structuredClone(activities);
        let interval;
        if (opt == "weeks") {
            interval = 7;
        }
        else if (opt == "months") {
            interval = 30;
        }
        else if (opt == "years") {
            interval = 365;
        }

        const dateIterator = new Date();
        const aWeekAgo = new Date();
        aWeekAgo.setDate(dateIterator.getDate() - interval);
        while (dateIterator >= aWeekAgo) {

            for (let dataObj of trackerData) {
                const currentDate = dateIterator.toISOString().split("T")[0];
                if (dataObj.date === currentDate) {
                    totals[dataObj.activity] += dataObj.hours;
                }
            }
            dateIterator.setDate(dateIterator.getDate() - 1);

        }
        console.log(totals);
        return totals;

    }
    return (
        <div id="activity-page">
            <h3>Total hours spent on activites</h3>
            <div id="activity-view">
                <div id="all-items">
                    {Object.entries(avgData).map(([key, value], index) => {
                        let max = Math.max(...Object.values(avgData), 1);
                        let height = (value / max) * 300;

                        return (
                            <div className="item" key={index}>
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
                <select onChange={(e) => setAvgData(handleOptionChange(e.target.value))}>
                    <option value="weeks">last week</option>
                    <option value="months">last month</option>
                    <option value="years">last year</option>
                </select>
            </div>
        </div>
    );
}
