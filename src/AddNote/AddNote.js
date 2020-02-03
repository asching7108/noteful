import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import config from '../config';
import ValidationError from '../ValidationError';
import './AddNote.css';

const Required = () => (
	<span className="requiredMark">*</span>
)

class AddNote extends Component {
	static contextType = NoteContext;

	constructor(props) {
		super(props);
		this.state = {
			name: {
				value: '',
				touched: false
			},
			folder: {
				value: '',
				touched: false
			},
			content: {
				value: ''
			}
		}
	}

	updateName(name) {
		this.setState({ name: {value: name, touched: true } });
	}

	updateFolder(folder) {
		this.setState({ folder: { value: folder, touched: true } });
	}

	updateContent(content) {
		this.setState({ content: { value: content } });
	}

	handleCancel = () => {
		this.props.history.goBack();
	}

	handleSubmit = e => {
		e.preventDefault();
		const { name, folder, content } = this.state;
		const note = {
			note_name: name.value,
			folder_id: folder.value,
			content: content.value,
			date_modified: new Date().toISOString()
		}
		fetch(`${config.API_URL}/notes`, {
			method: 'POST',
			body: JSON.stringify(note),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(error => {
						throw error;
					})
				}
				return res.json();
			})
			.then(data => {
				this.context.addNote(data);
				this.props.history.push('/');
			})
			.catch(error => {

			})
	}

	validateName() {
		const name = this.state.name.value.trim();
		if (name.length === 0) {
			return 'Name is required';
		}
		if (this.context.notes.find(n => n.name === name)) {
			return 'Name of note already exists';
		}
	}

	validateFolder() {
		const folder = this.state.folder.value;
		if (!folder || folder === '0') {
			return 'Folder is required'
		}
	}
	
  render() {
		const { folders } = this.context;
		const nameError = this.validateName();
		const folderError = this.validateFolder();
    return (
			<section className="formBox">
				<h2 className="formTitle">Create a note</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="formLine">
						<label htmlFor='name'>Note name: <Required /></label>
						<input 
							type='text' 
							name='name' 
							id='name' 
							aria-required="true"
							onChange={e => this.updateName(e.target.value)} />
						{this.state.name.touched && <ValidationError message={nameError}/>}
					</div>
					<div className="formLine">
						<label htmlFor='folder'>Folder: <Required /></label>
						<select 
							name='folder' 
							id='folder' 
							aria-required="true"
							onChange={e => this.updateFolder(e.target.value)}>
							<option value='0'>Select a folder</option>
							{folders.map(f => 
								<option key={f.id} value={f.id}>{f.folder_name}</option>
							)}
						</select>
						{this.state.folder.touched && <ValidationError message={folderError}/>}
					</div>
					<div className="formLine">
						<label htmlFor='content'>Note content: </label>
						<textarea 
							name='content' 
							id='content'
							onChange={e => this.updateContent(e.target.value)} />
					</div>
					<div className="formLine">
						<button type='button' className="btn" onClick={this.handleCancel}>Cancel</button>
						{' '}
						<button type='submit' className="btn" disabled={nameError || folderError}>
							Save
						</button>
					</div>
				</form>
			</section>
    );
  }
}

export default AddNote;