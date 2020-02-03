import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import config from '../config';
import './MainPageMain.css';

class MainPageMain extends Component {
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
				cb(noteId);
			})
			.catch(err => {
				console.log(err);
			})
	}

	render() {
		const { notes, deleteNote } = this.context;
		const folderId = Number(this.props.match.params.folderId);
		const notesToDisplay = folderId
			? notes.filter(n => n.folder_id === folderId)
			: notes;
		return (
			<NoteContext.Consumer>
				{(context) => (
					<>
						<div className="addNote">
							<Link to={'/add-note'} className="btn addNoteBtn">Add Note</Link>
						</div>
						{notesToDisplay.map(note => 
							<div className="note" key={note.id}>
								<h2><Link to={`/note/${note.id}`}>{note.note_name}</Link></h2>
								<span>Data modified on {this.getDate(note.date_modified)}</span>
								<button 
									className="btn deleteBtn"
									type="button" 
									onClick={() => this.deleteNote(note.id, deleteNote)}
								>
									Delete Note
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