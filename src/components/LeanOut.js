import React from "react";
export default function LeanOut(props){
    const {log} = props;
    const tacticArray = log.split("\n");
    return (
        <div className="console">
        {tacticArray.map(tactic => <p key={tactic}>{tactic}</p>)}
        </div>
    )
}