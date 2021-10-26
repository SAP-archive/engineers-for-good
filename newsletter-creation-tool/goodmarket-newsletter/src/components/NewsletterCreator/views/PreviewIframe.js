import React from "react";
import './newsletterpreview.css';

/**
 * component for embedding HTML-newsletter into Iframe.
 */
const PreviewIframe = ({
    innerHtml
}) => {

    function resizeIframe() {
        let iframe = document.getElementById("contentIframe");
		iframe.style.height = (iframe.contentDocument.body.scrollHeight +10) + 'px';
    }
    function windowWidth() {
        return (window.innerWidth -50) + 'px';
    }
    
    return (
            <div className="content" >
                <iframe     
                 id="contentIframe"         
                 title="Here the HTML Newsletter should be rendered..."
                 srcDoc={innerHtml} 
                 scrolling="no"
                 width={windowWidth()}
                 onLoad={() => resizeIframe()}></iframe>
            </div>

    )
}

export default PreviewIframe;