# Newsletter Creator

[Source](../goodmarket-newsletter/src/components/NewsletterCreator/NewsletterCreator.js)

The NewsletterCreator component is the main component of the app. It contains the all the states and hooks for the child components.
This includes:

- States for the recipients
- States regarding the newsletter curation (subject, intro, spotlights, enterprises, marketplace listings, outro)
- States for view management & expansion of section
- State for the template

Additionally, the functions for calling the goodmarket APIs are defined here. This includes:

- API call to fetch recipients (mocked)
- API call to fetch spotlights, enterprises, marketplace listings
- API call to load the template

