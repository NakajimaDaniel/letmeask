
import LogoImg from '../assets/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'

export function Room() {
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="letmeask" />
          <div>ddddd</div>

        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>sala</h1>
          <span>4 perguntas0</span>

        </div>

        <form >
          <textarea placeholder="pergunta" /> 

          <div className="form-footer">
            <span>para enviar uma pergunta, <button>faça seu login</button> </span>
            <Button type="submit">Enviar pergunta </Button>
          </div>
        </form>

      </main>

    </div>
  )
}