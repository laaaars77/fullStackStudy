export function createWebSocket(onMessage) {
  const ws = new WebSocket("ws://127.0.0.1:8000/ws");

  ws.onopen = () => console.log("Connected to WebSocket");
  ws.onerror = (e) => console.error("WebSocket error", e);
  ws.onclose = () => console.log("WebSocket closed");

  ws.onmessage = (event) => {
    if (onMessage) onMessage(event.data);
  };

  return ws;
}
