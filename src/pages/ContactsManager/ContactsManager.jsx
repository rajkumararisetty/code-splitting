import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactsManager.css'; // Import your CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { getAllContacts } from '../../redux/reducers/contact.reducer';

function ContactsManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data: contactsList} = useSelector(state => state.contact);

  useEffect(() => {
    dispatch(getAllContacts());
  }, []);

  return (
    <div className="contacts-container">
      <h2>Contact List</h2>
      <button className="nav-button" onClick={() => navigate('/')}>
        Go Back to Home
      </button>
      <ul className="contacts-list">
        {contactsList.map((contact) => (
          <li key={contact.id}>
            <div className="contact-name">{contact.name}</div>
            <div className="contact-email">{contact.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactsManager;
