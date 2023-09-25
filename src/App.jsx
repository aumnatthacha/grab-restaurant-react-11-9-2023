// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Restaurant from './pages/Restaurant';
import Add from './pages/Add';
import Update from './pages/update';




function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <div className='App'>
        <Routes>
          <Route path='/' element={<Restaurant />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
