import React from "react";
import './PopUp.css';

/**
 * The PopUp component is used to show pop-ups.
 * E.g. used for confirmation and success messages.
 */
const PopUp = ({
    showPopUp,
    setShowPopUp,
    additionalClassInner,
    additionalClassPopUp,
    fetchInnerHtml
}) => {

    function isVisible() {
        return showPopUp? "": "hidden";
        // return "";
    }

    return (
        <div className='popup-backdrop' style={{visibility: isVisible()}} onClick={() => setShowPopUp(false)}>
            <div className={ "popup  " + additionalClassPopUp} onClick={(e)=> e.stopPropagation()}> {/* stop propagation of onClick behaviour to child elements */}
            <div className={ "popup_inner " + additionalClassInner}>
            {fetchInnerHtml()}
        </div>
        </div>
       </div>
        )
};

export default PopUp;
