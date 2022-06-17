import axios from 'axios';
import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import HomepageNavbar from '../Homepage/HomepageNavbar';
import FriendPopUp from "./FriendPopUp"

const Friends = () => {
    const location = useLocation

    useEffect(() => {
    }, [location]);
    // Consts for the friendUsername && setting
    const [friendUsername, setFriendUsername] = useState('');

    // Consts for the popup state && setting
    const [isOpen, setIsOpen] = useState(false);
    const [err, setError] = useState(0);
    const [success, setSuccess] = useState(0);
    const [showFriends, setShowFriends] = useState(false);

    // Function to handle opening and closing the popup box
    const togglePopUp = () => {
        getFriends();
        setFriendUsername('')
        setError(0)
        setSuccess(0)
        setIsOpen(!isOpen);
    }

    // Function to handle updating friendUsername when it is typed in the input box
    const handleFriendUsername = (e) => {
        setFriendUsername(e.target.value)
        console.log(friendUsername);
    }

    // Function for adding friends
    const addFriend = () => {
        var areFriends;
        // If the friendUsername is the same as the user
        if (friendUsername === localStorage.getItem("loggedUser")) {
            console.log("Narcissistic much?");
            setSuccess(0)
            setError(3)
            return;
        }
        // If the friendUsername field is empty
        if (friendUsername === '') {
            console.log("Friend Username is empty");
        }
        // If the user typed in a friend's username
        else {
            // Check if the user is already friends with the user they're trying to add
            axios.post("http://localhost:9080/users/", {
                username: localStorage.getItem("loggedUser")
            }).then((res) => {
                var friendsList;
                // Stores the user_ids in a list
                if (res.data.friends !== null) {
                    friendsList = res.data.friends.split(",");
                }
                console.log("This is friendsList: " + friendsList);
                // Find user_id of the friendUsername
                var friendId;
                axios.post("http://localhost:9080/users/", {
                    username: friendUsername
                }).then(res => {
                    friendId = res.data.id
                    console.log(friendId);
                }).then(f => {
                    if (res.data.friends !== null) {
                        friendsList.some(friend => {
                            return (
                                areFriends = parseInt(friend) === friendId
                            )
                        })
                    }
                }).then(f => {
                    // If the users are already friends
                    if (areFriends) {
                        console.log("Already friends");
                        setSuccess(0)
                        setError(2)
                    }
                    // If the users are not friends
                    else {
                        axios.put("http://localhost:9080/users", {
                            friend: friendUsername,
                            username: localStorage.getItem("loggedUser")
                        }).then(f => {
                            var tempStorage = localStorage.getItem("friends").split(",");
                            console.log(tempStorage);
                            if(tempStorage[0] === ""){
                                localStorage.setItem("friends", localStorage.getItem("friends") + friendUsername)
                                console.log("inside if(tempStorage[0]");
                            }
                            else{
                                localStorage.setItem("friends", localStorage.getItem("friends") + "," + friendUsername)
                            }
                            setError(0)
                            setSuccess(1)
                        })
                    }
                }).catch(err => {
                    console.log(err);
                    if (err.response.status === 404) {
                        console.log("That user doesn't exist!");
                        setError(1)
                    }
                })
            })
        }
    }

    // Function for deleteing friends
    const deleteFriend = () => {
        var areFriends;
        // If the friendUsername is the same as the user
        if (friendUsername === localStorage.getItem("loggedUser")) {
            setSuccess(0)
            setError(4)
            return;
        }
        // If the friendUsername field is empty
        if (friendUsername === '') {
            console.log("Friend Username is empty");
        }
        // If the user typed in a friend's username
        else {
            console.log("addFriend accessed");
            // Check if the user is already friends with the user they're trying to add
            axios.post("http://localhost:9080/users/", {
                username: localStorage.getItem("loggedUser")
            }).then((res) => {
                var friendsList;
                // Stores the user_ids in a list
                if (res.data.friends !== null) {
                    friendsList = res.data.friends.split(",");
                }
                // Find user_id of the friendUsername
                var friendId;
                axios.post("http://localhost:9080/users/", {
                    username: friendUsername
                }).then(res => {
                    friendId = res.data.id
                    console.log(friendId);
                }).then(f => {
                    if (res.data.friends !== null) {
                        friendsList.some(friend => {
                            return (
                                areFriends = parseInt(friend) === friendId
                            )
                        })
                    }
                }).then(f => {
                    // If the two users are friends
                    console.log(areFriends);
                    if (areFriends) {
                        console.log("friendUser: " + friendUsername);
                        axios.post("http://localhost:9080/users/delete", {
                            friend: friendUsername,
                            username: localStorage.getItem("loggedUser")
                        }).then(f => {
                            console.log(f);
                            var tempStorage = localStorage.getItem("friends").split(",");
                            localStorage.setItem("friends", tempStorage.filter(a => !a.match(friendUsername)))
                            setError(0)
                            setSuccess(2)
                        }).catch(err => {
                            console.log("failed");
                        })
                    }
                    else {
                        setSuccess(0)
                        setError(5)
                    }
                }).catch(err => {
                    console.log(err);
                    if (err.response.status === 404) {
                        console.log("That user doesn't exist!");
                        setError(1)
                    }
                })
            })
        }
    }

    // Function that's supposed to return all friends
    const getFriends = () => {
        var temp = []
        axios.post("http://localhost:9080/users/", {
            username: localStorage.getItem("loggedUser")
        }).then((res) => {
            var friendsList;
            // Stores the user_ids in a list
            if (res.data.friends !== null) {
                friendsList = res.data.friends.split(",");
            }

            axios.get("http://localhost:9080/users")
                .then(res => {
                    var i = 0;
                    console.log(res.data);
                    res.data.forEach(data => {
                        console.log("this is data.id: " + data.id);
                        friendsList.forEach(friend => {
                            if (data.id === parseInt(friend)) {
                                temp[i] = data.username
                                i++
                            }
                            console.log("this is temp: " + temp);
                        });
                    });
                    if (temp[0] === undefined) {
                        temp.splice(0, 1)
                    }
                    console.log("this is temp outside: " + temp);
                    localStorage.setItem("friends", temp)
                    console.log(localStorage.getItem("friends"));
                })
        });
    }


    const errorMessage = () => {
        // If friend username is not found
        if (err === 1) {
            return (
                <div className="error" style={{ display: err ? '' : 'none', }}>
                    <h1>That username does not exist! </h1>
                </div>
            );
        }
        if (err === 2) {
            return (
                <div className="error" style={{ display: err ? '' : 'none', }}>
                    <h1>You are already friends with that user! </h1>
                </div>
            );
        }
        if (err === 3) {
            return (
                <div className="error" style={{ display: err ? '' : 'none', }}>
                    <h1>You can't add yourself as a friend </h1>
                </div>
            );
        }
        if (err === 4) {
            return (
                <div className="error" style={{ display: err ? '' : 'none', }}>
                    <h1>Try 'Delete Account' in 'Settings' </h1>
                </div>
            );
        }
        if (err === 5) {
            return (
                <div className="error" style={{ display: err ? '' : 'none', }}>
                    <h1>You are not friends with that user </h1>
                </div>
            );
        }
    }

    const successMessage = () => {
        if (success === 1) {
            return (
                <div className="error" style={{ display: success ? '' : 'none', }}>
                    <h1>Friend added! </h1>
                </div>
            );
        }
        if (success === 2) {
            return (
                <div className="error" style={{ display: success ? '' : 'none', }}>
                    <h1>Friend deleted! </h1>
                </div>
            );
        }
    }

    const manageFriends = () => {
        setShowFriends(false)
        togglePopUp();
    }

    const renderFriends = () => {
        if (localStorage.getItem("friends") === "") {}
        else {
            return(
            localStorage.getItem("friends")
            )
        }
    }

    // Shows the friends page
    return (
        <div>
            <div>
                <HomepageNavbar />
            </div>
            <div className='friends'>
                <h1 className='here'> Friends</h1>
                <div className='container-fluid' style={{ display: "flex", flexwrap: "row" }}>
                    <div className='friends-account' style={{ border: "solid black 5px", width: "300px", height: "200px", aligncontent: "center" }}>
                        <h2 className='friends-account-picture'>{localStorage.getItem("loggedUser")}</h2>
                    </div>
                    <div className='container-fluid-friends' style={{ width: "1400px", border: "solid black 5px", backgroundColor: "#2E8BC0", textAlign: "center" }}>
                        <div>
                            <h1>Friends</h1>
                        </div>
                        <div style={{ padding: "auto" }}>
                            <b style={{ fontSize: "30px", color: "black" }}>{renderFriends()}</b>
                        </div>
                        <div style={{ padding: "auto" }}>
                            <button id='add-friend' onClick={manageFriends} className='btn btn-nav' style={{ margin: "10px", width: "auto" }}>Manage Friends</button>
                        </div>
                    </div>
                </div>
            </div>
            {   /* Shows the manage friends popup*/}
            {!showFriends && isOpen && <FriendPopUp
                content={<>
                    <b style={{ color: "white", fontSize: "30px" }}>Manage Friends</b>
                    <b>{errorMessage()}</b>
                    <b>{successMessage()}</b>
                    <div style={{ margin: "50px" }}>
                        <b style={{ color: "white", fontSize: "20px" }}>Friend Username: </b>
                        <input onChange={handleFriendUsername} type="text" style={{ marginLeft: "30px", width: "240px" }} placeholder="Please enter friend's username"></input>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <button id='confirmAdd' onClick={addFriend} style={{ width: "100px", height: "50px", backgroundColor: "white" }}>Add Friend</button>
                        <button id='delete' onClick={deleteFriend} style={{ width: "120px", height: "50px", marginLeft: "50px", backgroundColor: "white" }}>Delete Friend</button>
                        <button id='cancelAdd' onClick={togglePopUp} style={{ width: "100px", height: "50px", marginLeft: "50px", backgroundColor: "white" }}>Cancel</button>
                    </div>
                </>}
                handleClose={togglePopUp}
            />}
        </div>
    );
}

export default Friends;