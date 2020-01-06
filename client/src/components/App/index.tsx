import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from "axios";
import {
  BrowserRouter as Router
} from "react-router-dom";

import Routes from "../Routes";
import useNotes from "../../reduxHooks/useNotes";

import {ENDPOINTS} from "../../constants";

const App: React.FC = () => {
  const {addNotesHandler} = useNotes();

  useEffect(() => {
    axios.get(ENDPOINTS.GET_NOTES).then(res => {
      const {data: notes} = res;
      addNotesHandler(notes);
    });
  }, []);

  return (
    <div className="Notes">
      <Router>
        <CssBaseline />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
