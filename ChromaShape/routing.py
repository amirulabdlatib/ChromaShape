from django.urls import path
from .consumers import ShapeConsumer

websocket_urlpatterns = [
    path('ws/socket-server/',ShapeConsumer.as_asgi())
]