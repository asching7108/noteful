import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import config from '../config';

class NotePageMain extends Component {
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
				this.props.history.push('/');
				cb(noteId);
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		const { notes, deleteNote } = this.context;
		const note = notes.find(n => 
			n.id === this.props.match.params.noteId
		);
		return (
			<>
				<div className="note">
					<h2>{note.name}</h2>
					<span>Data modified on {note.modified}</span>
				</div>
				<div className="noteContent">
					{note.content}
				</div>
				<button 
					type="button" 
					onClick={() => this.deleteNote(note.id, deleteNote)}
				>
					delete
				</button>
      </>
		);
	}
}

export default NotePageMain;