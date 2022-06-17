import { React, useEffect, useState } from "react"
import EditPostsPopup from "./EditPostsPopup"
import axios from "axios"
import Posts from "./Posts"

export default function Post(props) {
    //props will have a User, Message, and Time

    const [isOpen, setIsOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [toDelete, setToDelete] = useState(false)


    const handleIsOpen = () => {
        console.log("this is update on handleIsOpen: " + update);
        console.log("this is toDelete on handleIsOpen: " + toDelete);
        setIsOpen(!isOpen)
    }

    async function handlePost(e) {

        try {
            console.log("update in try of handle " + update);
            console.log("delete in try of handle " + toDelete);
            // If the update button is pressed
            if (update && !toDelete && e.target.id === "update-post") {
                // Shows the post we selected to edit's ID
                console.log({ props }.props.selectedPostId);
                console.log({ props }.props.user);

                // If the selected post's user is NOT the same as the user we're logged in as
                if (localStorage.getItem("loggedUser") !== { props }.props.user) {
                    console.log("Username of post does not match");
                }
                else {
                    // Send the change post request
                    axios.put(`http://localhost:9080/posts`, {
                        "text": document.getElementById("update-post-area").value,
                        "postId": { props }.props.selectedPostId
                    }).then((response) => {
                        if (response.status === 200) {
                            console.log("Updated!")
                        }
                    })
                    setIsOpen(!isOpen)
                    setUpdate(!update)
                    // Reloads webpage to show changed post
                    window.location.reload()
                }
            }
            // If the delete button is pressed
            if (!update & toDelete && e.target.id === "delete-post") {
                console.log("!update & toDelete");
                setToDelete(!toDelete)
                setUpdate(!update)
                console.log(toDelete);
                if (localStorage.getItem("loggedUser") !== { props }.props.user) {
                    console.log("Username of post does not match");
                }
                else {
                    try {
                        axios.delete(`http://localhost:9080/posts/${{ props }.props.selectedPostId}`)
                            .then((res) => {
                                console.log("Delete was successful")
                                window.location.reload();
                            })
                    } catch (error) {

                    }
                }
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const toggleUpdate = () => {
        setUpdate(true)
        setToDelete(false)
    }

    const toggleDelete = () => {
        setUpdate(false)
        setToDelete(true)
    }

    useEffect(() => {
        handlePost();
    }, []);

    return (
        <div className='post'>
            <button className="edit-icon" style={{ height: "20px", float: "right", backgroundColor: "yellow" }}>
                <small style={{ position: "relative", bottom: "7px", fontWeight: "bold", }} onClick={handleIsOpen}>...</small>
            </button>
            <h4>{props.user}</h4>
            <p>{props.msg}</p>
            <div className="timestamp">
                <small>{props.time.toLocaleString()}</small>
            </div>
            {isOpen && <EditPostsPopup
                content={
                    <>
                        <div>
                            <div>
                                <h1>Edit Post</h1>
                                <button onClick={toggleUpdate}>Toggle Update</button>
                            </div>
                            <div style={{ height: "auto" }}>
                                <div style={{ paddingTop: "10px" }}>
                                    <h3 style={{ color: "white" }}>What do you want the post to say?</h3>
                                </div>
                                <div style={{ paddingTop: "10px" }}>
                                    <textarea id="update-post-area" style={{ width: "98%", height: "200px" }}></textarea>
                                </div>
                            </div>
                            <button id="update-post" onClick={handlePost}>update</button>
                            <button onClick={handleIsOpen}>cancel</button>
                        </div>
                        <div>
                            <div style={{ paddingTop: "50px" }}>
                                <h1>Delete Post</h1>
                                <button onClick={toggleDelete}>Toggle Delete</button>
                            </div>
                            <div style={{ paddingTop: "20px" }}>
                                <button id="delete-post" onClick={handlePost}>delete</button>
                                <button onClick={handleIsOpen}>cancel</button>
                            </div>
                        </div>
                    </>}
            />

            }
        </div>
    )
}