
import {useHistory} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import  logoImg  from '../assets/logo.svg'
import googleImg from '../assets/google-icon.svg'
import { Button } from '../components/Button'

export function Home() {

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
  /*
    if (!user) {
      await signInWithGoogle();
    }*/
    
    signInWithGoogle();
    
    history.push('/rooms/new');
  }

  async function handlejoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('room does not exists');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed');
      return;
    }

    history.push(`rooms/${roomCode}`);

  }

  return (

    <div className="flex items-center justify-center h-screen">
      <div className="flex w-full max-w-sm flex-col">
        <img src={logoImg}  className="mx-auto" alt="let me ask logo"/> 
        <button 
          onClick={handleCreateRoom} 
          className="flex content-center items-center bg-red text-white pt-3 pb-3 pl-20 pr-20 mt-10 font-medium mx-auto rounded-md cursor-pointer  hover:bg-purple brightness-90 transition duration-400" 
        >
          <img src={googleImg} alt="google icon" className="flex pr-2" />
          Login with Google
        </button> 
        <div className=" flex items-center  mt-5 mx-auto text-gray-500 mb-6" >
          or enter a room
        </div>
        <form onSubmit={handlejoinRoom} className="flex content-center items-center justify-center flex-col w-10/12 mx-auto" >
        <input 
          type="text" 
          placeholder="enter room code"
          onChange = {(event) => setRoomCode(event.target.value)}
          value={roomCode}
          className=" rounded-md pt-3 pb-3 pl-6 pr-6 border border-gray-500 w-full mb-5"
        />
          <Button type="submit"> enter room </Button>
        </form>
      </div>
    </div>

  )
}

