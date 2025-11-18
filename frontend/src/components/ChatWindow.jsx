import { useEffect, useRef, useState } from "react";
import { createWebSocket } from "../utils/websocket";

export default function ChatWindow() {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  console.log("ChatWindow rendered");

  useEffect(() => {
    wsRef.current = createWebSocket((msg) => {
      setMessages((prev) => [...prev, "Server: " + msg]);
    });

    return () => wsRef.current.close();
  }, []);

  function sendMessage() {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(text);
      setMessages((prev) => [...prev, "You: " + text]);
      setText("");
    }
  }

  return (
    <div>
      <div>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
