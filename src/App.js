import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import MainPageMain from './MainPageMain/MainPageMain';
import NotePageMain from './NotePageMain/NotePageMain';
import MainPageSidebar from './MainPageSidebar/MainPageSidebar';
import NotePageSidebar from './NotePageSidebar/NotePageSidebar';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundry from './ErrorBoundry';
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

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ]
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ]
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
      <ErrorBoundry>
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
      </ErrorBoundry>
    );
  }

  renderMainRoutes() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };
    return (
      <NoteContext.Provider value={contextValue}>
        <>
          {['/', '/folder/:folderId'].map(path => 
            <ErrorBoundry key={path}>
              <Route 
                exact
                path={path}
                component={MainPageMain}
              />
            </ErrorBoundry>
          )}
          <ErrorBoundry>
            <Route path='/note/:noteId' component={NotePageMain} />
          </ErrorBoundry>
          <ErrorBoundry>
            <Route 
              path='/add-folder' 
              // practice propTypes
              render={routeProps => 
                <AddFolder {...routeProps} folders={this.state.folders} />}
              // component={AddFolder} 
            />
          </ErrorBoundry>
          <ErrorBoundry>
            <Route path='/add-note' component={AddNote} />
          </ErrorBoundry>
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