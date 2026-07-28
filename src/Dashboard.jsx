import { useState } from "react";
import { activities } from "./activities";
export default function Dashboard({ trackerData }) {
    const [avgData, setAvgData] = useState(handleOptionChange("weeks"));

    function findPeriodValues() {
        try {
            let oldest = new Date(trackerData[0].date);
            let today = new Date();

            for (let item of trackerData) {
                let currentDate = new Date(item.date);
                if (currentDate < oldest) {
                    oldest = currentDate;
                }
            }
            return {
                weeks: Math.max(1, Math.ceil((today - oldest) / 86400000 / 7)),
                months: Math.max(1, Math.ceil((today - oldest) / 86400000 / 30.5)),
                years: Math.max(1, Math.ceil((today - oldest) / 86400000 / 365.25)),
            };
        } catch (err) {
            return {
                weeks: 0,
                months: 0,
                years: 0,
            }
        }

    }

    function handleOptionChange(opt) {
        let periods = findPeriodValues(trackerData)[opt];
        let totals = structuredClone(activities);

        for (let dataObj of trackerData) {
            totals[dataObj.activity] += dataObj.hours;
        }

        let activitiesAvgs = {};
        for (let key in totals) {
            activitiesAvgs[key] = Number((totals[key] / periods).toFixed(1));
        }
        return activitiesAvgs;
    }

    return (
        <div id="activity-page">
            <h3>Average hours spent on activites</h3>
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
                    <option value="weeks">per week</option>
                    <option value="months">per month</option>
                    <option value="years">per year</option>
                </select>
            </div>
        </div>
    );
}
