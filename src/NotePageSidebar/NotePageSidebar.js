import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import './NotePageSidebar.css';

class NotePageSidebar extends Component {
	static contextType = NoteContext;

	render() {
		const { notes, folders }= this.context;
		const note = notes.find(n => n.id === this.props.match.params.noteId);
		const folder = folders.find(f => f.id === note.folderId);
		return (
			<div className="navBox">
				<h2 className="folderName">{folder.name}</h2>
        <button type='button' className="btn returnBtn" onClick={() => this.props.history.goBack()}>
					Go Back
				</button>
      </div>
		);
	}
}

export default NotePageSidebar;