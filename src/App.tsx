import './App.css';
import { Route, Routes, Navigate, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/posts'>Post List</Link>
          <Link to='/posts/:id'>Post Detail</Link>
          <Link to='/posts/new'>Post New</Link>
          <Link to='/posts/edit/:id'>Post Edit</Link>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>}></Route>
        <Route path='/posts' element={<h1>Post List Page</h1>}></Route>
        <Route path='/posts/:id' element={<h1>Post Detail Page</h1>}></Route>
        <Route path='/posts/new' element={<h1>Post New Page</h1>}></Route>
        <Route path='/posts/edit/:id' element={<h1>Post Edit Page</h1>}></Route>
        <Route path='/profile' element={<h1>Profile Page</h1>}></Route>
        <Route path='*' element={<Navigate replace to='/' />}></Route>
      </Routes>
    </>
  );
}

export default App;
