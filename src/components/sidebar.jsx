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
    const [showSidebar, setShowSidebar] = useState(false);
    const [providers, setProviders] = useState({})
    
    const fetchProviders = async () => {
        let providerData = await axios.get('https://api.apis.guru/v2/providers.json')
        for (const provider of providerData.data.data) {
            let apiData = await axios.get('https://api.apis.guru/v2/' + provider + '.json')
            setProviders(providers => (
                {...providers, 
                    [provider]: {
                        apis: apiData.data.apis,
                        isActive: false
                    }
                }
            ))
        }
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const toggleApis = (provider) => {
        setProviders(providers => (
            {...providers, 
                [provider]: {
                    apis: providers[provider].apis,
                    isActive: !providers[provider].isActive
                }
            }
        ))
    }

    useEffect(() => {
        fetchProviders()
    }, [])

    return (
        <>
            <button onClick={toggleSidebar}>
                Explore web APIs
            </button>
            {showSidebar && 
                <div id="sidebar">
                    Select Provider
                    {Object.keys(providers).map(provider => {
                        return (
                            <div className={providers[provider].isActive? "wrapper-active" : "wrapper-inactive"} key={provider}>
                                <button className="provider" onClick={() => toggleApis(provider)}>
                                    {provider}<i className="arrow"></i>
                                </button>
                                {Object.entries(providers[provider].apis).map(api => {
                                    return (
                                        <button className="api" key={api[0]}>
                                            <img src={api[1]['info']['x-logo']['url']} width="20" height="20"></img>
                                            {api[1].info.title}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Sidebar