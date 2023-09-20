import './App.css'
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardPage from './components/Card/CardPage';
import Search from './components/Search/Search';
import CardsPage from './components/Card/CardsPage';
import Login from './components/User/Login';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/" element={<><Home /></>} >
        <Route path="/home" element={<><Home /></>} />
      </Route>
        <Route path="search" element={<><Search /></>} />
        <Route path="cards/:number" element={<><CardsPage /></>} />
        <Route path="card/:id" element={<><CardPage /></>} />
        <Route path="login" element={<><Login /></>} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}

export default App
