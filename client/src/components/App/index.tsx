import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router
} from "react-router-dom";

import Routes from "../Routes";
import Header from "../Header";
import useNotes from "../../reduxHooks/useNotes";

const App: React.FC = () => {
  const {getNotesHandler} = useNotes();

  return (
    <div className="Notes">
      <Router>
        <CssBaseline />
        <Header />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
