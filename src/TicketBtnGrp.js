import React from 'react' 

const TicketBtnGrp = (props) => {
    return(
        <div className="btn-group">
            <button onClick={() => {
                props.handleClick('all')
            }} className="btn btn-secondary btn-sm"> All </button>
            <button onClick={() => {
                props.handleClick('high')
            }} className="btn btn-secondary btn-sm"> High </button>
            <button onClick={() => {
                props.handleClick('medium')
            }} className="btn btn-secondary btn-sm"> Medium </button>
            <button onClick={() => {
                props.handleClick('low')
            }} className="btn btn-secondary btn-sm"> Low </button>
        </div> 
    )
}

export default TicketBtnGrp