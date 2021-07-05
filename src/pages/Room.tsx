
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import LogoImg from '../assets/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import '../styles/room.scss'

type roomParams = {
  id: string;
}

type QuestionType = {
  id: string;
  author: {
    name: string,
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}

type firebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;

}>

export function Room() {

  const { user } = useAuth();
  const params = useParams<roomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => { 
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: firebaseQuestions = databaseRoom.questions  ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
        }
      }); 

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);

    })

  }, [roomId]);

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
          <h1>{title}</h1>
          {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}

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