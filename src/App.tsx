import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { PatientProvider } from './context/PatientContext';
import './styles/index.css';

const App: React.FC = () => (
  <PatientProvider>
    <Router>
      <AppRoutes />
    </Router>
  </PatientProvider>
);

export default App;
