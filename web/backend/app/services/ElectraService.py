
from transformers import AutoTokenizer,AutoModelForQuestionAnswering
import torch

class ElectraQAService():

    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("./electra-base-discriminator-finetuned_squadv1_tr")
        self.model = AutoModelForQuestionAnswering.from_pretrained("./electra-base-discriminator-finetuned_squadv1_tr")


    def ask_question(self,question,context):
        inputs = self.tokenizer.encode_plus(question, context, return_tensors="pt") 
        answer_start_scores, answer_end_scores = self.model(**inputs)
        answer_start = torch.argmax(answer_start_scores)  
        answer_end = torch.argmax(answer_end_scores) + 1  
        return self.tokenizer.convert_tokens_to_string(self.tokenizer.convert_ids_to_tokens(inputs["input_ids"][0][answer_start:answer_end]))

