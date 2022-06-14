import React from "react";
import Debug from "./Debug"
import DebugHeader from "./DebugHeader"

const DebugMain = () => {
    return (
        <div className="debugDiv">
            <DebugHeader />
            <Debug />
        </div>
    )
};

export default DebugMain;