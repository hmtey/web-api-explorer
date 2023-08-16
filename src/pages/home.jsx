import Sidebar from "../components/sidebar"
import './home.css';

function Home() {
    return (
        <>
            <Sidebar/>
            <div id="main-body">
                <button>Explore web APIs</button>
            </div>
        </>
    )
}

export default Home