import React from "react";

const OfflinePage = ({isOnline,isConnected}) => {

  return (
    <div className="macos-wrapper">
      <div className="macos-window">
        <div className="macos-window-header">
          <div className="macos-window-header-buttons">
            <div className="macos-button red"></div>
            <div className="macos-button yellow"></div>
            <div className="macos-button green"></div>
          </div>
          <div className="status-indicator offline">Offline</div>
        </div>

        <div className="macos-window-content">
          <h1>Oops! You're Offline.</h1>
          <p>Failed to connect to the server</p>
          <div className="status-section">
            <span className={`status-indicator ${isOnline ? "online" : "offline"}`}>
              Internet: {isOnline ? "Connected " : "Disconnected "}
            </span>
            <span className={`status-indicator ${isConnected ? "online" : "offline"}`}>
              WebSocket: {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
