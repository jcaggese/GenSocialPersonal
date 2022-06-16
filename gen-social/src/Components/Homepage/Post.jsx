import React from "react"

export default function Post(props) {
    //props will have a User, Message, and Time

    return (
        <div className='post'>
            <h4>{props.user}</h4>
            <p>{props.msg}</p>
            <div className="timestamp">
                <small>{props.time.toLocaleString()}</small>
            </div>
        </div>
    )
}