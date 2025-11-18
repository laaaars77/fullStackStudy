from aiohttp import web

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    print("Client connected!")  # <-- hinzufügen

    async for msg in ws:
        print("Received:", msg)  # <-- hinzufügen

        if msg.type == web.WSMsgType.TEXT:
            await ws.send_str(f"Echo: {msg.data}")

    return ws

