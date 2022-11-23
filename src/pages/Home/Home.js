import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import "./Home.css"
import Game from "../Game/Game"


const Home = () => {
  let { id } = useParams()
  console.log(id)
  const Socket = useRef(null)
  const [board, setBoard] = useState([[1, 0, 2], [2, 2, 0], [1, 1, 0]])
  const [name, setName] = useState("")
  // const [lobby,setLobby] = useState([])
  const [page, setPage] = useState(0)
  const [err, setErr] = useState([false, ""])
  const [aband, setAband] = useState(0)
  const [endMs, setEndMs] = useState("")
  const [score, setScore] = useState([0, 0])
  const [chance, setChance] = useState([0, 0])
  function handleClick() {
    let pname
    if (name !== "") {
      pname = name
      if (id === undefined) {
        //"http://localhost:3000/createLobby"
        fetch("http://" + document.location.host.split(":")[0] + ":3000/createLobby")
          .then(data => data.json())
          .then((data) => {
            Socket.current = new WebSocket("ws://" + document.location.host.split(":")[0] + ":3000/ws?id=" + data.lobbyId)
            // Socket.current = new WebSocket("ws://localhost:3000/ws?id="+data.lobbyId)
            Socket.current.onopen = function(event) {
              console.log("connection Established")
              Socket.current.send(JSON.stringify({ m: "u", p: pname }))
              setPage(1)
              Socket.current.onmessage = handleMessage
            }
          })

      } else {
        Socket.current = new WebSocket("ws://" + document.location.host.split(":")[0] + ":3000/ws?id=" + id)
        // Socket.current = new WebSocket("ws://localhost:3000/ws?id="+id)
        Socket.current.onopen = function(event) {
          console.log("connection Established from link")
          Socket.current.send(JSON.stringify({ m: "u", p: name }))
          setPage(1)
          Socket.current.onmessage = handleMessage
        }
      }
    } else {
      setErr([true, "Please Enter Name"])
    }

    function handleMessage(event) {
      const msg = JSON.parse(event.data);
      console.log(msg)
      if (msg.msg == "gs") {
        setBoard(msg.payload)
        setPage(2)
      } else if (msg.msg == "s") {
        setBoard(msg.payload)
        setChance(msg.chance)
      } else if (msg.msg == "e") {
        setBoard(msg.payload)
        setEndMs(msg.rem)
        setScore(msg.scr)
      } else if (msg.msg == "f") {
        Socket.current.close()
        setPage(3)

      } else if (msg.msg == "nal") {
        Socket.current.close()
        setPage(4)

      } else if (msg.msg == "abd") {
        setAband(1)
      }
    }
  }

  function handleStart() {
    Socket.current.send(JSON.stringify({ m: "n" }))
  }

  function handleName(e) {
    setName(e.target.value)
  }
  console.log(page)
  if (page === 0) {
    return (
      <>
        <Navbar />
        <div className="homeRoomContainer">
          <input onChange={handleName} autoFocus="true" type="text" placeholder="Enter Player Name" value={name} className="homeRoomInput" />
          <button onClick={handleClick} className="homeRoomButton">Create Room</button>
          {err[0] ? <h3>{err[1]}</h3> : ""}
        </div>
      </>
    );
  } else if (page === 1) {
    return (
      <div className="lobbyContainer">
        <button onClick={handleStart}>Start Game</button>
      </div>
    );
  } else if (page == 2) {
    return (
      <Game chance={chance} pattern={board} ws={Socket.current} aband={aband} endMs={endMs} score={score} />
    );
  } else if (page == 3) {
    return (
      <>
        <Navbar />
        <h2>Room Is Full</h2>
      </>

    );
  } else if (page == 4) {
    return (
      <>
        <Navbar />
        <h2>Lobby is not available try another lobby.</h2>
      </>

    );
  }





}

export default Home;
