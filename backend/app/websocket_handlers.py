from aiohttp import web

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    print("I see you!")
    async for msg in ws:
        if msg.type == web.WSMsgType.TEXT:
            await ws.send_str(f"Echo: {msg.data}")
    return ws
