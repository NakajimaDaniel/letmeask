
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleImg from '../assets/google-icon.svg'

export function Home() {
  return (
    <div>
      <aside>
        <img src={illustrationImg} ></img>
        <strong>Crie salas ao vivo</strong>
        <p>Tire as duvidas em tempo real</p>
      </aside>
      <main>
        <div>
          <img src={logoImg}></img>
          <button>
            <img src={googleImg} alt="" />
            Crie sua sala com o Google
          </button>
          <div>ou entre em uma sala</div>
          <form>
            <input 
              type="text" 
              placeholder="digite o codigo da sala"

            />
            <button type="submit"> entrar na sala </button>
          </form>
        </div>
      </main>
    </div>
  )
}