import React from "react"

export default function Post(props) {
    //props will have a User, Message, and Time

    return (
        <div className='post'>
            <p>{props.user}</p>
            <p>{props.msg}</p>
            <small>{props.time}</small>
        </div>
    )
}