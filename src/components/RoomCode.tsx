
import copyImg from '../assets/copy.svg';
import '../styles/room-code.scss';

type roomCodeProps = {
  code: string;
}

export function RoomCode(props: roomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard} >
      <div>
        <img src={copyImg} alt="copiar" />
      </div>

      <span>{props.code} </span>
    </button>
  )
}