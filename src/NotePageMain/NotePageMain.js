import React, { Component } from 'react';

class NotePageMain extends Component {
	render() {
		const { note } = this.props;
		return (
			<>
				<div className="note">
					<h2>{note.name}</h2>
					<span>Data modified on {note.modified}</span>
				</div>
				<div className="noteContent">
					{note.content}
				</div>
      </>
		);
	}
}

export default NotePageMain;