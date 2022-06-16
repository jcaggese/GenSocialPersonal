import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomepageNavbar from '../Homepage/HomepageNavbar';
import axios from 'axios';
import DeletePopUp from "./DeletePopUp"
import bcrypt from 'bcryptjs'

const Settings = () => {
    // Variables
    // Variables for what decision is made
    const [decision, setDecision] = useState(0);
    // Variables to store the new username
    const [newUsername, setNewUsername] = useState('');
    // Variables to store the current username
    const [currentUsername, setCurrentUsername] = useState('');
    // Variables to store the typed password
    const [password, setPassword] = useState('');
    // Variables to store the typed email
    const [email, setEmail] = useState('');
    // Variables to store the current email
    const [currentEmail, setCurrentEmail] = useState('');
    // Variables to store the new email
    const [newEmail, setNewEmail] = useState('');
    // Variables to store whethet popup is open or not
    const [isOpen, setIsOpen] = useState(false);
    // Variables for the error messages
    const [err, setError] = useState(0);
    // Variables for success messages
    const [success, setSuccess] = useState(0);

    // Navigation
    const history = useNavigate();
    const togglePopUp = () => {
        setIsOpen(!isOpen);
    }

    // Function to retrieve the email from the server
    const retrieveEmail = () => {
        // Retrieves the username from the local database and sets it to 'username' constant
        const username = localStorage.getItem("loggedUser")
        // Makes the call to the API to retrieve the user details
        axios.get("http://localhost:9080/users").then(res => {
            // Go through each piece in the array that the API returns
            res.data.forEach(data => {
                if (data.username === username) {
                    // Sets the local email variable to what the email is in the database
                    setEmail(data.email)
                }
            })
        }
        ).catch(err => {
            console.log(err)
        })

        return (
            email
        )
    }
    // Validate the fields
    const validate = (e) => {
        var hashedPassword;
        var passwordsMatch;
        if (e.target.id === 'changeUserBtn' || e.target.className === "new-username-input") {
            if (currentUsername !== localStorage.getItem("loggedUser")) {
                setError(1)
            }
            else {
                setError(0)
                console.log("works");
                updateUsername();
            }
        }
        else {
            axios.post(`http://localhost:9080/users/`, {
                username: currentUsername
            }).then((res) => {
                hashedPassword = bcrypt.hashSync(password, res.data.salt)

                passwordsMatch = hashedPassword === "$" + res.data.password
                // Username and Password is correct
                if (passwordsMatch) {
                    console.log("Correct password");
                    setError(0)
                    togglePopUp();
                }
                // Password is incorrect
                else {
                    console.log("Passwords don't match");
                    setError(2)
                }
            }).catch(err => {
                if (err.response.status === 404) {
                    console.log("Username incorrect");
                    setError(1)
                }
            })
        }
    }
    // Function to change the username in the server
    const updateUsername = () => {
        console.log(currentUsername);
        console.log(newUsername);

        // If the user types their current username as something different than they logged in with
        if (currentUsername !== localStorage.getItem("loggedUser")) {
            // Tell the user they're wrong
            console.log("Current usernames do not match!");
        }
        // If the user types their current username and it matches what they logged in with
        else {
            console.log("Current usernames match!");
            // If the user types a new username and it matches their current username
            if (newUsername === currentUsername) {
                // Lettem know
                console.log("New username matches current username")
            }
            // If the user types a new username and it DOES NOT match their current username
            else {
                axios.put("http://localhost:9080/users", {
                    username: currentUsername,
                    update: newUsername
                }).then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        localStorage.setItem("loggedUser", newUsername)
                        console.log("Username has successfully been updated!");
                        setSuccess(1)
                    }
                    else {
                        console.log("Oopsies! There was an error");
                    }
                });
                console.log("New username does not match current username");
            }
        }
    }
    // Function to handle updating the email
    const updateEmail = async () => {
        console.log(currentEmail);
        console.log(newEmail);
        // Stores current username to update email in database

        if (newEmail === '') {
            console.log("New email field is blank ");
            setSuccess(0)
            setError(3)
            return;
        }

        if (currentEmail !== localStorage.getItem("loggedEmail")) {
            console.log("Current email does not match the email on file");
            setSuccess(0)
            setError(4)
        }
        else {
            console.log("Current email matches the email on file");
            if (newEmail === currentEmail) {
                console.log("New email matches current email");
                setSuccess(0)
                setError(5)
            }
            else {
                console.log("New email does NOT match current email");
                axios.put("http://localhost:9080/users", {
                    email: newEmail,
                    username: localStorage.getItem("loggedUser")
                })
                    .then((res) => {
                        // If the email updated
                        if (res.status === 200) {
                            console.log("Email has been successfully updated!");
                            localStorage.setItem("loggedEmail", newEmail)
                            setSuccess(2)
                        }
                        // If the email didn't update
                        else {
                            console.log("Oopsies! There was an error!");
                            setSuccess(0)
                            setError(6)
                        }
                    })
            }
        }
    }
    // Function to delete the account
    const deleteAccount = (usernameToDelete, deletePassword) => {
        var hashedPassword;
        var passwordsMatch;
        usernameToDelete = currentUsername;
        // Check if the username field is empty
        if (usernameToDelete === '') {
            console.log("Username field is empty");
        }
        // If the username field is NOT empty
        else {
            // If the written username doesn't match the logged username
            if (usernameToDelete !== localStorage.getItem("loggedUser")) {
                console.log("Username does not match current user");
            }
            // If the written username DOES match the logged username
            else {
                // Password logic
                axios.post(`http://localhost:9080/users/`, {
                    username: usernameToDelete
                }).then((res) => {
                    hashedPassword = bcrypt.hashSync(password, res.data.salt)

                    passwordsMatch = hashedPassword === "$" + res.data.password
                    // Username and Password is correct
                    if (passwordsMatch) {
                        console.log("Correct password");
                        axios.delete(`http://localhost:9080/users`, {
                            data: {
                                username: usernameToDelete
                            }
                        })
                            .then((res) => {
                                console.log(res);
                                console.log(res.data);
                            }).catch(err => {
                                console.log(err);
                            })
                    }
                    // Password is incorrect
                    else {
                        console.log("Passwords don't match");
                    }
                }).catch(err => {
                    // Username is incorrect
                    if (err.response.status === 404) {
                        console.log("User not found")
                    }
                    else {
                        console.log("error");
                    }
                });
                console.log("Username matches current user");
            }
        }
    }

    // Function to handle which key is pressed
    const handleKeyPress = e => {
        console.log(e.target.className);
        if (e.keyCode === 13 && e.target.className === "new-username-input") {
            validate(e);
        }
        if (e.keyCode === 13 && e.target.className === "new-email-input") {
            validate();
        }
    }
    // Function to handle the new username
    const handleNewUsername = (e) => {
        setNewUsername(e.target.value)
    }
    // Function to handle the current username
    const handleCurrentUsername = (e) => {
        setCurrentUsername(e.target.value)
    }
    // Function to handle current email
    const handleCurrentEmail = (e) => {
        setCurrentEmail(e.target.value)
    }
    // Function to handle new email
    const handleNewEmail = (e) => {
        setNewEmail(e.target.value)
    }
    // Function to handle password
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    // Switch the browser to the login page
    const goToHome = async () => {
        await deleteAccount();
        history('/');
    }

    // Function to display error messages
    const errorMessage = () => {
        // Shows that the username is incorrect
        if (err === 1) {
            return (
                <small style={{ display: err ? '' : 'none', color: "black" }}>Username is incorrect</small>
            );
        }
        // Shows that the password is incorrect
        if (err === 2) {
            return (
                <small style={{ display: err ? '' : 'none', color: "black" }}>Password is incorrect</small>
            );
        }
        // The new email field is empty
        if (err === 3) {
            return (
                <small style={{ display: err ? '' : 'none', color: "black" }}>New email is empty</small>
            );
        }
        // Current email doesn't match database
        if (err === 4) {
            return (
                <small style={{ display: err ? '' : 'none', color: "black" }}>Current email does not match the one on file</small>
            );
        }
        // New email is the same as current email
        if (err === 5) {
            return (
                <small style={{ display: err ? '' : 'none', color: "black" }}>New email matches current email</small>
            );
        }
        // If none of these errors happen, I don't really know what even went on. Congratulations, you broke it.
        if (err === 6) {
            return (
                <small style={{ display: err ? '' : 'none', color: "black" }}>Honestly, I don't even know what happened. Try again</small>
            );
        }
    }
    // Function to display success messages
    const successMessage = () => {
        // Username is successfully updates
        if (success === 1) {
            return (
                <h1>Username successfully updated!</h1>
            )
        }
        // Email is successfully updated
        if (success === 2) {
            return (
                <h1>Email successfully updated!</h1>
            )
        }
    }
    // Show the settings page
    const showSettingsMain = () => {
        // If the decision is to see the main setting screen
        if (decision === 0) {
            return (
                <div>
                    <div>
                        <HomepageNavbar />
                    </div>
                    <div className='settings'>
                        <h1 className='here'> Account Settings</h1>
                        <div className='container-fluid' style={{ display: "flex", flexwrap: "row" }}>
                            <div className='settings-account' style={{ border: "solid black 5px", width: "300px", height: "200px", aligncontent: "center" }}>
                                <h2 className='settings-account-picture'>{localStorage.getItem("loggedUser")}</h2>
                            </div>
                            <div className='container-fluid-buttons' style={{ width: "1400px", border: "solid black 5px", backgroundColor: "#2E8BC0", textAlign: "center" }}>
                                <div>
                                    <button id="show-details" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Account Details</button>
                                </div>
                                <div>
                                    <button id="change-username" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Change Username</button>
                                </div>
                                <div>
                                    <button id="change-password" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Change Password "NOT DONE"</button>
                                </div>
                                <div>
                                    <button id="change-email" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Change Email</button>
                                </div>
                                <div>
                                    <button id="delete-account" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Delete Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // User decides to see account details
        else if (decision === 1) {
            return (
                <div>
                    <div>
                        <HomepageNavbar />
                    </div>
                    <div className='settings'>
                        <h1 className='here'> Account Settings</h1>
                        <div className='container-fluid' style={{ display: "flex", flexwrap: "row" }}>
                            <div className='settings-account' style={{ border: "solid black 5px", width: "300px", height: "200px", aligncontent: "center" }}>
                                <h2 className='settings-account-picture'>{localStorage.getItem("loggedUser")}</h2>
                            </div>
                            <div className='container-fluid' style={{ width: "1400px", border: "solid black 5px", backgroundColor: "#2E8BC0", textAlign: "center" }}>
                                <div id="accountDetailsDiv">
                                    <div>
                                        <h2 style={{ color: "black", textDecoration: "underline" }}>Username</h2>
                                        <h3 style={{ color: "white" }}>{localStorage.getItem("loggedUser")}</h3>
                                    </div>
                                    <div>
                                        <h2 style={{ color: "black", textDecoration: "underline" }}>Email</h2>
                                        <h3 style={{ color: "white" }}>{retrieveEmail()}</h3>
                                    </div>
                                </div>
                                <div className='change-username-div'>
                                    <button id="show-main" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Show Main Settings</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // User decides to change username
        else if (decision === 2) {
            return (
                <div>
                    <div>
                        <HomepageNavbar />
                    </div>
                    <div className='settings'>
                        <h1 className='here'> Account Settings</h1>
                        <div className='container-fluid' style={{ display: "flex", flexwrap: "row" }}>
                            <div className='settings-account' style={{ border: "solid black 5px", width: "300px", height: "200px", aligncontent: "center" }}>
                                <h2 className='settings-account-picture'>{localStorage.getItem("loggedUser")}</h2>
                            </div>
                            <div className='container-fluid' style={{ width: "1400px", border: "solid black 5px", backgroundColor: "#2E8BC0", textAlign: "center" }}>
                                <div id="changeUsernameDiv">
                                    <label htmlFor='currentUsername' className='form-label' style={{ fontSize: "26px" }}>Current Username:</label>
                                    <input onChange={handleCurrentUsername} style={{ marginLeft: "10px" }} type="text" className='change-username-input' placeholder='Please type current username here'></input>
                                </div>
                                <div id="changeUsernameDiv">
                                    <label htmlFor='newUsername' className='form-label' style={{ fontSize: "26px" }}>New Username:</label>
                                    <input onChange={handleNewUsername} onKeyDown={handleKeyPress} style={{ marginLeft: "10px" }} type="text" className='new-username-input' placeholder='Please type desired username here'></input>
                                </div>
                                <small> {errorMessage()}</small>
                                <small>{successMessage()}</small>
                                <div className='change-username-div'>
                                    <div>
                                        <button style={{ backgroundColor: "red", margin: "10px" }} id="changeUserBtn" onClick={validate} className='btn btn-primary mb-1'>Change Username</button>
                                    </div>
                                    <button id="show-main" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Show Main Settings</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // User decides to change password
        else if (decision === 3) {
            return (
                <div>
                    <div>
                        <HomepageNavbar />
                    </div>
                    <div className='settings'>
                        <h1 className='here'> Account Settings</h1>
                        <div className='container-fluid' style={{ display: "flex", flexwrap: "row" }}>
                            <div className='settings-account' style={{ border: "solid black 5px", width: "300px", height: "200px", aligncontent: "center" }}>
                                <h2 className='settings-account-picture'>{localStorage.getItem("loggedUser")}</h2>
                            </div>
                            <div className='container-fluid' style={{ width: "1400px", border: "solid black 5px", backgroundColor: "#2E8BC0", textAlign: "center" }}>
                                <div id="changeUsernameDiv">
                                    <div>
                                        <label htmlFor='currentPassword' className='form-label' style={{ fontSize: "26px" }}>Current Password:</label>
                                        <input style={{ marginLeft: "10px", width: "265px" }} type="password" className='change-password-input' placeholder='Please type current password here'></input>
                                    </div>
                                    <div>
                                        <label htmlFor='newPassword' className='form-label' style={{ fontSize: "26px" }}>New Password:</label>
                                        <input style={{ marginLeft: "10px", width: "265px" }} type="password" className='change-password-input' placeholder='Please type desired password here'></input>
                                    </div>
                                    <div>
                                        <label htmlFor='confirmPassword' className='form-label' style={{ fontSize: "26px" }}>Confirm Password:</label>
                                        <input style={{ marginLeft: "10px", width: "265px" }} type="password" className='confirm-password-input' placeholder='Please type desired password here'></input>
                                    </div>
                                </div>
                                <small> {errorMessage()}</small>
                                <small> {successMessage()}</small>
                                <div className='change-username-div'>
                                    <div>
                                        <button type="submit" style={{ backgroundColor: "red" }} className='btn btn-primary mb-1'>Submit</button>
                                    </div>
                                    <button id="show-main" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Show Main Settings</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // User decides to change email address
        else if (decision === 4) {
            return (
                <div>
                    <div>
                        <HomepageNavbar />
                    </div>
                    <div className='settings'>
                        <h1 className='here'> Account Settings</h1>
                        <div className='container-fluid' style={{ display: "flex", flexwrap: "row" }}>
                            <div className='settings-account' style={{ border: "solid black 5px", width: "300px", height: "200px", aligncontent: "center" }}>
                                <h2 className='settings-account-picture'>{localStorage.getItem("loggedUser")}</h2>
                            </div>
                            <div className='container-fluid' style={{ width: "1400px", border: "solid black 5px", backgroundColor: "#2E8BC0", textAlign: "center" }}>
                                <div id="changeUsernameDiv">
                                    <div>
                                        <label htmlFor='currentEmail' className='form-label' style={{ fontSize: "26px" }}>Current Email:</label>
                                        <input onChange={handleCurrentEmail} style={{ marginLeft: "10px", width: "230px" }} type="text" className='change-email-input' placeholder='Please type current email here'></input>
                                    </div>
                                    <div>
                                        <label htmlFor='newEmail' className='form-label' style={{ fontSize: "26px" }}>New Email:</label>
                                        <input onChange={handleNewEmail} onKeyDown={handleKeyPress} style={{ marginLeft: "10px", width: "210px" }} type="text" className='new-email-input' placeholder='Please type new email here'></input>
                                    </div>
                                </div>
                                <small> {errorMessage()}</small>
                                <small> {successMessage()}</small>
                                <div className='change-username-div'>
                                    <div>
                                        <button type="change-email" onClick={updateEmail} style={{ backgroundColor: "red" }} className='btn btn-primary mb-1'>Submit</button>
                                    </div>
                                    <button id="show-main" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Show Main Settings</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        // User decides to delete account
        else if (decision === 5) {
            return (
                <div>
                    <div>
                        <HomepageNavbar />
                    </div>
                    <div className='settings'>
                        <h1 className='here'> Account Settings</h1>
                        <div className='container-fluid' style={{ display: "flex", flexwrap: "row" }}>
                            <div className='settings-account' style={{ border: "solid black 5px", width: "300px", height: "200px", aligncontent: "center" }}>
                                <h2 className='settings-account-picture'>{localStorage.getItem("loggedUser")}</h2>
                            </div>
                            <div className='container-fluid' style={{ width: "1400px", border: "solid black 5px", backgroundColor: "#2E8BC0", textAlign: "center" }}>
                                <div id="changeUsernameDiv">
                                    <div>
                                        <label htmlFor='accountUsername' className='form-label' style={{ fontSize: "26px" }}>Username:</label>
                                        <input onChange={handleCurrentUsername} style={{ marginLeft: "10px", width: "230px" }} type="text" className='delete-username-input' placeholder='Please type username here'></input>
                                    </div>
                                    <div>
                                        <label htmlFor='accountPassword' className='form-label' style={{ fontSize: "26px" }}>Password:</label>
                                        <input onChange={handlePassword} style={{ marginLeft: "10px", width: "210px" }} type="password" className='delete-password-input' placeholder='Please type password here'></input>
                                    </div>
                                    <small>{errorMessage()}</small>
                                </div>
                                <div className='change-username-div'>
                                    <div>
                                        <button type="delete-account" onClick={validate} style={{ backgroundColor: "red" }} className='btn btn-primary mb-1'>Delete Account</button>
                                    </div>
                                    <button id="show-main" style={{ marginTop: "10px", backgroundColor: "black" }} onClick={handleDecision} className='btn btn-primary'>Show Main Settings</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isOpen && <DeletePopUp
                        content={<>
                            <b style={{ color: "white", fontSize: "20px" }}>Are you sure you want to delete your account?</b>
                            <div style={{ marginTop: "50px" }}>
                                <button id='confirmLogout' onClick={goToHome} style={{ width: "100px", height: "50px", backgroundColor: "white" }}>Yes</button>
                                <button id='cancelLogout' onClick={togglePopUp} style={{ width: "100px", height: "50px", marginLeft: "50px", backgroundColor: "white" }}>No</button>
                            </div>
                        </>}
                        handleClose={togglePopUp}
                    />}
                </div>
            )
        }
    };

    const handleDecision = (e) => {
        console.log(e.target.id);
        // User wants to go back to main settings
        if (e.target.id === "show-main") {
            setSuccess(0);
            setError(0);
            setDecision(0);
        }
        // User wants to see account details
        if (e.target.id === "show-details") {
            setDecision(1);
        }
        // User wants to change username
        if (e.target.id === "change-username") {
            setDecision(2);
            console.log(decision);
        }
        // User wants to change password
        if (e.target.id === "change-password") {
            setDecision(3);
            console.log(decision);
        }
        // User wants to change email
        if (e.target.id === "change-email") {
            setDecision(4);
            console.log(decision);
        }
        // User wants to delete account
        if (e.target.id === "delete-account") {
            setDecision(5);
            console.log(decision);
        }
    }


    return (
        showSettingsMain()
    )
}


export default Settings;