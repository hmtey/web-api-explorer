import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './sidebar.css';

/* const dummyData = [
    "1forge.com",
    "1password.com",
    "1password.local",
    "6-dot-authentiqio.appspot.com",
    "ably.io",
    "ably.net"
] */

function Sidebar() {
    const [providers, setProviders] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            let providerData = await axios.get('https://api.apis.guru/v2/providers.json');
            setProviders(providerData.data.data);
        }
        
        fetchData();
    }, [])

    return (
        <div id="sidebar">
            Select Provider
            {providers.map(provider => {
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