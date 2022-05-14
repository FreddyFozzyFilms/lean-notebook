import React from "react";
export default function LeanOut(props){
    const {log} = props;
    const tacticArray = log.split("\n");
    return (
        <div className="console">
        {log === '' && 'no goals'}
        {tacticArray.map((tactic, index) => <p key={index}>{tactic}</p>)}
        </div>
    )
}