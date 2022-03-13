import io from "socket.io-client";

const socket = io.connect("http://localhost:3010");

function App() {
  return <div className="App">Hello world!</div>;
}

export default App;
