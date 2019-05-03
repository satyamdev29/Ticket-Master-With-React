import React, { Component } from 'react';
import { key } from './config/keys'
import axios from 'axios' // npm install --save axios 

import TicketTable from './TicketTable'
import TicketForm from './TicketForm'
import TicketSearch from './TicketSearch'
import TicketBtnGrp from './TicketBtnGrp'

class App extends Component {
  constructor() {
    // console.log('constructor')
    super()
    this.state = {
      tickets: [],
      filteredTickets: []
    }
  }

  handleSubmit = (ticket) => {
    this.setState((prevState) => ({
      tickets: prevState.tickets.concat(ticket),
      filteredTickets: prevState.tickets.concat(ticket)
    }))
  }

  // life cycle method
  // componentWillMount() {
  //   console.log('component will mount')
  // }

  // life cycle method
  // will be called after the component is loaded on the browser
  componentDidMount() {
    // console.log('component did mount')
    // es6
   
    axios.get(`http://dct-api-data.herokuapp.com/tickets?api_key=${key}`)
      .then(response => this.setState(() => ({ 
          tickets: response.data, 
          filteredTickets: response.data 
        })
      ))
      .catch(err => console.log(err))

    // es5
    // axios.get(`http://dct-api-data.herokuapp.com/tickets?api_key=2a29bc147e9740fd`)
    //   .then(function(response){
    //     this.setState(function(){
    //       return {
    //         tickets: response.data
    //       }
    //     })
    //   })
    //   .catch(function(err){
    //     console.log(err)
    //   })
  }

  handleRemove = (ticket) => {
    axios.delete(`http://dct-api-data.herokuapp.com/tickets/${ticket.ticket_code}?api_key=${key}`)
      .then(response => {
        if(response.data.notice) {
          this.setState((prevState) => ({
            tickets: prevState.tickets.filter(ticketItem => ticketItem.ticket_code !== ticket.ticket_code), 
            filteredTickets: prevState.tickets.filter(ticketItem => ticketItem.ticket_code !== ticket.ticket_code)
          }))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChecked = (ticket) => {
    axios.put(`http://dct-api-data.herokuapp.com/tickets/${ticket.ticket_code}?api_key=${key}`, { 
      status : ticket.status === 'open' ? 'completed' : 'open'
    })
    .then(response => {
      this.setState((prevState) => ({
        tickets: prevState.tickets.map(ticketItem => {
          if(ticketItem.ticket_code === ticket.ticket_code){ 
            return Object.assign(ticketItem, response.data) 
          } else {
            return ticketItem
          }
        }), 
        filteredTickets: prevState.tickets.map(ticketItem => {
          if (ticketItem.ticket_code === ticket.ticket_code) {
            return Object.assign(ticketItem, response.data)
          } else {
            return ticketItem
          }
        })
      }))
    })
    .catch(err => {
      console.log(err) 
    })
  }

  handleSearch = (search) => {
    this.setState((prevState) => ({
      filteredTickets: prevState.tickets.filter(ticket => (ticket.ticket_code.toLowerCase().includes(search.toLowerCase())) || (ticket.name.toLowerCase().includes(search.toLowerCase())))
    }))
  }

  handleClick = (priority) => {
    if(priority === 'all') {
      this.setState((prevState) => ({
        // filteredTickets: [].concat(prevState.tickets)
        filteredTickets: [...prevState.tickets]
      }))
    } else {
      this.setState((prevState) => ({
        filteredTickets: prevState.tickets.filter(ticket => ticket.priority === priority)
      }))
    }
  }

  render() {
    return (
      <div>
        <h1>Ticket Master</h1>
        <h2>Listing Tickets - 
           <small>showing {this.state.filteredTickets.length} of { this.state.tickets.length} </small>
        </h2>
        {
          this.state.tickets.length === 0 ? (
            <p> No tickets found </p>
            ) :  (
              <div>
                <TicketSearch handleSearch={this.handleSearch} /> 
                <TicketBtnGrp handleClick={this.handleClick} />

                <TicketTable tickets={this.state.filteredTickets} ticketStatus="All" handleRemove={this.handleRemove} handleChecked={this.handleChecked} />
              </div>
            )
        }
      
        <TicketForm handleSubmit={this.handleSubmit} />

      </div>
    );
  }
}

export default App;
