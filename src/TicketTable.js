import React from 'react'

// function component 
const TicketTable = (props) => {
    return (
 
        <div>
            <table className="table table-hover table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th> Code </th>
                        <th> Name </th>
                        <th> Department </th>
                        <th> Priority </th>
                        <th> Message </th>
                        <th> Status </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.tickets.map(ticket => {
                            return (
                                <tr key={ticket.ticket_code}>
                                    <td> {ticket.ticket_code} </td>
                                    <td> {ticket.name} </td>
                                    <td> {ticket.department} </td>
                                    <td> {ticket.priority} </td>
                                    <td> {ticket.message} </td>
                                    <td> <input type="checkbox" checked={ticket.status === 'completed' ? true : false} onChange={() => {
                                        props.handleChecked(ticket)
                                    }}/> </td>
                                    <td> <button onClick={() => {
                                        const confirmDelete = window.confirm("Are you sure?")
                                        if(confirmDelete) {
                                            props.handleRemove(ticket)
                                        }
                                    }} className="btn btn-outline-danger">
                                            remove
                                         </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TicketTable