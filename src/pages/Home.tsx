
import {useHistory} from 'react-router-dom'


import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleImg from '../assets/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home() {

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
  
    if (!user) {
      await signInWithGoogle();
    }

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


    history.push(`rooms/${roomCode}`);


  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} ></img>
        <strong>Crie salas ao vivo</strong>
        <p>Tire as duvidas em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg}></img>
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleImg} alt="" />
            Crie sua sala com o Google
          </button>
          <div className="separator" >ou entre em uma sala</div>
          <form onSubmit={handlejoinRoom}>
            <input 
              type="text" 
              placeholder="digite o codigo da sala"
              onChange = {(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit"> entrar na sala </Button>
          </form>
        </div>
      </main>
    </div>
  )
}