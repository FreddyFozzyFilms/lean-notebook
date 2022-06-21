// Copyright (c) 2022 FreddyFozzyFilms. All rights reserved.
// Released under MIT license as described in the file LICENSE.
// Authors: Frederick Pu
// Mode selection for the cells (choice between stex or lean).

import React from "react";

import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default function SettingsBar(props){
    const {changeMode} = props
    return (
        <div className="settings-bar">
            <Dropdown
            name="language"
            title=""
            list={[{label: "stex", value: "stex"}, {label: "lean", value: "lean"}]}
            onChange={(item, name) => changeMode(item.value)}

            styles={{headerTitle: { ['font-size']: '20px' }, header: {height: '23px', width: '0px'}, menuPortal : {['z-index']: '9999 !important'} }}
            />
        </div>
    )
}