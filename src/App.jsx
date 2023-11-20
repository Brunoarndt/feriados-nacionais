import './index.css';

import Header from './components/Header/Header.jsx';
import DataDisplay from './components/Display/DataDisplay.jsx';
import Footer from './components/Footer/Footer.jsx';

const App = () => {
  return (
    <div>
      <Header />
      <DataDisplay/>
      <Footer />
    </div>
  );
};

export default App;