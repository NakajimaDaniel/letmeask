
import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import logoImgDarkMode from '../assets/logo-darkmode.svg'
import logoImg from '../assets/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { ThemeToggle } from '../components/ThemeToggle'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { useTheme } from '../hooks/useTheme'
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
  const { title, questions } = useRoom(roomId);
  const { theme }  = useTheme();

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

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();

    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }

  }


  return (
    // <div id="page-room">
    //   <header>
    //     <div className="content">
    //       <img src={LogoImg} alt="letmeask" />
    //       <RoomCode code={roomId} />

    //     </div>
    //   </header>
    //   <main>
    //     <div className="room-title">
    //       <h1>{title}</h1>
    //       {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}

    //     </div>

    //     <form onSubmit={handleSendQuestion}>
    //       <textarea placeholder="pergunta" onChange={event => setNewQuestion(event.target.value)} value={newQuestion} /> 

    //       <div className="form-footer">
    //         { user ? (
    //           <div className="user-info">
    //             <img src={user.avatar} alt={user.name} />
    //             <span>{user.name}</span>
    //           </div>
    //         ):(
    //           <span>para enviar uma pergunta, <button>faça seu login</button> </span>
    //         ) }
    //         <Button type="submit" disabled={!user}>Enviar pergunta </Button>
    //       </div>
    //     </form>

    //     <div className="question-list">
    //       {questions.map(question => {
    //         return (
    //           <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted} >
    //             {!question.isAnswered && (
    //               <button className={`like-button ${question.likeId ? 'liked' : ''}`} type="button" aria-label="like" onClick={() => handleLikeQuestion(question.id, question.likeId)} >
    //                 {question.likeCount > 0 && <span>{question.likeCount}</span>}
    //                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                   <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    //                 </svg>
    //               </button>
    //             )}
    //           </Question> 
    //         )
    //       })}
    //     </div>

    //   </main>

    // </div>

    <div className=""> 
      <header className="p-5 border-b border-gray-400  dark:border-gray-700    sm:pl-5 md:pl-20" >
        <div className="flex my-auto items-center justify-between">
          <img src={theme ==='light'? logoImg : logoImgDarkMode} alt="letmeask" className=" h-12 max-w-25" />
          <div className="flex flex-row items-center gap-4">
            <RoomCode code={roomId} />
            <ThemeToggle /> 
          </div>
        </div>
      </header>

      <main className="w-full mt-10 lg:pl-60 lg:pr-60 md:pl-20 md:pr-20 sm:pl-10 sm:pr-10 pl-5 pr-5 max-w-7xl mx-auto" >

        <div className="flex items-center pb-5" >
          <h1 className="text-black-400 font-poppins text-2xl dark:text-white ">{title}</h1>
          {questions.length > 0 && <span className="ml-10 bg-pink border-full text-white " > {questions.length} pergunta(s)</span>}
        </div>

        <form className="flex  flex-col"  onSubmit={handleSendQuestion} >
          <textarea className="p-4 rounded-lg bg-white shadow resize-y w-full dark:bg-gray-600"
            placeholder="ask a question ..." onChange={event => setNewQuestion(event.target.value)} value={newQuestion}
          /> 
          
          <div className="flex justify-between mt-4"  >
            { user ? (
              <div className="flex items-center">
                <img className="w-8 h-8 rounded-full"
                  src={user.avatar} alt={user.name} 
                />
                <span className="ml-2 text-black-400 dark:text-white" >{user.name}</span>
              </div>
              ):(
              <span className="text-gray-700 " >para enviar uma pergunta, <button  className="text-purple" >faça seu login</button> </span>
            ) }
            <div className="max-w-sm" >
              <Button type="submit" disabled={!user}>Enviar pergunta </Button>            
            </div>
            
          </div>

        </form>

      </main>


    </div>


  )
}