
import Header from './components/Header';
import Home from './components/Home';
import { ToasterContainer } from './components/Toaster';

function App() {
  return (
    <>
      <Header />
      <Home />
      <ToasterContainer /> {/* Add this */}
    </>
  );
}

export default App;
