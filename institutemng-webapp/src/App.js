import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Teachers from './pages/Teachers';
import Subjects from './pages/Subjects';
import BreadCrumb from './components/BreadCrumb';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <BreadCrumb />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/students" component={Students} />
          <Route path="/classes" component={Classes} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/subjects" component={Subjects} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
