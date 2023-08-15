import { useState } from 'react'
import React from "react";
import './sidebar.css';

const dummyData = [
    "1forge.com",
    "1password.com",
    "1password.local",
    "6-dot-authentiqio.appspot.com",
    "ably.io",
    "ably.net"
]

function Sidebar() {
    return (
        <div id="sidebar">
            Select Provider
            {dummyData.map(provider => {
                return (
                    <div>
                        {provider}<i class="arrow"></i>
                    </div>
                )
            })}
        </div>
    )
}

export default Sidebar;