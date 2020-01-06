import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router
} from "react-router-dom";

import Routes from "../Routes";
import Header from "../Header";
import useNotes from "../../reduxHooks/useNotes";

import {NoResultsText} from "./styles";

const App: React.FC = () => {
  const {notes, addNotesHandler} = useNotes();

  useEffect(() => {addNotesHandler()}, []);

  return (
    <div className="Notes">
      <Router>
        <CssBaseline />
        <Header />
        {
          notes.length ?
          <Routes /> :
          <NoResultsText>No notes, please add one</NoResultsText>
        }
      </Router>
    </div>
  );
}

export default App;
