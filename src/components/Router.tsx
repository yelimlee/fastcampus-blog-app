import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import PostList from '../pages/posts';
import PostDetail from '../pages/posts/detail';
import PostNew from '../pages/posts/new';
import PostEdit from '../pages/posts/edit';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
import ProfilePage from '../pages/profile';

interface RouterProps {
  isAuthenticated: boolean;
}
export default function Router({ isAuthenticated }: RouterProps) {
  // firbase Auth가 인증되었으면 true로 변경해주는 로직 추가
  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path='/' element={<Home />}></Route>
            <Route path='/posts' element={<PostList />}></Route>
            <Route path='/posts/:id' element={<PostDetail />}></Route>
            <Route path='/posts/new' element={<PostNew />}></Route>
            <Route path='/posts/edit/:id' element={<PostEdit />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
            <Route path='*' element={<Navigate replace to='/' />}></Route>
          </>
        ) : (
          <>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignupPage />}></Route>
            <Route path='*' element={<LoginPage />}></Route>
          </>
        )}
      </Routes>
    </>
  );
}
