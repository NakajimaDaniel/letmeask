
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import LogoImg from '../assets/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import '../styles/room.scss'

type roomParams = {
  id: string;
}

export function Room() {

  const { user } = useAuth();
  const params = useParams<roomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('you must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="letmeask" />
          <RoomCode code={roomId} />

        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>sala</h1>
          <span>4 perguntas0</span>

        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea placeholder="pergunta" onChange={event => setNewQuestion(event.target.value)} value={newQuestion} /> 

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ):(
              <span>para enviar uma pergunta, <button>faça seu login</button> </span>
            ) }
            <Button type="submit" disabled={!user}>Enviar pergunta </Button>
          </div>
        </form>

      </main>

    </div>
  )
}