import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import ModelDetails from './pages/ModelDetailsPage';

// use <BrowserRouter basename="/uml-dataset-website"> for GitHub Pages

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/model/:name" element={<ModelDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
