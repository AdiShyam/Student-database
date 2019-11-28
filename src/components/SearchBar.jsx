import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    _handleChange = e => {
        const {value} = e.target
        this.setState ({value})
        this.props.searchTerm(value)
    }

    render() {
        return (
        
                <input className="search" 
                    name="search"
                    onChange={this._handleChange}
                    value = {this.state.value}
                />
        )
    }
}

export default SearchBar;
