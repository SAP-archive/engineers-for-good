# Getting started
* needed: sendgrid account with SENDGRID API KEY
* save API KEY in environment variable SENDGRID_API_KEY
* install @sendgrid/mail 
```sh
npm install --save @sendgrid/mail
```
* file sendmail.js is based on the example on https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail#

## Good to know
### html emails:
* prefere tables over divs (https://www.litmus.com/blog/email-design-with-html-tables/)
* prefere inline css (you could use https://htmlemail.io/inline/ in order to inline css; (goodmarket_newsletter.html with style-section; goodmarket_nl_inlined.html with output of https://htmlemail.io/inline/) 
* check css support in email clients: https://www.campaignmonitor.com/css/ 
* check spam-rating of your mail: https://www.mail-tester.com/
### limitations of sendgrid API
* max 20 MB (overall; content + header)
* max x recipients?
### api reference
*https://docs.sendgrid.com/api-reference/mail-send/mail-send
*https://sendgrid.api-docs.io/v3.0/mail-send/v3-mail-send
