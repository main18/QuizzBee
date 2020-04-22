import React, {Component} from "react";
import ReactDom from "react-dom";
import "./assets/style.css";
import quizService from './quizService/index';
import QuestionBox from './Component/QuestionBox';
import Results from './Component/Results';

class QuizBee extends Component {
    state = {
        questionBank : [],
        score: 0,
        responses: 0
    }

    
    getQuestion = () => {
        quizService().then(questions => {
            this.setState({
                questionBank : questions
            });
        });
    };

    playagain = () => {
        this.getQuestion();
        this.setState({
            score : 0,
            responses :0
        });
    }
    
    computeAnswers = (answers, correctAnswer) => {
        if(answers === correctAnswer){
            this.setState({
                score : this.state.score + 1 
            });
        }
        this.setState({
            responses : this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    }

    componentDidMount(){
        this.getQuestion();
    }

    render(){
        console.log(this.state);
        
        return(
            <div className='container'>
                <div className='title'>QuizBee</div>
                {this.state.questionBank.length > 0 && 
                 this.state.responses < 5 &&
                 this.state.questionBank.map(({question, answers, correct, questionId}) =>
                    (<QuestionBox 
                        key = {questionId} 
                        question = {question} 
                        options={answers} 
                        selected = {answer => this.computeAnswers(answer, correct)}
                    />)
                )}
                {this.state.responses === 5 ? (<Results score={this.state.score} playagain={this.playagain} />) : null} 
                
            </div>
        );
    }
}

ReactDom.render(<QuizBee />, document.getElementById('root'));