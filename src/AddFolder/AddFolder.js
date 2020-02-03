import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import config from '../config';
import ValidationError from '../ValidationError';
import './AddFolder.css';
import PropTypes from 'prop-types';

const Required = () => (
	<span className="requiredMark">*</span>
)

class AddFolder extends Component {
	static contextType = NoteContext;

	constructor(props) {
		super(props);
		this.state = {
			name: {
				value: '',
				touched: false
			}
		}
	}

	updateName(name) {
		this.setState({ name: { value: name, touched: true } });
	}

	handleCancel = () => {
		this.props.history.push('/');
	}

	handleSubmit = e => {
		e.preventDefault();
		const { name } = this.state;
		const folder = {
			folder_name: name.value
		}
		fetch(`${config.API_URL}/folders`, {
			method: 'POST',
			body: JSON.stringify(folder),
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
				this.context.addFolder(data);
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
		if (this.props.folders.find(f => f.folder_name === name)) {
			return 'Name of folder already exists';
		}
	}
	
  render() {
		const nameError = this.validateName();
    return (
			<section className="formBox">
				<h2 className="formTitle">Create a folder</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="formLine">
						<label htmlFor='name'>Folder name: <Required /></label>
						<input 
							type='text' 
							name='name' 
							id='name' 
							aria-required="true"
							onChange={e => this.updateName(e.target.value)} />
						{this.state.name.touched && <ValidationError message={nameError} />}
					</div>
					<div className="formLine">
						<button type='button' className="btn" onClick={this.handleCancel}>Cancel</button>
						{' '}
						<button type='submit' className="btn" disabled={nameError}>
							Save
						</button>
					</div>
				</form>
			</section>
    );
  }
}

AddFolder.propTypes = {
	folders: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default AddFolder;