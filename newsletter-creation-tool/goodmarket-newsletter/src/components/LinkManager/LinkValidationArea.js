import React from "react";
import './LinkValidationArea.css';

/**
 * The LinkValidationArea component is used to display validaton & fetch errors.
 * E.g. Duplicates, dead links, wrong section for link.
 */
const LinkValidationArea = ({
    validationAreaContent,
    setValidationAreaContent
}) => {
    return (
        <div className="linkbox-validatonArea">
            {validationAreaContent.errorInfo.length > 0 &&
                <div className="linkbox_errors">
                    Following lines had issues on trying to fetch data:
                        <span className="close" onClick={()=> setValidationAreaContent({errorInfo: [], duplicateLines: validationAreaContent.duplicateLines, invalideLines: validationAreaContent.invalideLines})}>&times;</span>
                    {validationAreaContent.errorInfo.map((line) =>  (
                            <li>
                            {line.link} :  <span className="linkbox_errorInfo"> {line.info} </span>
                          </li>
                        ))}
                        

                </div>
            }
            {validationAreaContent.invalideLines.length > 0 &&
                <div className="linkbox_invalid">
                    Following lines aren't considered as valid Urls:
                        <span className="close" onClick={()=> setValidationAreaContent({errorInfo: validationAreaContent.errorInfo, duplicateLines: validationAreaContent.duplicateLines, invalideLines: []})}>&times;</span>
                    {validationAreaContent.invalideLines.map((line) =>  (
                            <li>

                            {line}
                        </li>
                    ))}

                </div>
            }
            {validationAreaContent.duplicateLines.length > 0 &&
                <div className="linkbox_duplicates">
                    Following lines aren't considered, because they are duplicates:
                    <span className="close" onClick={() => setValidationAreaContent({ errorInfo: validationAreaContent.errorInfo, duplicateLines: [], invalideLines: validationAreaContent.invalideLines })}>&times;</span>
                    {validationAreaContent.duplicateLines.map((line) => (
                        <li>
                            {line}
                        </li>
                    ))}

                </div>
            }
        </div>

    );
};

export default LinkValidationArea;
