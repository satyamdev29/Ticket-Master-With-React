import React from 'react' 
import axios from 'axios'
import { key } from './config/keys'

class TicketForm extends React.Component {
    constructor() {
        super() 
        this.state = {
            name: '', 
            department: '',
            priority: '',
            message: ''
           
        }
    }

    // handleNameChange = (e) => {
    //     const name = e.target.value 
    //     this.setState(() => ({ name }))
    // }

    // handleDeptChange = (e) => {
    //     const department = e.target.value 
    //     this.setState(() => ({ department }))
    // }

    // handlePriorityChange = (e) => {
    //     const priority = e.target.value 
    //     this.setState(() => ({ priority }))
    // }

    // handleMessageChange = (e) => {
    //     const message = e.target.value 
    //     this.setState(() => ({ message }))
    // }

    // having just one event handler for all your input fields, for this to work, every input field must* have the name prop , name prop need to match the value mentioned in your state 
    
    handleChange = (e) => {
        // console.log('name', e.target.name)
        // console.log('value', e.target.value)
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value 
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault() 
        const formData = {
            name: this.state.name, 
            department: this.state.department, 
            priority: this.state.priority,
            message: this.state.message
        }

        // api post 
        axios.post(`http://dct-api-data.herokuapp.com/tickets?api_key=${key}`, formData)
            .then(response => {
                this.props.handleSubmit(response.data)

                // clear the form, by resetting the state value 
                this.setState(() => ({ 
                    name: '', department: '', priority: '', message: ''
                }))

            })
            .catch(err => {
                console.log(err) 
            })
    }

    render(){
        return (
            <div>
                <h2>Add Ticket</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                            Name <br />
                            <input type="text" value={this.state.name} name="name" onChange={this.handleChange} className="form-control" />
                        </label> 
                    </div>
                
                    <div className="form-group">
                        <label>
                            Department<br />
                            <select value={this.state.department} onChange={this.handleChange} name="department" className="form-control">
                                <option value=""> Select </option>
                                <option value="technical"> Technical </option>
                                <option value="sales"> Sales </option>
                                <option value="hr"> Human Resource </option>
                            </select>
                        </label>
                    </div>
                     
                    <div className="form-group">
                        <label>
                            Priority<br /> 
                            <select value={this.state.priority} onChange={this.handleChange} name="priority" className="form-control">
                                <option value=""> Select </option>
                                <option value="high"> High </option>
                                <option value="medium"> Medium </option>
                                <option value="low"> Low </option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Message<br />
                            <textarea value={this.state.message} onChange={this.handleChange} name="message" className="form-control">

                            </textarea>
                        </label> 
                    </div>
                   
                    <input type="submit" value="Add Ticket" className="btn btn-primary" />

                </form> 
            </div>
        )
    }
}

export default TicketForm