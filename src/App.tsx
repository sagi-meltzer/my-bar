import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Edit from './pages/edit';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <div className="App">
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route  path="/edit" element={<Edit/>}/>
        </Routes>
      </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
