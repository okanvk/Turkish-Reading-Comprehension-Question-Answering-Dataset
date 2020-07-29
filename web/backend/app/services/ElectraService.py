
from app.services.BaseAttentionService import BaseAttention


class ElectraQAService(BaseAttention):

    def __init__(self):
        print("electra model loaded")


    @classmethod
    def ask_question(self,question,context):
        return "answer - electra" + question + context;
