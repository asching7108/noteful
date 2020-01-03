import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import config from '../config';

class MainPageMain extends Component {
	static contextType = NoteContext;

	deleteNote(noteId, cb) {
		fetch(`${config.API_URL}/notes/${noteId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(e => Promise.reject(e))
				}
				return res.json();
			})
			.then(() => {
				cb(noteId);
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		const { notes, deleteNote } = this.context;
		const folderId = this.props.match.params.folderId;
		const notesForFolder = notes.filter(n => n.folderId === folderId);  
		const noteList = notesForFolder.length > 0
			? notesForFolder 
			: notes;
		return (
			<NoteContext.Consumer>
				{(context) => (
					<>
						{noteList.map(note => 
							<div className="note" key={note.id}>
								<h2><Link to={`/note/${note.id}`}>{note.name}</Link></h2>
								<span>Data modified on {note.modified}</span>
								<button 
									type="button" 
									onClick={() => this.deleteNote(note.id, deleteNote)}
								>
									delete
								</button>
							</div>
						)}
					</>
				)}
			</NoteContext.Consumer>
		);
	}
}

export default MainPageMain;