import React from "react";

import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default function LeanOut(props){
    const {setOpen, open, changeMode} = props
    return (
        <div className="settings-bar">
            <Dropdown
            name="language"
            title="select mode"
            list={[{label: "stex", value: "stex"}, {label: "lean", value: "lean"}]}
            onChange={(item, name) => changeMode(item.value)}
            />

            <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
        </div>
    )
}