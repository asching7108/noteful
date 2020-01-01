import React, { Component } from 'react';

class NotePageSidebar extends Component {
	render() {
		const { folder, onClickBack } = this.props;
		return (
			<>
        <button type='button' onClick={onClickBack}>
					Go back
				</button>
				<h2>{folder.name}</h2>
      </>
		);
	}
}

export default NotePageSidebar;