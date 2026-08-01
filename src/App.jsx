import { useState, useEffect } from 'react';
import { MainLayout } from './layouts';
import { Home, Careers } from './pages';

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isCareersPage = route === '#careers' || route === '#/careers' || window.location.pathname === '/careers';

  return (
    <MainLayout>
      {isCareersPage ? <Careers /> : <Home />}
    </MainLayout>
  );
}

export default App;
