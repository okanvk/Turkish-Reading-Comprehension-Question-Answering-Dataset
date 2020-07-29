
from app.services.BaseAttentionService import BaseAttention


class BertQAService(BaseAttention):

    def __init__(self):
        print("bert model loaded")

    @classmethod
    def ask_question(self,question,context):
        return "answer - bert" + question + context;