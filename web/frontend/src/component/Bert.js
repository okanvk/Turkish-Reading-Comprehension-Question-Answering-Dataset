import React, { Component } from 'react';
import qa_api from '../qa_api'

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class Bert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: "",
            context: "",
            answer: "",
            errors: {
                question: "",
                context: "",
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = e => {
        e.preventDefault();
        const { question, value } = e.target;
        let errors = this.state.errors;

        switch (question) {
            case 'question':
                errors.question = value.length === 0 ? 'Litfen Sorunuzu Giriniz' : '';
                break;
            case 'context':
                errors.context = value.length === 0 ? 'Lütfen Metni giriniz!' : '';
                break;
            default:
                break;
        }

        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async (e) => {

        let answer = null
        e.preventDefault()
        const { question, context } = this.state
        if (document.mainForm.question.value === "") {
            document.mainForm.question.focus();
            return false;
        }
        else if(document.mainForm.context.value === "") {
            document.mainForm.context.focus();
            return false;
        }
        else {
            const body = {
              "question" : question,
              "context" : context
            };
            const bert_endpoint = "qa_bert"
            const response = await qa_api.post(`${bert_endpoint}`,body)
            if(response.data != ''){
              answer = response.data.answer
          }else{
            answer = "Cevap bulunamadı."
          }
        }
        this.setState({answer : answer})

    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div>
                    <p className="title">BERT Modelimiz</p>
                </div>
                <div className="containerr">
                    <form onSubmit={this.handleSubmit} name="mainForm">
                        <div className="boxx boxx-2">
                            <input className="contactText" type="text" name="question" placeholder="Sorunuzu Giriniz"
                                autoComplete="off" onChange={this.handleChange} />
                            {errors.question.length > 0 &&
                                <span className='errorMessage'>{errors.question}</span>}
                        </div>

                        <div className="boxx boxx-2">
                            <textarea className="contactText" type="textarea" name="context" placeholder="Metni giriniz"
                                autoComplete="off" onChange={this.handleChange} />
                            <br />
                            {errors.context.length > 0 && <span className='errorMessage'>{errors.context}</span>}
                        </div>
                        <div >
                            <p className="middle">{this.state.answer}</p>
                        </div>
                        <div className="boxx boxx-2">
                            <button className="startButtonn">GÖNDER</button>
                        </div>

                    </form>
                </div>
            </div>

        );
    }
}

export default Bert;
