import { HashRouter, Route, Routes } from 'react-router-dom'
import About from './components/About/About.tsx';
import Header from './components/Header/Header';
import Group from './components/Group/Group';
import MainPage from './components/MainPage/MainPage';
import NotFound from './components/NotFound.tsx';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/group/:id" element={<Group />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
