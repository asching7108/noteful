import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainPageMain extends Component {
	render() {
		const { notes } = this.props;
		return (
			<>
				{notes.map(note => 
					<div className="note" key={note.id}>
						<h2><Link to={`/note/${note.id}`}>{note.name}</Link></h2>
						<span>Data modified on {note.modified}</span>
					</div>
				)}
			</>
		);
	}
}

export default MainPageMain;