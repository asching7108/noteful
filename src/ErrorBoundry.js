import React, { Component } from 'react';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h3>Something went wrong. Please try again later.</h3>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundry;