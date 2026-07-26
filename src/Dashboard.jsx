import { useState } from "react";
export default function Dashboard({ trackerData }) {
    let initData = {
        sleep: 0,
        work: 0,
        sport: 0,
        reading: 0,
        eating: 0,
        tv: 0,
        family: 0
    }

    const [avgData, setAvgData] = useState(initData)
    function findPeriodValues(trackerData) {

        let oldest = new Date(trackerData[0].date);
        let today = new Date();
        for (let item of trackerData) {
            let currentDate = new Date(item.date);
            if (currentDate < oldest) {
                oldest = currentDate;
            }
        }

        return {
            weeks: Math.max(1, ((today - oldest) / 86400000) / 7),
            months: Math.max(1, ((today - oldest) / 86400000) / 30.5),
            years: Math.max(1, ((today - oldest) / 86400000) / 365.25)
        }
    }

    function handleOptionChange(opt) {

        if (opt == 'week') {
            setAvgData(prev => {
                let numOfWeeks = findPeriodValues(trackerData).weeks;
                let totals = { sleep: 0, work: 0, sport: 0, reading: 0, eating: 0, tv: 0, family: 0 };
                for (let dataObj of trackerData) {
                    totals[dataObj.activity] += dataObj.hours;

                }

                let activitiesAvgs = {};
                for (let key in totals) {
                    activitiesAvgs[key] = Number((totals[key] / numOfWeeks).toFixed(1));
                }
                return activitiesAvgs;
            })



        }
        else if (opt == 'month') {
            setAvgData(prev => {
                let numOfMonths = findPeriodValues(trackerData).months;
                let totals = { sleep: 0, work: 0, sport: 0, reading: 0, eating: 0, tv: 0, family: 0 };
                for (let dataObj of trackerData) {
                    totals[dataObj.activity] += dataObj.hours;

                }

                let activitiesAvgs = {};
                for (let key in totals) {
                    activitiesAvgs[key] = Number((totals[key] / numOfMonths).toFixed(1));
                }
                return activitiesAvgs;
            })

        }
        else if (opt == 'year') {
            setAvgData(prev => {
                let numOfYears = findPeriodValues(trackerData).years;
                let totals = { sleep: 0, work: 0, sport: 0, reading: 0, eating: 0, tv: 0, family: 0 };
                for (let dataObj of trackerData) {
                    totals[dataObj.activity] += dataObj.hours;

                }

                let activitiesAvgs = {};
                for (let key in totals) {
                    activitiesAvgs[key] = Number((totals[key] / numOfYears).toFixed(1));
                }
                return activitiesAvgs;
            })

        }
        else if (opt == 'select') {
            setAvgData(initData);
        }


    }
    let key2 = 0;

    return <div id="activity-page">
        <h3>Average hours spent on activites</h3>
        <div id="activity-view">
            <div id="all-items">
                {Object.entries(avgData).map(([key, value]) => {
                    let max = Math.max(...Object.values(avgData), 1);
                    let height = (value / max) * 300;

                    return (
                        <div className="item" key={key2 += 1}>
                            <div className="bar" style={{ height: `300px` }}>
                                <div className="white" style={{ height: `calc(300px - ${height}px)` }}></div>
                                <div className="green" style={{ height: `${height}px`, backgroundColor: `green` }}></div>
                            </div>
                            <p>{key}</p>
                            <p>{value}h</p>
                        </div>
                    )
                })}
            </div>
            <select onChange={(e) => handleOptionChange(e.target.value)}>
                <option value='select'>select</option>
                <option value='week'>per week</option>
                <option value='month'>per month</option>
                <option value='year'>per year</option>
            </select>
        </div>
    </div>
}