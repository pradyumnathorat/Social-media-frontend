
import './App.css';
import Post from './Components/Create Post/Post';
import Details from './Components/Details/Details';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post" element={<Post/>} />
          <Route path="/post/details/:id" element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
