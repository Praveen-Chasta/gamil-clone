import React, { useEffect, useState } from 'react';

function ReadMails({ emailId }) {
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchEmailData = async () => {
      if (emailId) {
        try {
          const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${emailId}`);
          if (!response.ok) { 
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data);
          setEmailData(data);
        } catch (error) {
          console.error('Error fetching email data:', error);
          setError('Failed to fetch email data. Please try again later.');
        }
      }
    };

    fetchEmailData();
  }, [emailId]);

  if (error) {
    return <div>{error}</div>; 
  }

  if (!emailData) {
    return <div>Loading...</div>; 
  }


  const { body } = emailData;

  return (
    <div className='email-detail-container'>
      <div className='email-header'>
        <h2>Email Details</h2>
        <button className='favorite-button'>Mark as Favorite</button>
      </div>
      <div className='email-body' dangerouslySetInnerHTML={{ __html: body }}></div>
    </div>
  );
}

export default ReadMails;
