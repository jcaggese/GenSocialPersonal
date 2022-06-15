import React from "react"
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NavLink = styled(Link)`
color:white;
font-size: 17px;
&:hover {
    color: red;
}
`;

export default function Header() {
    return (
        <div className="footer">
            <NavLink to="/" className="link">HOME PAGE</NavLink>
        </div>
    )
}