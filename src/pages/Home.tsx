
import {useHistory} from 'react-router-dom'

import {auth, firebase} from '../services/firebase'

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleImg from '../assets/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'

export function Home() {

  const history = useHistory();


  function handleCreateRoom() {

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
    .signInWithPopup(provider)
    .then(result=> {console.log(result)})

    history.push('/rooms/new');
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
          <form>
            <input 
              type="text" 
              placeholder="digite o codigo da sala"

            />
            <Button type="submit"> entrar na sala </Button>
          </form>
        </div>
      </main>
    </div>
  )
}