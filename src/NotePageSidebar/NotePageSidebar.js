import React, { Component } from 'react';
import NoteContext from '../NoteContext';

class NotePageSidebar extends Component {
	static contextType = NoteContext;

	render() {
		const { notes, folders }= this.context;
		const note = notes.find(n => n.id === this.props.match.params.noteId);
		const folder = folders.find(f => f.id === note.folderId);
		return (
			<>
        <button type='button' onClick={() => this.props.history.goBack()}>
					Go back
				</button>
				<h2>{folder.name}</h2>
      </>
		);
	}
}

export default NotePageSidebar;