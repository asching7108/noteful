import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import config from '../config';
import './NotePageMain.css';

class NotePageMain extends Component {
	static contextType = NoteContext;

	getDate(dateStr) {
		const date = new Date(dateStr);
		return date.toLocaleString('en-US', { dateStyle: 'medium' });
	}

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
		const note = notes.find(n => n.id === Number(this.props.match.params.noteId));
		return (
			<>
				<div className="note">
					<h2>{note.note_name}</h2>
					<span>Data modified on {this.getDate(note.date_modified)}</span>
				</div>
				<div className="noteContent">
					{note.content}
				</div>
				<button 
					className="btn deleteBtn"
					type="button" 
					onClick={() => this.deleteNote(note.id, deleteNote)}
				>
					Delete Note
				</button>
      </>
		);
	}
}

export default NotePageMain;