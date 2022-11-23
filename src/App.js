import './App.css';
import { Routes ,Route} from 'react-router-dom';
import Home from "./pages/Home/Home"
import Lobby from "./pages/Lobby/Lobby"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/:id" element={<Home/>}></Route>
      <Route path="/game/:id" element={<Lobby/>}></Route>
      {/* <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/create" element={<Create/>}></Route>
      <Route path="/editor" element={<Editor/>}></Route> */}
    </Routes>
  );
}

export default App;
