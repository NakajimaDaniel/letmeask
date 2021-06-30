
import {Link} from 'react-router-dom'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleImg from '../assets/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'

export function NewRoom() {
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

          <form>
            <input 
              type="text" 
              placeholder="nome da sala"

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