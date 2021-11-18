import React, { useState } from "react";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './LinkBox.css';

/**
 * Displays a link and provides control elements to move, delete it.
 * For marketplace listings it also provides inputs to change the title.
 */
const LinkBox = ({ 
    boxId, box, handleBoxContentChange, section, handleDrag, handleDrop, handleMoveUp, 
    handleMoveDown, handleDelete, upActive, downActive 
}) => {
    
    /** State for item title (marketplace listings) */
    const [itemTitle, setItemTitle] = useState(box.itemTitle);

    /** Handles change of title, also trigger update of box state */
    const handleTitleChange = (event) => {
        setItemTitle(event.target.value);

        let newbox = box;
        newbox.itemTitle = event.target.value;
        handleBoxContentChange(newbox)
    }

    /** State for expansion of LinkBox*/
    const [expanded, setExpanded] = useState(box.expanded);
    /** Handles expansion of LinkBox */
    const handleExpand = () => {
        const exp = !expanded;
        setExpanded(exp);

        let newbox = box;
        newbox.expanded = exp;
        handleBoxContentChange(newbox)
    }

    /**
     * Generic rendering of a LinkBox only displaying the URL.
     * Used for Spotlights and enterprise profiles.
     * @param {*} url url to display
     * @returns rendered LinkBox
     */
    const renderUrlOnly = (url) => {
        return (
            <div>
                <div className="linkbox_grid"
                    draggable={true}
                    id={boxId}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="up_arrow">
                        <span className={upActive ? "arrow_active" : "arrow_inactive"} onClick={() => handleMoveUp(boxId)}>
                            <ArrowUpwardIcon />
                        </span>
                    </div>
                    <div className="down_arrow">
                        <span className={downActive ? "arrow_active" : "arrow_inactive"} onClick={() => handleMoveDown(boxId)}>
                            <ArrowDownwardIcon />
                        </span>
                    </div>
                    <div className="link_container">
                        <div className="lb-link">
                            {url}
                        </div>
                    </div>
                    <div className="delete_container" onClick={() => handleDelete(boxId)} >
                        <DeleteForeverIcon />
                    </div>
                </div>
            </div>
        );
    };

    /** Renders spotlight LinkBoxes */
    const renderSpotlight = () => {
        return renderUrlOnly(box.itemURL);
    };

     /** Renders enterprise LinkBoxes */
    const renderEnterprise = () => {
        return renderUrlOnly(box.enterpriseURL);
    };

     /** Renders marketplace LinkBoxes */
    const renderMarketplaceListing = () => {
        return (
            <div>
                <div className="linkbox_grid"
                    draggable={true}
                    id={boxId}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="up_arrow">
                        <span className={upActive ? "arrow_active" : "arrow_inactive"} onClick={() => handleMoveUp(boxId)}>
                            <ArrowUpwardIcon />
                        </span>
                    </div>
                    <div className="down_arrow">
                        <span className={downActive ? "arrow_active" : "arrow_inactive"} onClick={() => handleMoveDown(boxId)}>
                            <ArrowDownwardIcon />
                        </span>
                    </div>
                    <div className="link_container">

                        <div className="lb-link">
                            {box.itemURL}
                        </div>
                        <div className="lb-expand">
                        {expanded
                            ? <ExpandLessIcon onClick={()=> { handleExpand() } }/>
                            : <ExpandMoreIcon onClick={()=> { handleExpand() } }/>
                        }
                        </div>
                        {expanded &&
                            <div className="lb-details">
                                <fieldset>
                                <legend style={{"color":"green"}}>Edit Details</legend>
                                    <div style={{"marginTop":"10px"}}>
                                        <label htmlFor="lb-title">Title: </label>
                                        <input type="text" id="lb-title" value={itemTitle} onChange={handleTitleChange} style={{"height":"25px","width":"300px"}}></input>
                                    </div>
                                </fieldset>
                            </div>
                        }
                    </div>
                    <div className="delete_container" onClick={() => handleDelete(boxId)} >
                        <DeleteForeverIcon />
                    </div>
                </div>
            </div>
        );
    };

    let ret;
    // section handling logic
    switch (section) {
        case "spotlights": {
            ret = renderSpotlight();
            break;
        }
        case "enterprises": {
            ret = renderEnterprise();
            break;
        }
        case "marketplace listings": {
            ret = renderMarketplaceListing();
            break;
        }
        default: throw Error("invalid section in LinkBox: " + section);
    }

    return ret;
};

export default LinkBox;