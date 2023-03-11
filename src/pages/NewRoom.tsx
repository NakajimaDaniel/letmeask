
import {Link, useHistory} from 'react-router-dom'
import {FormEvent, useState} from 'react'
import logoImg from '../assets/logo.svg'
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

    <div className="flex items-center justify-center h-screen">
      <div className="flex w-full max-w-sm flex-col">
        <img src={logoImg}  className="mx-auto" /> 
        <h2 className="mb-5 font-poppins font-semibold text-2xl flex justify-center mt-10" >Create new room</h2>
        <form onSubmit={handleCreateRoom} className="flex content-center items-center justify-center flex-col w-10/12 mx-auto" >
          <input 
            type="text" 
            placeholder="room name"
            onChange = {event => setNewRoom(event.target.value)}
            value={newRoom}
            className=" rounded-md pt-3 pb-3 pl-6 pr-6 border border-gray-500 w-full mb-5"
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