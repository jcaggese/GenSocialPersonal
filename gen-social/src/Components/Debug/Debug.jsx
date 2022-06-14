import React from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

class Debug extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DataIsLoaded: false,
            id: '',
            username: '',
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        axios.get("http://localhost:9080/users").then(res => {
            console.log(res.data)
            this.setState({
                DataIsLoaded: true,
                id: res.data[0].id,
                username: res.data[0].username,
                email: res.data[0].email,
                password: res.data[0].password
            })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        const { DataIsLoaded, id, username, email, password } = this.state;
        if (!DataIsLoaded) return <div>
            <h1> Wait some time please!</h1>
        </div>;

        return (
            <div className="debugDiv">
                <div className="debugDiv">
                    <div className="row">
                        User Id: {id}
                    </div>
                    <div className="row">
                        Username: {username}
                    </div>
                    <div className="row">
                        Email: {email}
                    </div>
                    <div className="row">
                        Password: {password}
                    </div>
                </div>
            </div>
        )
    }
}

export default Debug;