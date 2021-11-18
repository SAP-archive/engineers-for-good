import React from "react";
import './LinkInsert.css';

import SyncIcon from '@material-ui/icons/Sync';

/**
 * The LinkInsert component used to insert links.
 */
const LinkInsert = ({ textAreaContent, handleChange, handleSubmit, fetchingData }) => {

    // submit on ENTER
    React.useEffect(() => {
        const keyPressHandler = (e) => {
            if(e.keyCode===13 && (e.ctrlKey || e.metaKey)) handleSubmit()
        };

        document.addEventListener('keydown', keyPressHandler);
        return () => {
            document.removeEventListener('keydown', keyPressHandler);
        };
    }, [handleSubmit]);

    return (
        <div className="container">
            <textarea
                className="link-insert"
                value={textAreaContent}
                placeholder='Enter links here.'
                onChange={(e) => handleChange(e)}
                onSubmit={handleSubmit}
            />
            <div><button onClick={handleSubmit}  disabled={fetchingData}>Insert</button>
                <SyncIcon
                    fontSize="small"
                    className={`Spinner ${fetchingData ? "visible": ""}`}
            />
            </div>
        </div>
    );
};

export default LinkInsert;