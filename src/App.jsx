// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Restaurant from './pages/Restaurant';
import Add from './pages/Add';
import Update from './pages/Update';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Layout from './components/Layout';
import Profile from './pages/Profile';
// import ProtectedRou from './pages/ProtectedRou';
import AdminRoute from './pages/AdminRoute';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Restaurant />} />
          <Route path='/add' element={<AdminRoute><Add /></AdminRoute>} />
          {/* 16 */}
          <Route path='/update/:id' element={<AdminRoute><Update /></AdminRoute>}  /> 
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
