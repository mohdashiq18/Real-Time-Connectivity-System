import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null); 

  const connect = useCallback(() => {
    if (socketRef.current) return;

    const socket = new WebSocket("wss://web-socket-server-tgds.onrender.com");
    socketRef.current = socket;
    setSocketInstance(socket);

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
      socketRef.current = null;
      setSocketInstance(null);

      
      if (navigator.onLine) {
        setTimeout(connect, 2000);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
      socket.close(); 
    };
  }, []);

  useEffect(() => {
    if (navigator.onLine) connect();

    window.addEventListener("online", connect);
    window.addEventListener("offline", () => {
      console.log("🔌 Offline - closing WebSocket");
      socketRef.current?.close();
    });

    return () => {
      window.removeEventListener("online", connect);
      window.removeEventListener("offline", () => {});
      socketRef.current?.close();
    };
  }, [connect]);

  return (
    <WebSocketContext.Provider
      value={{
        socket: socketInstance,
        isConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
