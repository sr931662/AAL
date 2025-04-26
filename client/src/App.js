import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/HomePage/Home';
import Login from './Components/LoginPage/Login';
import Footer from './Components/Footer/Footer';
import About from './Components/about/About';
import Adopt from './Components/AdoptPage/Adopt';
import Caretips from './Components/caretips/caretips';
import SignupForm from './Components/SignupPage/SignupForm';
import Logout from './Components/LoginPage/Logout';
import AddPet from './Components/AdoptPage/AddPets/addpet';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../src/store/auth'; // Assuming you have an AuthContext
import PetDetailPage from './Components/AdoptPage/petcards/petDetailPage';

const useScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);
};

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route exact path="/" element={<Home_page />} />
        <Route exact path="/about-us" element={<About_page />} />
        <Route exact path="/adopt" element={<Adopt_page />} />
        <Route exact path="/care-tips" element={<Caretips_page />} />
        <Route exact path="/sign-up" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/adopt/add-pet" element={<AddPet />} />
        <Route exact path="/pets/:id" element={<PetDetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const Home_page = () => { useScrollToTop(); return <Home />; }
const Caretips_page = () => { useScrollToTop(); return <Caretips />; }
const Adopt_page = () => { useScrollToTop(); return <Adopt />; }
const About_page = () => { useScrollToTop(); return <About />; }
const LoginPage = () => { useScrollToTop(); return <Login />; }
const SignupPage = () => { useScrollToTop(); return <SignupForm />; }

export default App;
