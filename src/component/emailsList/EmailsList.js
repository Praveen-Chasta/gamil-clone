import React, { useContext, useState, useEffect } from 'react';
import '../../App.css';
import { FilterContext } from '../../context/FilterContext';
import ReadMails from '../readMails/ReadMails'; // Import ReadMails

function EmailsList() {
  const { filter, favorites, toggleFavorite } = useContext(FilterContext);
  const [gmailListItem, setGmailListItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(5);
  const [totalEmails, setTotalEmails] = useState(0);
  const [selectedEmailId, setSelectedEmailId] = useState(null); // State for selected email

  useEffect(() => {
    const getGmailListItems = async () => {
      try {
        const response = await fetch(
          `https://flipkart-email-mock.now.sh/?page=${currentPage}&limit=${emailsPerPage}`
        );
        const data = await response.json();
        setGmailListItem(data.list);
        setTotalEmails(data.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getGmailListItems();
  }, [currentPage, emailsPerPage, filter]);

  const formatedData = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString('en-GB') +
      ' ' +
      date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })
    );
  };

  // Filter the emails based on the selected filter
  const filteredEmails = gmailListItem.filter((item) => {
    if (filter === 'favourite') {
      return favorites.includes(item.id);
    }
    return true; // If no filter is applied, return all
  });

  const totalPages = Math.ceil(totalEmails / emailsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEmailClick = (id) => {
    setSelectedEmailId(id); // Set the selected email ID on click
  };

  return (
    <>
      <section className='glist-bg-container'>
        <div className='gmail-details-container'>
          {filteredEmails.map((item) => (
            <li className='gmail-item' key={item.id} onClick={() => handleEmailClick(item.id)}>
              <div className='gmail-avatar'>
                <span className='avatar-text'>{item.from.name[0].toUpperCase()}</span>
              </div>
              <div className='gmail-info'>
                <p className='from-text'>
                  From: <span>{item.from.name}</span> &lt;{item.from.email}&gt;
                </p>
                <p className='subject-text'>
                  Subject: <span>{item.subject}</span>
                </p>
                <p className='description-text'>{item.short_description}</p>
                <p className='date-text'>
                  {formatedData(item.date)}{' '}
                  <span
                    className={`favorite-text ${favorites.includes(item.id) ? 'favorited' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering email click
                      toggleFavorite(item.id); // Handle favorite click
                    }}
                  >
                    {favorites.includes(item.id) ? 'Unfavorite' : 'Favorite'}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </div>
      </section>

      <div className='pagination-controls'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Render ReadMails component with selectedEmailId */}
      {selectedEmailId && <ReadMails emailId={selectedEmailId} />}
    </>
  );
}

export default EmailsList;
