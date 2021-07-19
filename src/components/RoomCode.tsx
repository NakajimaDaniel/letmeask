
import copyImg from '../assets/copy.svg';
// import '../styles/room-code.scss';

type roomCodeProps = {
  code: string;
}

export function RoomCode(props: roomCodeProps) {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    // <button className="room-code" onClick={copyRoomCodeToClipboard} >
    //   <div>
    //     <img src={copyImg} alt="copiar" />
    //   </div>

    //   <span>{props.code} </span>
    // </button>
    
    <button className="flex items-between border border-purple rounded-md bg-white dark:bg-black-500"   onClick={copyRoomCodeToClipboard} >
      <div className="flex items-between">
      <div className=" flex items-center md:p-3 bg-purple">
        <img src={copyImg} alt="copy" />
      </div>

      <span className="flex items-center pl-3 pr-3 w-20 break-all  md:break-normal md:w-full md:overflow-clip dark:text-white" >
        { props.code }
      </span>
      </div>
    </button>

  )
}