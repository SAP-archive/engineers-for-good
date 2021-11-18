# Views

[Source](../goodmarket-newsletter/src/components/NewsletterCreator/views/)

The views inside the newsletter creator are handled via state to allow fast switching between newsletter curation and preview.

Currently 4 views are implemented:
- RecipientsView: allows to select recipients by country
- CurateNewsletterView: allows curation of subject, intro, outro and links.
- PreviewNewsletterView: shows a render of the newsletter in its current state
- NewsletterHistory: shows sent newsletters (this is a mock)

The rendering of the views in handled in the renderView function dependend on the currentView state in NewsletterCreator.js:
```jsx
const renderView = () => {
    switch (currentView) {
        case "History":
            return <NewsletterHistory />;
        case "Recipients":
            return <RecipientsView
                countries={countries}
                setCountries={setCountries}
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
                newsletterOutro={newsletterOutro} />;
        default:
            return <RecipientsView 
            countries={countries}
            setCountries={setCountries}
            />;;
    }
}
```

