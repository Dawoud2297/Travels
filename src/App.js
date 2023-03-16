import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import Home from './components/Home';

function App() {
  console.log(process.env.REACT_APP_TITLE)
  return (
    <div className="App">
     <Home/>
    </div>
  );
}

export default App;
