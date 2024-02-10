import React from 'react';
import { useSelector } from 'react-redux';
import ChatComponent from './chat';

const Dashboard = ({socket}) => {
  const user = useSelector(state => state.auth.user);



  return (
    <>
      <ChatComponent socket={socket} />
    </>
  );
};

export default Dashboard;