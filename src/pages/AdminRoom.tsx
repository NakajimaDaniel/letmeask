
import { FormEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import deleteImg from '../assets/delete.svg'
import logoImg from '../assets/logo.svg'
import checkImg from '../assets/check.svg'
import answerImg from '../assets/answer.svg'
import logoImgDarkMode from '../assets/logo-darkmode.svg'
import deleteX from '../assets/delete-x.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import { ThemeToggle } from '../components/ThemeToggle'
import { useTheme } from '../hooks/useTheme'
import Modal from 'react-modal'

// import '../styles/room.scss'

type roomParams = {
  id: string;
}

export function AdminRoom() {

  const history = useHistory();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [DeleteModalIsOpen, setDeleteModalIsOpen] = useState(false);


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


  function openDeleteModal() {
    setDeleteModalIsOpen(true);
  }


  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
  }

  return (
    // <div id="page-room">
    //   <header>
    //     <div className="content">
    //       <img src={LogoImg} alt="letmeask" />
    //       <div>
    //         <RoomCode code={roomId} />
    //         <Button isOutlined onClick={() => handleEndRoom()} >Encerrar sala</Button>
    //       </div>
    //     </div>
    //   </header>
    //   <main>
    //     <div className="room-title">
    //       <h1>{title}</h1>
    //       {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}

    //     </div>

        
    //     <div className="question-list">
    //       {questions.map(question => {
    //         return (
    //           <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted} >

    //             {!question.isAnswered && (
    //               <>
    //                 <button type="button" onClick={() => handleCheckQuestionasAnswered(question.id)} >
    //                   <img src={checkImg} alt="marcar pergunta respondida" />
    //                 </button>
                                    
    //                 <button type="button" onClick={() => handleHighlightQuestion(question.id)} >
    //                   <img src={answerImg} alt="dar destaque a pergunta" />
    //                 </button>
    //               </>
    //             )}
    //             <button type="button" onClick={() => handleDeleteQuestion(question.id)} >
    //               <img src={deleteImg} alt="delete image" />
    //             </button>
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
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => handleEndRoom()}>Close Room</Button>
          </div>
          
          <ThemeToggle /> 
        </div>
      </div>
    </header>

    <main className="w-full mt-10 lg:pl-60 lg:pr-60 md:pl-20 md:pr-20 sm:pl-10 sm:pr-10 pl-5 pr-5 max-w-7xl mx-auto" >

      <div className="flex items-center pb-5 " >
        <h1 className="text-black-400 font-poppins text-2xl dark:text-white ">{title}</h1>
        {questions.length > 0 && <span className="flex items-center ml-10 bg-pink-500 w-32 h-7 rounded-full text-white justify-center" > {questions.length} question(s)</span>}
      </div>


      <div  className="mt-10" >
        {questions.map(question => {
          return (
          <>
          <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted} >
            {!question.isAnswered && (
              <>
                <button className="pr-3"
                  type="button" onClick={() => handleCheckQuestionasAnswered(question.id)} 
                >
                  <img src={checkImg} alt="check question" />
                </button>
                                    
                <button className="pr-3"
                  type="button" onClick={() => handleHighlightQuestion(question.id)} 
                >
                  <img src={answerImg} alt="question answered" />
                </button>
              </>
            )}
            <button type="button" onClick={openDeleteModal} >
            <img src={deleteImg} alt="delete image" />
            </button>
          </Question>

          <Modal
          isOpen={DeleteModalIsOpen}
          onRequestClose={closeDeleteModal}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.15)'
            },
            content: {
              margin: 'auto',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              width: '30rem',
              height: '20rem',
              border: 'none',
              position: 'absolute',
  
            }
          }}
          contentLabel="Delete Question Modal"
        >
          <div className="flex flex-col items-center justify-center mx-auto">

            <img className="mt-5"
              src={deleteX} alt="x delete question" 
            />
            <p className="pb-3 pt-5 text-black-500 font-bold text-2xl">Delete Question</p>
            <p className="text-gray-700 " >Are you sure want delete this question?</p>
            <div className="flex flex-row gap-3 mt-10">
              <button className="bg-gray-400 rounded-md w-28 text-gray-500 justify-center h-10">Cancel</button>
              <button className="bg-red w-28 rounded-md text-white"
                type="button" onClick={() => handleDeleteQuestion(question.id)}
              >
                Yes, delete
              </button>
            </div>

          </div>
  
  
        </Modal>          
          </>
        )
        })}

      </div>

    </main>




  </div>
  )
}