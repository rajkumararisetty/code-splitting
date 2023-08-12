import { Link } from 'react-router-dom';
import './Home.css'; // Import your CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Home Page</h2>
      <div className="buttons">
        <Link to="/todoManager" className="nav-button">
          Go to Todo Manager
        </Link>
        <Link to="/contactsManager" className="nav-button">
          Go to Contacts Manager
        </Link>
      </div>
    </div>
  );
}

export default Home;
