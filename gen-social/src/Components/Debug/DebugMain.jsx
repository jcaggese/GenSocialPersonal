import React from "react";
import Debug from "./Debug"
import DebugHeader from "./DebugHeader"
import DebugFooter from "./DebugFooter"

const DebugMain = () => {
    return (
        <div className="debugDiv">
            <div>
            <DebugHeader />
            <Debug />
            </div>
            <DebugFooter />
        </div>
    )
};

export default DebugMain;