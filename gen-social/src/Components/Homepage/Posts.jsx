import React from "react"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Post from './Post'

export default function Posts() {
    return (
        <div className='post-container container'>
            <div className='row'>
                <textarea className="new-post-box" placeholder="What's up?" rows="3" cols="100"></textarea>
            </div>
            <div className="row justify-content-end">
                <div className="justify-content-end d-flex">
                    <button className="btn btn-primary mt-1 me-4 px-5 w-10">Post</button>
                </div>
            </div>
            <Post user="Jake" msg="Hello. Test post!" time="Right Now!"/>
        </div>
    )
}