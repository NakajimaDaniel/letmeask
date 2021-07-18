
import {Link, useHistory} from 'react-router-dom'

import {FormEvent, useState} from 'react'
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
// import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


export function NewRoom() {

  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,

    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }


  return (
    // <div id="page-auth">

    //   <main>
    //     <div className="main-content">
    //       <img src={logoImg} alt="logo image" />
    //       <h2>Criar nova sala</h2>

    //       <form onSubmit={handleCreateRoom}>
    //         <input 
    //           type="text" 
    //           placeholder="nome da sala"
    //           onChange = {event => setNewRoom(event.target.value)}
    //           value={newRoom}
    //         />
    //         <Button type="submit"> criar sala </Button>
    //       </form>
    //       <p>
    //         Quer entrar em uma sala existente ? <Link to="/"> clique aqui </Link>
    //       </p>
    //     </div>
    //   </main>
    // </div>


    <div className="flex items-center justify-center h-screen">
      <div className="flex w-full max-w-sm flex-col">
        <img src={logoImg}  className="mx-auto" /> 
        <h2 className="mb-5 font-poppins font-semibold text-2xl flex justify-center mt-10" >Create new room</h2>
        <form onSubmit={handleCreateRoom} className="flex content-center items-center justify-center flex-col" >
          <input 
            type="text" 
            placeholder="room name"
            onChange = {event => setNewRoom(event.target.value)}
            value={newRoom}
            className=" rounded-md pt-3 pb-3 pl-6 pr-6 border border-gray-500 w-10/12 mb-5"
          />
          <Button type="submit"> Create room </Button>
        </form>
        <p className="flex justify-center mt-2 text-gray-700"> 
          Want to join an existing room ? <Link to="/" className="pl-1 text-pink-500">Click here</Link>
        </p>
      </div>
    </div>

  )
}