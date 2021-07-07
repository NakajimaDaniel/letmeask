
import { FormEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import deleteImg from '../assets/delete.svg'
import LogoImg from '../assets/logo.svg'
import checkImg from '../assets/check.svg'
import answerImg from '../assets/answer.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/room.scss'

type roomParams = {
  id: string;
}




export function AdminRoom() {

  const history = useHistory();
  const { user } = useAuth();
  const params = useParams<roomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { title, questions } = useRoom(roomId);


  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }
  
  async function handleCheckQuestionasAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => handleEndRoom()} >Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}

        </div>

        
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted} >

                {!question.isAnswered && (
                  <>
                    <button type="button" onClick={() => handleCheckQuestionasAnswered(question.id)} >
                      <img src={checkImg} alt="marcar pergunta respondida" />
                    </button>
                                    
                    <button type="button" onClick={() => handleHighlightQuestion(question.id)} >
                      <img src={answerImg} alt="dar destaque a pergunta" />
                    </button>
                  </>
                )}
                <button type="button" onClick={() => handleDeleteQuestion(question.id)} >
                  <img src={deleteImg} alt="delete image" />
                </button>
              </Question> 
            )
          })}
        </div>

      </main>

    </div>
  )
}