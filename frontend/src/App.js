import React, { useState, useEffect } from 'react';
import './App.css'; 
import OnlinePage from './pages/online/OnlinePage';
import OfflinePage from './pages/offline/OfflinePage';
import { useWebSocket } from './WebSocketContext';

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isConnected } = useWebSocket();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  console.log('App component rendered');

  const isFullyOnline = isOnline && isConnected;
  return (
    <div className={isFullyOnline ? 'app online' : 'app offline'}>
      {isFullyOnline ? <OnlinePage isOnline={isOnline} isConnected={isConnected}/> : <OfflinePage isOnline={isOnline} isConnected={isConnected}/>}
    </div>
  );    

};

export default App;
