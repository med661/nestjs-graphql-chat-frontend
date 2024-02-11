import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatComponent from './chat';

const Dashboard = ({ socket }) => {
  const user = useSelector(state => state.auth.user);

  useEffect(() => {

  }
    , [user, socket]);



  return (
    <>
      <ChatComponent socket={socket} />
    </>
  );
};

export default Dashboard;