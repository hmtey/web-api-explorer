import { useLocation, useNavigate } from 'react-router-dom'
import './serviceDetails.css'

function ServiceDetails(props) {
    const { state } = useLocation()
    const navigate = useNavigate()

    const returnHome = () => {
        navigate('/');
    }

    return (
        <div className="service">
            <div className="service-title">
            <img src={state['info']['x-logo']['url']} height="90px" width="90px"></img>
            <h1>
                {state.info.title}
            </h1>
            </div>
            <div className="service-body">
                <div className="details">
                    <h2>Description</h2>
                    <p align="left">{state.info.description}</p>
                </div>
                <div className="details">
                    <h2>Swagger</h2>
                    <p align="left">{state.swaggerUrl}</p>
                </div>
                <div className="details">
                    <h2>Contact</h2>
                    <div className="contact-details">
                        <div className="contact-specifics">
                            <h4>Email</h4>
                            <h4>Name</h4>
                            <h4>Url</h4>
                        </div>
                        <div className="contact-specifics">
                            <p align="left">{state.info.contact? state.info.contact.email ? state.info.contact.email : "-" : "-"}</p>
                            <p align="left">{state.info.contact? state.info.contact.name ? state.info.contact.name : "-" : "-"}</p>
                            <p align="left">{state.info.contact? state.info.contact.url? state.info.contact.url : "-" : "-"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button onClick={returnHome}>
                    Explore web APIs
                </button>
            </div>
        </div>
    )
}

export default ServiceDetails