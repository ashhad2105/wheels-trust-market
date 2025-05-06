
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthModalProvider } from '@/components/auth/AuthModalProvider';
import { AuthProvider } from '@/context/AuthContext';
import AppRoutes from '@/routes';

function App() {
  return (
    <Router>
      <AuthModalProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AuthModalProvider>
    </Router>
  );
}

export default App;
