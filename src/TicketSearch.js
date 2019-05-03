import React from 'react' 

class TicketSearch extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            search: '' 
        }
    }

    handleChange = (e) => {
        const search = e.target.value 
        this.setState(() => ({ search }))
        this.props.handleSearch(search)
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <input type="text" placeholder="search by code" value={this.state.search} onChange={this.handleChange} className="form-control" /> 
                    </div>
                </form>
            </div> 
        )
    }
}

export default TicketSearch