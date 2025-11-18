from aiohttp import web
from .websocket_handlers import websocket_handler

def create_app():
    app = web.Application()
    app.router.add_get('/ws', websocket_handler)
    return app

if __name__ == "__main__":
    web.run_app(create_app(), port=8000)

