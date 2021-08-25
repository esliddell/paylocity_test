//import logo from './logo.svg';
import './App.css';
import BenefitsDeductionCalculator from './components/BenefitsDeductionCalculator.jsx';
import Container from 'react-bootstrap/container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Container>
          <BenefitsDeductionCalculator />
          </Container>

      </header>
    </div>
  );
}

export default App;
