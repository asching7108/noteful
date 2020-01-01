import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import MainPageMain from './MainPageMain/MainPageMain';
import NotePageMain from './NotePageMain/NotePageMain';
import MainPageSidebar from './MainPageSidebar/MainPageSidebar';
import NotePageSidebar from './NotePageSidebar/NotePageSidebar';
import DATA from './data';

class App extends Component {
  state = {
    folders: DATA.folders,
    notes: DATA.notes
  }

	render() {
    const {folders, notes } = this.state;
		return (
			<div className='App'>
        <header>
          <h1><Link to='/'>Noteful</Link></h1>
        </header>
        <main>
          <aside id='sidebar'>
            <Route
              exact path='/'
              render={() => 
                <MainPageSidebar
                  folders={folders}
                />}
            />
            <Route
              path='/folder/:folderId'
              render={(routerProps) => 
                <MainPageSidebar
                  folders={[folders.find(f => f.id === routerProps.match.params.folderId)]}
                />}
            />
            <Route
              path='/note/:noteId'
              render={(routerProps) => {
                const note = notes.find(n => n.id === routerProps.match.params.noteId);
                return (
                  <NotePageSidebar
                  folder={folders.find(f => f.id === note.folderId)}
                  onClickBack={() => routerProps.history.goBack()}
                  />);
              }}
            />
          </aside>
          <section className="mainContent">
            <Route
              exact path='/'
              render={() => 
                <MainPageMain
                  notes={notes}
                />}
            />
            <Route
              path='/folder/:folderId'
              render={(routerProps) => 
                <MainPageMain
                  notes={notes.filter(n => n.folderId === routerProps.match.params.folderId)}
                />}
            />
            <Route
              path='/note/:noteId'
              render={(routerProps) => 
                <NotePageMain
                  note={notes.find(n => n.id === routerProps.match.params.noteId)}
                />}
            />
          </section>
        </main>
			</div>
		);
	}
}

export default App;