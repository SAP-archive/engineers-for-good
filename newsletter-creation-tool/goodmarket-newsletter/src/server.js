import { createServer } from "miragejs"

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    createServer({
        routes() {
            this.passthrough('https://localhost:3000/templates/goodmarket_gm_style.ejs');
            this.passthrough('http://localhost:3000/templates/goodmarket_gm_style.html');
            this.passthrough('/ui/**', '/info/**', '/marketPlace/**')

            this.get("/api/v1/countries", () => ({
                country: [
                    { code: "de", name: "Germany", recipientNum: 2369 },
                    { code: "lk", name: "Sri Lanka", recipientNum: 4268 },
                    { code: "au", name: "Australia", recipientNum: 1988 },
                    { code: "af", name: "Afghanistan", recipientNum: 109 },
                    { code: "in", name: "India", recipientNum: 5845 },
                    { code: "dz", name: "Algeria", recipientNum: 500 },
                    { code: "ao", name: "Angola", recipientNum: 1536 },
                    { code: "at", name: "Austria", recipientNum: 145 },
                    { code: "az", name: "Azerbaijan", recipientNum: 526 },
                    { code: "bd", name: "Bangladesh", recipientNum: 302 },
                    { code: "by", name: "Belarus", recipientNum: 205 },
                    { code: "bm", name: "Bermuda", recipientNum: 896 },
                ],
            }))
        },
    })
}