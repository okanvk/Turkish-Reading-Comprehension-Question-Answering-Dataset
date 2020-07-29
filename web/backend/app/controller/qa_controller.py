from flask import Blueprint, request
from flask import jsonify
from app.services.BertService import BertQAService
from app.services.ElectraService import ElectraQAService


qa_app = Blueprint('qa_app', __name__)

bert_service = BertQAService()
electra_service = ElectraQAService()

@qa_app.route('/qa_bert', methods=['POST','GET'])
def ask_question_to_bert():
    try:
        data = request.get_json()
        question = data.get("question")
        context = data.get("context")
        answer = bert_service.ask_question(question=question,context=context)
        return jsonify({"answer" : answer})
    except:
        return jsonify(None)

@qa_app.route('/qa_electra', methods=['POST','GET'])
def ask_question_to_electra():
    try:
        data = request.get_json()
        question = data.get("question")
        context = data.get("context")
        answer = electra_service.ask_question(question=question,context=context)
        return jsonify({"answer" : answer})
    except:
        return jsonify(None)
