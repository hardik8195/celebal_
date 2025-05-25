import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import SubmissionDetails from './components/SubmissionDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/submission-success" element={<SubmissionDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;