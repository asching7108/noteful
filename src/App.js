import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import MainPageMain from './MainPageMain/MainPageMain';
import NotePageMain from './NotePageMain/NotePageMain';
import MainPageSidebar from './MainPageSidebar/MainPageSidebar';
import NotePageSidebar from './NotePageSidebar/NotePageSidebar';
import NoteContext from './NoteContext';
import config from './config';
import DATA from './data';

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(n => 
      n.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_URL}/folders`),
      fetch(`${config.API_URL}/notes`)
    ])
      .then(([foldersRes, notesRes]) => {
        if (!foldersRes.ok) {
          return foldersRes.json().then(e => Promise.reject(e));
        }
        if (!notesRes.ok) {
          return notesRes.json().then(e => Promise.reject(e));
        }
        return Promise.all([foldersRes.json(), notesRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({
          folders,
          notes
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderNavRoutes() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes
    };
    return (
      <NoteContext.Provider value={contextValue}>
        <>
          {['/', '/folder/:folderId'].map(path => 
            <Route 
              exact
              key={path}
              path={path}
              component={MainPageSidebar}
            />
          )}
          <Route path='/note/:noteId' component={NotePageSidebar} />
        </>
      </NoteContext.Provider>
    );
  }

  renderMainRoutes() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    };
    return (
      <NoteContext.Provider value={contextValue}>
        <>
          {['/', '/folder/:folderId'].map(path => 
            <Route 
              exact
              key={path}
              path={path}
              component={MainPageMain}
            />
          )}
          <Route path='/note/:noteId' component={NotePageMain} />
        </>
      </NoteContext.Provider>
    );
  }

	render() {
		return (
			<div className='App'>
        <header>
          <h1><Link to='/'>Noteful</Link></h1>
        </header>
        <nav>{this.renderNavRoutes()}</nav>
        <main>{this.renderMainRoutes()}</main>
			</div>
		);
	}
}

export default App;