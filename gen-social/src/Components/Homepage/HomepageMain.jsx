import React from 'react'
import Homepage from "./Homepage"
import HomepageNavbar from "./HomepageNavbar"

const HomepageMain = () => {
    return (
        <div className='homepageDiv'>
            <HomepageNavbar />
            <div className='homepageDiv'>
                <Homepage />
            </div>
        </div>
    )
}

export default HomepageMain;