import ejs from "ejs";
import React, { useState } from "react";
import SettingsIcon from '@material-ui/icons/Settings';
import './newsletterpreview.css';
//import { blue, green } from "@material-ui/core/colors";
import PreviewIframe from "./PreviewIframe";
import PopUp from "../../PopUp/PopUp";

/**
 * View for previewing the newsletter.
 */
const PreviewNewsletterView = ({
    template,
    countries,
    subjectContent,
    newsletterIntro,
    spotlights,
    enterprises,
    marketplaceListings,
    newsletterOutro,
    clearInput, 
    views,
    setCurrentView
}) => {

    // logic for display of selected countries
    let countrySelected = countries && countries.length > 0 ? countries.filter((country)=> country.isSelected).map((country)=>country.name) : ""
    if (countries && countries.length>0 && countries.length === countrySelected.length) {
        countrySelected = ["Global"];
    }

    /** render the EJS template with the current state of the sections */
    const renderTemplate = () => {
        let html = ejs.render(template, {
            intro: newsletterIntro,
            spotlights: spotlights,
            enterprises: enterprises,
            marketplaceListings: marketplaceListings,
            outro: newsletterOutro,
            unsubscribeUrl: "<%asm_group_unsubscribe_raw_url%>",
            preferencesUrl: "<%asm_preferences_raw_url%>",
            Sender_Name: "Good Market",
            Sender_Address: "14 Philip ",
            Sender_City:"Gunawardena Mawatha Colombo ",
            Sender_Zip:"00700"
        });
        return html;
    };


    const [showPopupSendTest, setShowPopupSendTest] = useState(false)
    const [showPopupSend, setShowPopupSend] = useState(false)
    const [showPopupEmailAddr, setEnterEmailAddr] = useState(false)
    // todo set default address
    const [testMailAddressContent, setMailAddress] = useState("email@example.com")

    const popupSendTest = () => {
        if (showPopupSendTest) {
            return (
                <PopUp
                showPopUp={showPopupSendTest}
                setShowPopUp={setShowPopupSendTest}
                additionalClassInner=""
                additionalClassPopUp=""
                fetchInnerHtml={() => {
                    return (
                        <div>
                        <h2>Mail has been sent</h2>
                        <button onClick={() => togglePopupSendTest()}>Close</button>
                        </div>
                    )
                }}
                />
            )
        }
    }

    const popupSend = () => {
        if (showPopupSend) {
            return (
                <PopUp
                    showPopUp={showPopupSend}
                    setShowPopUp={setShowPopupSend}
                    additionalClassInner=""
                    additionalClassPopUp=""
                    fetchInnerHtml={() => {
                            return (
                                <div>
                                    <div>
                                        <h3>Are you sure you want to send the newsletter to the following countries?</h3>
                                        <ul>{countrySelected.map(country => (<li >{country}</li>))}</ul>                                
                                    </div>
                                    {(subjectContent.length > 0 && countries.length > 0 ) && 
                                    <button onClick={() => SendNewsletter()}>Confirm</button>
                                    }
                                    {(subjectContent.length === 0 || countries.length === 0 ) && 
                                    <p>Please fill subject and select countries.</p>
                                    }
                                    <button onClick={() => togglePopupSend()}>Cancel</button>
                                </div>
                            )}}
                    />
            )
        }
    }

    const popupEmailAddr = () => {
        if (showPopupEmailAddr) {
            return (
                <PopUp
                    showPopUp={showPopupEmailAddr}
                    setShowPopUp={setEnterEmailAddr}
                    additionalClassInner="emailAddr"
                    additionalClassPopUp=""
                    fetchInnerHtml={()=>{
                        return (
            <div >
                    <h1 >Send Test Email</h1>
                    <div >
                    <p>Enter Email Address</p>
                   
                    <input
                        type="text"
                        placeholder={testMailAddressContent}
                        onChange={(event) => setMailAddress(() => event.target.value)}
                    />
                    <button onClick={() => SendTest()}>Send</button>
                    <button onClick={() => togglePopupEmailAddr(false)}>Close</button>
                    </div>
                    
                </div>
            )}}
    /> 
            )
        }
    }

    function SendTest() {
        // implement actual sending
        togglePopupEmailAddr(true)
    }

    function SendNewsletter() {
    //todo: implement api call to goodmarket.local:3005/admin/newsletter/send
    // and acutally send the newsletter
    
        togglePopupSend();
        togglePopupSendTest();

    //after sending the newsletter, all input variables are cleaned
        clearInput(true);
        setCurrentView(views.history);
        
    }

    function togglePopupSendTest() {
        setShowPopupSendTest(show => !show)
    }

    function togglePopupSend() {
        setShowPopupSend(show => !show)
    }

    function togglePopupEmailAddr(dontSend) {
        if (dontSend) {
            setShowPopupSendTest(show => !show)
        }
        setEnterEmailAddr(show => !show)
    }

    let countrySelectedList = [];
    if (countrySelected && countrySelected.length>0) {
        countrySelected.map((country) => {
            countrySelectedList.push(<span>{country}&nbsp;</span>);
            return countrySelectedList
        })
    }
    
    return (

        <div className="newsletter-create-container PreviewNewsletter">
        {(newsletterIntro.length > 0 ||     spotlights.length > 0 || 
            enterprises.length > 0 ||
            marketplaceListings.length > 0 || 
            newsletterOutro.length > 0 ) && 
            <div>
            <div>
                
                <table className="NewsletterInfos" >
                <tbody>
                    <tr>
                    <td> <span className="newsHeader">Recipients:  </span>{countrySelectedList}</td>
                    </tr>
                    <tr>
                    <td><span className="newsHeader">Subject:  </span>{subjectContent}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <hr/>
            <PreviewIframe
                innerHtml={renderTemplate()} 
                />

            <div className="send-buttons">
                <button className="joint-button-left" onClick={() => {togglePopupSendTest();}}>
                    Send Test Email
                </button>
                <button
                    className="joint-button-right"
                        onClick={() => togglePopupEmailAddr()}
                >
                <SettingsIcon 
                    className="settings-icon"/>
                </button>
                <button
                    className="send-newsletter-button"
                    onClick={() => {togglePopupSend();}}>
                    Send Newsletter
                </button>
            </div>
            <div>
                {popupSendTest()}
                {popupSend()}
                {popupEmailAddr()}
            </div>
             </div>
}
{newsletterIntro.length === 0 && spotlights.length === 0 && 
            enterprises.length === 0 && 
            marketplaceListings.length === 0 && 
            newsletterOutro.length === 0 && 
            <div>
                <p>Currently, no information maintained, please fill any of

                        <li>Intro</li>
                        <li>Spotlights</li>
                        <li>Enterprises</li>
                        <li>Marketplace Listings</li>
                        <li>Outro</li>

                    at "Curate Newsletter" Section
                </p>
                </div>
}
        </div>
    )
}

export default PreviewNewsletterView;