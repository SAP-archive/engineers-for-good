import React, { useState } from "react";
import LinkBox from "./LinkBox";
import LinkInsert from "./LinkInsert";
import { v4 as uuidv4 } from 'uuid';
import isURL from 'validator/lib/isURL'
import '../NewsletterCreator/views/newsletterpreview.css';
import LinkValidationArea from "./LinkValidationArea";

/** Link Valdation white list */
let validator_options = {
    host_whitelist: ['goodmarket.global', 'www.goodmarket.global'],
}

/**
 * LinkManager is used to dispay, add & delete links and change link order
 */
const LinkManager = ({ boxes, setBoxes, handleFetch, section }) => {
    /** State for LinkInsert text area */
    const [textAreaContent, setTextAreaContent] = useState();
    /** State for dragging and dropping LinkBoxes to change order */
    const [dragId, setDragId] = useState();
    /** State for fetch progress */
    const [fetchingData, setFetchingData] = useState(false);
    /** State for validation area, holds error messages */
    const [validationAreaContent, setValidationAreaContent] = useState({
        invalideLines: [],
        duplicateLines: [],
        errorInfo: []
    });

    /** Sets the id of the currently dragged LinkBox in dragId state 
     * @param {*} ev mouse drag event
    */
    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };

    /** Handles dropping of a LinkBox, swaps dragged and dropped LinkBox 
     * @param {*} ev mouse drop event
    */
    const handleDrop = (ev) => {
        const dragBox = boxes.find((box) => box.id === dragId);
        const dropBox = boxes.find((box) => box.id === ev.currentTarget.id);

        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;

        const newBoxState = boxes.map((box) => {
            if (box.id === dragId) {
                box.order = dropBoxOrder;
            }
            if (box.id === ev.currentTarget.id) {
                box.order = dragBoxOrder;
            }
            return box;
        });

        setBoxes(newBoxState);
    };

    /** 
     * Handles click on the up-arrow of a LinkBox. 
     * Replaces the target LinkBox with the next higher ordered LinkBox. 
     * @param {*} boxId target box id
     */
    const handleMoveUp = (boxId) => {
        const moveUpBox = boxes.find((box) => box.id === boxId);
        if (moveUpBox.order !== 1) {
            const moveDownBox = boxes.find((box) => box.order === moveUpBox.order - 1);
            const newBoxState = boxes.map((box) => {
                if (box.id === moveUpBox.id) {
                    box.order--;
                }
                if (box.id === moveDownBox.id) {
                    box.order++;
                }
                return box;
            });

            setBoxes(newBoxState);
        }
    }

    /** 
     * Handles click on the up-arrow of a LinkBox. 
     * Replaces the target LinkBox with the next lower ordered LinkBox. 
     * @param {*} boxId target box id
     */
    const handleMoveDown = (boxId) => {
        const moveDownBox = boxes.find((box) => box.id === boxId);
        if (moveDownBox.order !== boxes.length) {
            const moveUpBox = boxes.find((box) => box.order === moveDownBox.order + 1);
            const newBoxState = boxes.map((box) => {
                if (box.id === moveUpBox.id) {
                    box.order--;
                }
                if (box.id === moveDownBox.id) {
                    box.order++;
                }
                return box;
            });

            setBoxes(newBoxState);
        }
    }

    /** 
     * Handles click on the delete button of a LinkBox. 
     * Deletes the target LinkBox.
     * @param {*} boxId target box id
     */
    const handleDelete = (boxId) => {
        const deleteBox = boxes.find((box) => box.id === boxId);
        const newBoxState = boxes.filter((box) => {
            return box.id !== deleteBox.id;
        }).map((box) => {
            if (box.order > deleteBox.order) {
                box.order--;
            }
            return box;
        });

        setBoxes(newBoxState);
    }

    /** Handles changes in the text area of LinkInsert 
     * @param {*} ev onChange event
    */
    const handleTextAreaChange = (ev) => {
        setTextAreaContent(ev.target.value);
    }

    /** 
     * Handles changes in the contents of a LinkBox.
     * E.g. Change of title.
     * @param {*} box new box state
     */
    const handleBoxContentChange = (box) => {
        let newBoxState = boxes;
        newBoxState[newBoxState.findIndex(e => e.id === box.id)] = box;
        setBoxes(newBoxState);
    }

    /**
     * Pushes new LinkBoxes to LinkBox state.
     * @param {*} state current linkbox state
     * @param {*} data raw json data from fetch
     * @param {*} order order number where the link should be inserted
     * @param {*} link link that was put into link insert
     */
    const handleUpdate = (state, data, order, link) => {
        switch (section) {
            case "spotlights": {
                state.push(
                    {
                        id: uuidv4(),
                        order: order,
                        inputLink: link,
                        imageUrl: data.yoast_head_json.og_image[0].url,
                        title: data.title.rendered,
                        itemURL: data.yoast_head_json.canonical,
                        excerpt: data.excerpt.rendered
                    }
                )
                break;
            }
            case "enterprises": {
                state.push(
                    {
                        id: uuidv4(),
                        order: order,
                        inputLink: link,
                        enterpriseURL: data.metaData.canonical,
                        enterpriseName: data.vendor.title,
                        imageSource: data.vendorCoverPhoto,
                        location: data.vendorProfileLocations[0].displayTitle,
                    }
                )
                break;
            }
            case "marketplace listings": {
                state.push(
                    {
                        id: uuidv4(),
                        order: order,
                        inputLink: link,
                        enterpriseURL: data.metaData.canonical,
                        enterpriseName: data.highlight.details.brand,
                        imageSource: data.highlight.details.image.link,
                        itemTitle: data.highlight.title,
                        itemURL: data.metaData.canonical,
                        vendorURL: data.highlight.details.action.link,
                        action: data.highlight.details.action.label,
                        expanded: false,
                    }
                )
                break;
            }
            default: throw Error("handleUpdate not implemented this section " + section);
        }
    };

    /**
     * Filters lines the submitted link list.
     * @param {*} lines link list
     * @returns 
     */
    const filterLines = (lines) => {
        let invalids = [];
        let duplicates = [];
        let filteredLines = [];
        // for (let line of lines) {
        lines.forEach((line, i) => {
            line = line.trim();
            if (line !== "") { //only consider non-empty lines
                if (isURL(line, validator_options)) {
                    if (!boxes.find(box => {
                        // console.log(box, box.inputLink, line); 
                        return box.inputLink === line;
                    }) && lines.findIndex(uniqueLine => { return uniqueLine.trim() === line }) === i) {
                        filteredLines.push(line);
                    } else {
                        // handle duplicate
                        duplicates.push(line);
                    }
                }
                else {
                    invalids.push(line);
                }
            }
        });
        // console.log(invalids,duplicates,filteredLines);
        return {
            invalids: invalids,
            duplicates: duplicates,
            filteredLines: filteredLines
        }
    };

    /**
     * Handles submit events in the LinkInsert component.
     */
    const handleTextAreaSubmit = async () => {
        if (textAreaContent) {
            let newBoxState = boxes;
            const splitLines = textAreaContent.split(/\r?\n/);
            setFetchingData(true);
            let errorneousLines = "";
            const filteredLines = filterLines(splitLines);
            const invalids = filteredLines.invalids;
            const duplicates = filteredLines.duplicates;
            let newErrorInfo = [];
            const promises = filteredLines.filteredLines.map(line => handleFetch(line));
            try {
                const values = await Promise.allSettled(promises);
                values.forEach((promiseResult, index) => {
                    const line = filteredLines.filteredLines[index];
                    // console.log(line);
                    if (promiseResult.status === "fulfilled") {
                        handleUpdate(newBoxState, promiseResult.value, newBoxState.length + 1, line);
                    } else if (promiseResult.status === "rejected") {
                        const err = promiseResult.reason;

                        if (err instanceof DOMException && err.name === "AbortError") {
                            newErrorInfo.push({ link: line, info: "timeout; manually check whether this link is valid" });
                        } else {
                            switch (section) {
                                case "spotlights": {
                                    if (line.match(/\/marketplace\//g)) {
                                        newErrorInfo.push({ link: line, info: "this link is potentially a marketplace listing, check if it's in the right section" });
                                    } else if (!line.match(/\/info\//g)) {
                                        newErrorInfo.push({ link: line, info: "this link is potentially an enterprise link, check if it's in the right section" });
                                    }
                                    else {
                                        newErrorInfo.push({ link: line, info: 'error: ' + err });
                                    }
                                    console.log(err);
                                    break;
                                }
                                case "enterprises": {
                                    if (line.match(/\/marketplace\//g)) {
                                        newErrorInfo.push({ link: line, info: "this link is potentially a marketplace listing, check if it's in the right section" });
                                    } else if (line.match(/\/info\//g)) {
                                        newErrorInfo.push({ link: line, info: "this link is potentially a spotlight link, check if it's in the right section" });
                                    }
                                    else {
                                        newErrorInfo.push({ link: line, info: 'error: ' + err });
                                    }
                                    console.log(err);
                                    break;
                                }
                                case "marketplace listings": {
                                    if (line.match(/\/info\//g)) {
                                        newErrorInfo.push({ link: line, info: "this link is potentially a spotlight link, check if it's in the right section" });
                                    } else if (!line.match(/\/marketplace\//g)) {
                                        newErrorInfo.push({ link: line, info: "this link is potentially an enterprise link, check if it's in the right section" });
                                    }
                                    else {
                                        newErrorInfo.push({ link: line, info: 'error: ' + err });
                                    }
                                    console.log(err);
                                    break;
                                }
                                default: newErrorInfo.push({ link: line, info: 'error: ' + err });
                            }

                            // newErrorInfo.push({link: line, info: 'error: '+err });
                        }
                        errorneousLines = errorneousLines + "\n" + line;
                    } else {
                        console.log("unknown status of promise: ", promiseResult);
                    }
                })
            }
            catch (err) {
                console.log(err);
            }

            setFetchingData(false);
            setBoxes(newBoxState);
            setTextAreaContent(errorneousLines.trim());
            setValidationAreaContent({ duplicateLines: duplicates, invalideLines: invalids, errorInfo: newErrorInfo });

            // remove auto-removal->else might disappear newer entries
            // if (duplicates.length >0 || invalids.length >0 ){
            //     setTimeout(function(){
            //         setValidationAreaContent({
            //         invalideLines: [],
            //         duplicateLines: [],
            //         errorInfo:  newErrorInfo
            //     });}, 7000);
            // }
        }
    }

    // render component
    return (
        <div className="link-manager">
            <LinkInsert
                textAreaContent={textAreaContent}
                handleChange={handleTextAreaChange}
                handleSubmit={handleTextAreaSubmit}
                fetchingData={fetchingData}
            />
            <LinkValidationArea
                validationAreaContent={validationAreaContent}
                setValidationAreaContent={setValidationAreaContent}
            />
            <div className="linkbox-container">
                {boxes
                    .sort((a, b) => a.order - b.order)
                    .map((box) => {
                        return (
                            <LinkBox
                                key={box.id}
                                boxId={box.id}
                                box={box}
                                handleBoxContentChange={handleBoxContentChange}
                                section={section}
                                handleDrag={handleDrag}
                                handleDrop={handleDrop}
                                handleMoveUp={handleMoveUp}
                                handleMoveDown={handleMoveDown}
                                handleDelete={handleDelete}
                                upActive={box.order !== 1}
                                downActive={box.order !== boxes.length}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default LinkManager;
