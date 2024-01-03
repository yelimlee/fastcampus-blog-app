import { useEffect, useState } from 'react';
import Router from './components/Router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader';

function App() {
  const auth = getAuth(app);

  // auth를 체크하기 전에 (initalize 전)에는 loader를 띄어주는 용도
  const [init, setInit] = useState<boolean>(!!auth?.currentUser);

  // auth의 currentUser가 있으면 authenticated변경
  const [isAuthenticated, setAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </>
  );
}

export default App;
