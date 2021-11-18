import React, { useState, useEffect } from "react";
import RecipientsView from './views/Recipients';
import PreviewNewsletterView from './views/PreviewNewsletter';
import CurateNewsletterView from './views/CurateNewsletter';
import './NewsletterCreator.css';
import { rejects } from "assert";
import NewsletterHistory from "./views/NewsletterHistory";


/**
 * NewsletterCreator main component.
 */
const NewsletterCreator = () => {
    /** State for view handling */
    const [currentView, setCurrentView] = useState();
    /** Valid views */
    const views = {
        history: "History",
        receipents: "Recipients",
        curate: "CurateNewsletter",
        preview: "PreviewNewsletter"
    };

    /** State for recipients selection by country */
    const [countries, setCountries] = useState([]);
    
    /** State for newsletter subject */
    const [newsletterSubject, setNewsletterSubject] = useState("");
    /**
     * Handles changes of the newletter subject.
     * @param {*} event onChange event
     */
    const handleChangeNewsletterSubject = (event) => {
        setNewsletterSubject(event.target.value);
    }
    /** state hook for the newsletter intro with empty string as default state */
    const [newsletterIntro, setNewsletterIntro] = useState("");
    /** state hook for the newsletter outro with empty string as default state */
    const [newsletterOutro, setNewsletterOutro] = useState("");
    /** State for LinkBoxes of spotlight section */
    const [spotlights, setSpotlights] = useState([]);
    /** State for LinkBoxes of enterprises section */
    const [enterprises, setEnterprises] = useState([]);
    /** State for LinkBoxes of marketplace section */
    const [marketplaceListings, setMarketplaceListings] = useState([]);
    
    /** State for opening & collapsing sections */
    const [sectionsOpened, setSectionsOpened] = useState({
        subjectOpened: true,
        introOpened: true,
        spotlightsOpened: true,
        enterprisesOpened: true,
        marketplaceListingsOpened: true,
        outroOpened: true
    });
    /** State for the newsletter HTML template */
    const [template, setTemplate] = useState("");

    // API calls upon load
    useEffect(() => {
        async function fetchCountries() {
            await fetch("/api/v1/countries")
                .then(response => response.json())
                .then(json => {
                    json.country.forEach((item) => item.isSelected = false)
                    json.country.sort((a, b) => {
                        return a.name.localeCompare(b.name);
                    })
                    setCountries(json.country)
                })
        }

        async function fetchTemplate() {
            await fetch("templates/goodmarket_gm_style.ejs").then(response => response.text()).then(text => setTemplate(text))
        }

        fetchTemplate()
        fetchCountries()
    }, []);

    /**
     * clears all input state variables (intro, outro, selected countries, enterprises, spotlights, marketplace listings)
     * @param {boolean} include_countries if set, the countries state is emptied too
     */
    async function clearInputs(include_countries){
        if(include_countries) {
            let noCountrySelected = countries;
            noCountrySelected.forEach(country => {
                country.isSelected = false;
            });
            setCountries(noCountrySelected);
        }
        setSpotlights([]);
        setEnterprises([]);
        setMarketplaceListings([]);
        setNewsletterIntro("");
        setNewsletterOutro("");
        setNewsletterSubject("");
    }

    /**
     * Fetches spotlight links.
     * @param {*} link spotlight link
     * @returns promise with json repsonse
     */
    async function fetchSpotlight(link) {
        const splitLink = link.split('.global/');
        let linkToJSON = splitLink[1];

        return fetch(linkToJSON, {
            method: 'HEAD',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                // console.log(response.headers);
                let links = response.headers.get('link');
                const linkArr = links.split(",");
                let link_found = undefined;
                linkArr.forEach(element => {
                    if (element.includes('rel="alternate"') === true) {
                        link_found = element.match(/<(.*)>/g)
                    }
                });
                //TODO test reject
                if (!link_found) {
                    rejects('unable to parse spotlight url');
                }
                const relativeUrl = link_found[0].split('.global/')[1].replace(">", "");
                // console.log(relativeUrl);
                return fetch(relativeUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });//response.headers.get('link');
            })
            .then(response => response.json())

    }

    /**
     * Fetches enterprise links.
     * @param {*} link enterprise link
     * @returns promise with json repsonse
     */
    async function fetchEnterprise(link) {
        // extract enterprise name
        const splitLink = link.split('.global/');
        let linkToJSON = "/ui/vendor-profile/" + splitLink[1] + "/data/";

        const controller = new AbortController()
        setTimeout(() => controller.abort(), 10000);
        return fetch(linkToJSON, { signal: controller.signal }).then(response => response.json());
    }

    /**
     * Fetches marketplace links.
     * @param {*} link marketplace link
     * @returns promise with json repsonse
     */
    async function fetchMarketplaceListing(link) { // extract item number
        const splitLink = link.split('/marketplace/');
        let linkToJSON = "/marketPlace/item/" + splitLink[1];
        const controller = new AbortController()
        setTimeout(() => controller.abort(), 10000);
        return fetch(linkToJSON, { signal: controller.signal }).then(response => response.json());
    }


    /**
     * Handles the rendering of the current view
     * @returns render of current view
     */
    const renderView = () => {
        switch (currentView) {
            case "History":
                return <NewsletterHistory />;
            case "Recipients":
                return <RecipientsView
                    countries={countries}
                    setCountries={setCountries}
                    views={views}
                    setCurrentView={setCurrentView}
                />;
            case "CurateNewsletter":
                return <CurateNewsletterView subjectContent={newsletterSubject}
                    handleSubjectChange={handleChangeNewsletterSubject}
                    introContent={newsletterIntro}
                    handleIntroChange={setNewsletterIntro}
                    outroContent={newsletterOutro}
                    handleOutroChange={setNewsletterOutro}
                    sectionsOpened={sectionsOpened}
                    handleSectionsOpened={setSectionsOpened}
                    spotlights={spotlights}
                    setSpotlights={setSpotlights}
                    enterprises={enterprises}
                    setEnterprises={setEnterprises}
                    marketplaceListings={marketplaceListings}
                    setMarketplaceListings={setMarketplaceListings}
                    handleFetchMarketplaceListing={fetchMarketplaceListing}
                    handleFetchEnterprise={fetchEnterprise}
                    handleFetchSpotlight={fetchSpotlight}
                    clearInput={clearInputs}
                    views={views}
                    setCurrentView={setCurrentView}
                />;

            case "PreviewNewsletter":
                return <PreviewNewsletterView
                    template={template}
                    countries={countries}
                    subjectContent={newsletterSubject}
                    newsletterIntro={newsletterIntro}
                    spotlights={spotlights}
                    enterprises={enterprises}
                    marketplaceListings={marketplaceListings}
                    newsletterOutro={newsletterOutro} 
                    clearInput={clearInputs}
                    views={views}
                    setCurrentView={setCurrentView}
                    />;

            default:
                return <RecipientsView 
                countries={countries}
                setCountries={setCountries}
                views={views}
                setCurrentView={setCurrentView}
                />;;
        }
    }

    return (
        <div className="newsletter-container">

            <div className="view-switch">
            
                <button 
                className={`button-tab box ${currentView === views.receipents || currentView === undefined ? "active":""}`} onClick={
                    () => setCurrentView(views.receipents)
                }>Recipients</button>

                <button
                    className={`button-tab box ${currentView === views.curate ? "active" : ""}`}
                    onClick={
                        () => setCurrentView(views.curate)
                    }>Curate Newsletter</button>
                <button
                className={`button-tab box ${currentView === views.preview ? "active":""}`}
                onClick={
                    () => setCurrentView(views.preview)
                }>Preview Newsletter</button>
                <button className={`button-tab box ${currentView === views.history ? "active":""}` }  onClick={
                    () => setCurrentView(views.history)}>Newsletter History</button>

            </div>

            <hr />
            <div>
                {renderView()}
            </div>

        </div>
    )
}

export default NewsletterCreator;
