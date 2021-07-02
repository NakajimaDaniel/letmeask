
import {Link} from 'react-router-dom'

import {FormEvent, useState} from 'react'
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'


export function NewRoom() {

  const { user } = useAuth();

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
          <h2>Criar nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="nome da sala"
              onChange = {event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit"> criar sala </Button>
          </form>
          <p>
            Quer entrar em uma sala existente ? <Link to="/"> clique aqui </Link>
          </p>
        </div>
      </main>
    </div>
  )
}