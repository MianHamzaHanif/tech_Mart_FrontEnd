import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import ForgetPassword from './components/forgetPassword/forgetPassword';
import HomePage from './components/home/homePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/Home-Page" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
