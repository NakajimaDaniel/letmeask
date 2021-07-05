
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import LogoImg from '../assets/logo.svg'
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

  const { user } = useAuth();
  const params = useParams<roomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { title, questions } = useRoom(roomId);



  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
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
              <Question key={question.id} content={question.content} author={question.author} /> 
            )
          })}
        </div>

      </main>

    </div>
  )
}