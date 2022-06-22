import { React, useState, useEffect } from "react"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Post from './Post'
import axios from "axios";


export default function Posts() {

    const [postEls, setPostEls] = useState([])

    function handlePost() {
        try {
            axios.post(`http://localhost:9080/posts/${localStorage.getItem("loggedId")}`, {
                "text": document.getElementById("post-box").value
            }).then((response) => {
                if (response.status === 200) {
                    console.log("Posted!")
                }
                else{
                    console.log("found error");
                }
                createPosts()
            })
        }
        catch (err) {
            console.log("Error Posting")
        }
    };

    async function createPosts() {
        axios.get(`http://localhost:9080/posts`).then((response) => {
            if (response.status === 200) {
                console.log("Posts retrieved")
                let toShow = [localStorage.getItem("loggedUser")]
                console.log(toShow)
                const friends = localStorage.getItem("friends")
                console.log(friends)
                console.log(response.data);
                if (friends !== null)
                    toShow += friends.split(",")
                console.log(toShow.includes("Strawberry"))
                let el = []
                for (let i = 0, j = 0; i < response.data.length; i++) {
                    if (toShow.includes(response.data[i].user.username))
                        el[j++] = <Post key={response.data[i].postId} selectedPostId={response.data[i].postId} user={response.data[i].user.username} msg={response.data[i].text} 
                                    time={new Date(response.data[i].time)} />
                }
                setPostEls(el.reverse())
            }
        })
    }

    

    useEffect(() => {
        createPosts();
    }, []);

    return (
        <div className='post-container container'>
            <div className='row'>
                <textarea id="post-box" className="new-post-box" placeholder="What's up?" rows="3" cols="100"></textarea>
            </div>
            <div className="row justify-content-end">
                <div className="justify-content-end d-flex">
                    <button className="btn btn-primary mt-1 me-4 px-5 w-10" onClick={handlePost}>Post</button>
                </div>
            </div>
            {postEls}
        </div>
    )
}

