import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Teachers from './pages/Teachers';
import Subjects from './pages/Subjects';
import BreadCrumb from './components/BreadCrumb';
import Header from './components/Header';
import AllocateSubjectPage from './pages/AllocateSubjectPage';
import AllocateClassesPage from './pages/AllocateClassesPage';
import StudentReportPage from './pages/StudentReportPage';

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
          <Route path="/allocate-subject" component={AllocateSubjectPage} />
        <Route path="/allocate-classes" component={AllocateClassesPage} />
        <Route path="/student-report" component={StudentReportPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
