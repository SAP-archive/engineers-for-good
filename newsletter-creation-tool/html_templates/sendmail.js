// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
const sgMail = require('@sendgrid/mail')
const fs = require('fs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setSubstitutionWrappers('{{', '}}');
const readFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const subsitute = (entitytype, obj, str) => {
    Object.keys(obj).forEach(function(k) {
        str = str.replace("##" + entitytype + "." + k + "##", obj[k]);
        // console.log(obj[k]);
    });
    // console.log(str)
    return str;
};


const givenInput = "Hallo {{name}}\nnice to meet you";

readFile('newsletter_emptied.html')
    // readFile('goodmarket_newsletter.html')
    .then((data) => {

        data = data.replace("#FREETEXT_OPENER#", givenInput);

        readFile('dummydata.json').then((jsondata) => {
                var dummydata = JSON.parse(jsondata);
                readFile('html_fragments/spotlight_fragment.html')
                    .then((spotlightFragment) => {

                        dummydata.spotlight.forEach(element => {
                            var thisSpotlight = spotlightFragment.slice();
                            thisSpotlight = subsitute("spotlight", element, thisSpotlight);
                            data = data.replace("#SPOTLIGHT#", thisSpotlight + "#SPOTLIGHT#");
                        });
                        data = data.replace("#SPOTLIGHT#", "");
                        readFile('html_fragments/enterprise_fragment.html')
                            .then((enterpriseFragment) => {
                                dummydata.enterprise.forEach(element => {
                                    var thisenterprise = enterpriseFragment.slice();
                                    thisenterprise = subsitute("enterprise", element, thisenterprise);
                                    data = data.replace("#ENTERPRISE#", thisenterprise + "#ENTERPRISE#");
                                });
                                data = data.replace("#ENTERPRISE#", "");
                                readFile('html_fragments/marketplace_fragment.html')
                                    .then((marketplaceFragment) => {

                                        dummydata.marketplace.forEach(element => {
                                            var thismarketplace = marketplaceFragment.slice();
                                            thismarketplace = subsitute("marketplace", element, thismarketplace);
                                            data = data.replace("#MARKETPLACE#", thismarketplace + "#MARKETPLACE#");
                                        });
                                        data = data.replace("#MARKETPLACE#", "");
                                        const msg = {
                                            // to: ["test-3jkjkkrol@srv1.mail-tester.com"],
                                            // to: "test-632vyb1fr@srv1.mail-tester.com",
                                            to: "testaccnt815@gmail.com",
                                            substitutions: {
                                                name: ["Test Account"]
                                            },
                                            from: 'angela.marie.wobar@sap.com', // Change to your verified sender
                                            subject: 'Sending with SendGrid is Fun',
                                            // text: 'and easy to do anywhere, even with Node.js',
                                            // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
                                            html: data,
                                            trackingSettings: {
                                                click_tracking: {
                                                    enable: true,
                                                    enable_text: true
                                                },
                                                open_tracking: {
                                                    enable: true
                                                }
                                            }
                                        }
                                        sgMail
                                            .send(msg)
                                            .then(() => {
                                                console.log('Email sent')
                                            })
                                            .catch((error) => {
                                                console.error(error)
                                            })
                                    })
                                    .catch((error) => {
                                        console.error(error)
                                    })
                            })

                            .catch((error) => {
                                console.error(error)
                            })
                    })

                    .catch((error) => {
                        console.error(error)
                    })
            })

            .catch((error) => {
                console.error(error)
            })
    }).catch((error) => {
        console.error(error)
    });