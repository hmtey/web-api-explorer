import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import './sidebar.css'

/* const dummyData = [
    "1forge.com",
    "1password.com",
    "1password.local",
    "6-dot-authentiqio.appspot.com",
    "ably.io",
    "ably.net"
] */

function useClickOutside(ref, callback) {
    useEffect(() => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, callback])
}

function Sidebar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [providers, setProviders] = useState({})
    const navigate = useNavigate();
    const sidebarRef = useRef(null);
    useClickOutside(sidebarRef, () => {
        setShowSidebar(false)
    })
    
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

    const viewDetails = (service, details) => {
        navigate("/" + service, { state: details })
    }

    useEffect(() => {
        fetchProviders()
    }, [])

    return (
        <>
            <button id="toggle-button" onClick={toggleSidebar}>
                Explore web APIs
            </button>
            <div className={showSidebar ? "sidebar-overlay open" : "sidebar-overlay closed"}>
                <div className={showSidebar ? "sidebar open" : "sidebar closed"} ref={sidebarRef}>
                    Select Provider
                    {Object.keys(providers).map(provider => {
                        return (
                            <div className={providers[provider].isActive? "wrapper active" : "wrapper inactive"} key={provider}>
                                <button className="provider" onClick={() => toggleApis(provider)}>
                                    {provider}<i className="arrow"></i>
                                </button>
                                {Object.entries(providers[provider].apis).map(api => {
                                    return (
                                        <button className="api" key={api[0]} onClick={() => {viewDetails(api[0], api[1])}}>
                                            <img src={api[1]['info']['x-logo']['url']} width="20" height="20"></img>
                                            {api[1].info.title}
                                        </button>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Sidebar