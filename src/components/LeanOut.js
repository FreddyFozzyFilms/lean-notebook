import React from "react";
export default function LeanOut(props){
    const {log} = props;
    const tacticArray = log.split("\n");
    return (
        <p className="console">
        {tacticArray.map(tactic => <div>{tactic}</div>)}
        </p>
    )
}