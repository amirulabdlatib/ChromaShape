import json
from channels.generic.websocket import WebsocketConsumer

class ShapeConsumer(WebsocketConsumer):

    # initial request from client
    def connect(self):
        self.accept()

        self.send(text_data=json.dumps({
            'type':'connection_established',
            'message':'You are connected'
        }))

