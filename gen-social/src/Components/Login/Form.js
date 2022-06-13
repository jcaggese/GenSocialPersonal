import React from "react"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function Form() {
    return (
        <form action="">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <label for="name" className="form-label">Username:</label>
                        <input type="text" id="name" class="form-control" required />
                    </div>
                </div>
                <div class="row">
                    <div class="col">

                        <label for="email" className="form-label">Email Address:</label>
                        <input type="email" id="email" className="form-control" required />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="email" className="form-label">Password:</label>
                        <input type="password" id="password" className="form-control" required />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input type="submit" className="btn btn-primary float-end mb-1" id="submit-btn"/>
                    </div>
                </div>
            </div>
        </form>
    )
}