import { useState, useEffect } from 'react';
import { MainLayout } from './layouts';
import { Home, Careers, TeamPage, ServicesPage, ContactPage } from './pages';

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isContactPage = route === '#contact' || route === '#/contact' || window.location.pathname === '/contact';
  const isServicesPage = route === '#services' || route === '#/services' || window.location.pathname === '/services';
  const isTeamPage = route === '#team' || route === '#/team' || window.location.pathname === '/team';
  const isCareersPage = route === '#careers' || route === '#/careers' || window.location.pathname === '/careers';

  return (
    <MainLayout>
      {isContactPage ? (
        <ContactPage />
      ) : isServicesPage ? (
        <ServicesPage />
      ) : isTeamPage ? (
        <TeamPage />
      ) : isCareersPage ? (
        <Careers />
      ) : (
        <Home />
      )}
    </MainLayout>
  );
}

export default App;
