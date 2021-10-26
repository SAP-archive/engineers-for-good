import { Collapse } from 'react-collapse';
import LinkManager from '../../LinkManager/LinkManager';
import TextBox from '../../TextBox/TextBox';
import React from "react";
import './curatenewsletter.css';



/**
 * View for newsletter creation & link curation.
 */
const CurateNewsletterView = ({
    subjectContent,
    handleSubjectChange,
    introContent,
    handleIntroChange,
    outroContent,
    handleOutroChange,
    sectionsOpened,
    handleSectionsOpened,
    spotlights,
    setSpotlights,
    enterprises,
    setEnterprises,
    marketplaceListings,
    setMarketplaceListings,
    handleFetchMarketplaceListing,
    handleFetchEnterprise,
    handleFetchSpotlight,
    clearInput,
    views,
    setCurrentView
}) => {
    /** Handler for opening & collapsing subject section */
    const handleSubjectOpened = () => {
        const newSectionsOpenedState = Object.assign({}, sectionsOpened);
        newSectionsOpenedState.subjectOpened = !sectionsOpened.subjectOpened;
        handleSectionsOpened(newSectionsOpenedState)
    }

    /** Handler for opening & collapsing intro section */
    const handleIntroOpened = () => {
        const newSectionsOpenedState = Object.assign({}, sectionsOpened);
        newSectionsOpenedState.introOpened = !sectionsOpened.introOpened;
        handleSectionsOpened(newSectionsOpenedState)
    }

    /** Handler for opening & collapsing spotlight section */
    const handleSpotlightsOpened = () => {
        const newSectionsOpenedState = Object.assign({}, sectionsOpened);
        newSectionsOpenedState.spotlightsOpened = !sectionsOpened.spotlightsOpened;
        handleSectionsOpened(newSectionsOpenedState)
    }

    /** Handler for opening & collapsing enterprise section */
    const handleEnterprisesOpened = () => {
        const newSectionsOpenedState = Object.assign({}, sectionsOpened);
        newSectionsOpenedState.enterprisesOpened = !sectionsOpened.enterprisesOpened;
        handleSectionsOpened(newSectionsOpenedState)
    }

    /** Handler for opening & collapsing marketplace section */
    const handleMarketplaceListingsOpened = () => {
        const newSectionsOpenedState = Object.assign({}, sectionsOpened);
        newSectionsOpenedState.marketplaceListingsOpened = !sectionsOpened.marketplaceListingsOpened;
        handleSectionsOpened(newSectionsOpenedState)
    }

    /** Handler for opening & collapsing outro section */
    const handleOutroOpened = () => {
        const newSectionsOpenedState = Object.assign({}, sectionsOpened);
        newSectionsOpenedState.outroOpened = !sectionsOpened.outroOpened;
        handleSectionsOpened(newSectionsOpenedState)
    }

    return (
        <div className="newsletter-create-container">
            <div className="inerst-block-div">
                <button
                    className={sectionsOpened.subjectOpened ? "collapsible-open" : "collapsible-closed"}
                    onClick={() => handleSubjectOpened()}>
                    Subject
                </button>
                <Collapse isOpened={sectionsOpened.subjectOpened}>
                    <input
                        className="input-text"
                        type="text"
                        placeholder="Enter newsletter subject."
                        value={subjectContent}
                        onChange={handleSubjectChange}
                    />
                </Collapse>
            </div>

            <div className="inerst-block-div">
                <button
                    className={sectionsOpened.introOpened ? "collapsible-open" : "collapsible-closed"}
                    onClick={() => handleIntroOpened()}>
                    Intro
                </button>
                <Collapse isOpened={sectionsOpened.introOpened}>
                    <TextBox
                        textBoxContent={introContent}
                        handleChange={handleIntroChange}
                    />
                </Collapse>
            </div>
            <div className="inerst-block-div">
                <button
                    className={sectionsOpened.spotlightsOpened ? "collapsible-open" : "collapsible-closed"}
                    onClick={() => handleSpotlightsOpened()}>
                    Spotlights
                </button>
                <Collapse isOpened={sectionsOpened.spotlightsOpened}>
                    <LinkManager
                        boxes={spotlights}
                        setBoxes={setSpotlights}
                        handleFetch={handleFetchSpotlight}
                        section={"spotlights"}
                    />
                </Collapse>
            </div>
            <div className="inerst-block-div">
                <button
                    className={sectionsOpened.enterprisesOpened ? "collapsible-open" : "collapsible-closed"}
                    onClick={() => handleEnterprisesOpened()}>
                    Enterprises
                </button>
                <Collapse isOpened={sectionsOpened.enterprisesOpened}>
                    <LinkManager 
                        boxes={enterprises}
                        setBoxes={setEnterprises}
                        handleFetch={handleFetchEnterprise}
                        section={"enterprises"}
                    />
                </Collapse>
            </div>
            <div className="inerst-block-div">
                <button
                    className={sectionsOpened.marketplaceListingsOpened ? "collapsible-open" : "collapsible-closed"}
                    onClick={() => handleMarketplaceListingsOpened()}>
                    Marketplace Listings
                </button>
                <Collapse isOpened={sectionsOpened.marketplaceListingsOpened}>
                    <LinkManager 
                        boxes={marketplaceListings}
                        setBoxes={setMarketplaceListings}
                        handleFetch={handleFetchMarketplaceListing}
                        section={"marketplace listings"}
                    />
                </Collapse>
            </div>
            <div className="inerst-block-div">
                <button
                    className={sectionsOpened.outroOpened ? "collapsible-open" : "collapsible-closed"}
                    onClick={() => handleOutroOpened()}>
                    Outro
                </button>
                <Collapse isOpened={sectionsOpened.outroOpened}>
                    <TextBox
                        textBoxContent={outroContent}
                        handleChange={handleOutroChange}
                    />
                </Collapse>
            </div>
            <div >
                <button className="dangerousButton"
                    onClick={() => clearInput(false)}>
                    clear all Input
                </button>
                <button className="nextButton"
                    onClick={() => setCurrentView(views.preview)}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default CurateNewsletterView;