import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../appwrite/auth';

// Create a context to hold the user state
export const UserContext = createContext();

// Create a provider component to manage the user state
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail]= useState(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await account.get();
        const name = response.name;
        const id = response.$id;
        const email= response.email;
        console.log('Account name:', name, id, email);
        setUserName(name);
        setUserId(id);
        setUserEmail(email);
      } catch (error) {
        console.error('Error fetching account information:', error);
      }
    };

    fetchAccountInfo();
  }, []);

  // Provide the user state to the children ../HomePage
  return (
    <UserContext.Provider value={{ userName, userId , userEmail}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the user context
export const useUser = () => useContext(UserContext);