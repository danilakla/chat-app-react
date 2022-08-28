import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const logout=()=>{
}
export default function BasicSwitches() {
    return (
        <div style={{marginRight:30}}>
            logout
            <Switch onClick={logout} {...label} defaultChecked color="secondary" />

        </div>
    );
}