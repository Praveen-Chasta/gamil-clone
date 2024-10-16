import React, { useState } from 'react';
import './App.css';
import EmailsList from './component/emailsList/EmailsList';
import ReadMails from './component/readMails/ReadMails';

function App() {
  const [filter, setFilter] = useState('');
  const [selectedEmailId, setSelectedEmailId] = useState(null); 

  const handleEmailSelect = (emailId) => {
    setSelectedEmailId(emailId);
  };

  return (
    <>
      <section className='app-container'>
        <div className='app-main-container'>
          <nav className='action-properties'>
            <p>Filter By:</p>
            <ul className='ul-list'>
              <li>
                <button 
                  onClick={() => setFilter('unread')}
                  className={filter === 'unread' ? 'active' : ''}
                >
                  Unread
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setFilter('read')}
                  className={filter === 'read' ? 'active' : ''}
                >
                  Read
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setFilter('favourite')}
                  className={filter === 'favourite' ? 'active' : ''}
                >
                  Favourite
                </button>
              </li>
            </ul>
          </nav>

          <div className="email-container">
            <div className={`emails-list ${selectedEmailId ? 'reduced' : ''}`}>
              <EmailsList onEmailSelect={handleEmailSelect} filter={filter} />
            </div>
            {selectedEmailId && (
              <div className="read-mails">
                <ReadMails emailId={selectedEmailId} />
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

export default App;
