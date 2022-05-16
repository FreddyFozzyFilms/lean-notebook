import React from "react";
export default function LeanOut(props){
    const {log} = props;
    const tacticArray = log.split("\n");
    return (
        <div className="console">
        {log === '' && <p>no goals</p>}
        {tacticArray.map((tactic, index) => <p key={index}>{tactic}</p>)}
        </div>
    )
}