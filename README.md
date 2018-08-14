# OjalaThreadsEmailCollector
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)

The purpose of this project is to store emails in a .csv file from a POST request, so that newsletters can be sent out to customers. While this is a REST API for [Ojala Threads](https://ojalathreads.com), anyone this slightly rework this tool to gather emails for their own needs.

![preview](https://i.imgur.com/qVXsCHv.png)


## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) (this comes with Node.js now)

### Installing
1. Clone the repository
`git clone https://github.com/GabeKuslansky/OjalaThreadsEmailCollector`
2. Within the repository execute `npm i`
3. Run `npm run build`

### Developing
Start the instance by running  `npm start`

## Deployment
1. Run `npm run build`
2. Put the built files onto a server and run it using a Node process monitor/manager such as [PM2](http://pm2.keymetrics.io/)
3. Have a service which can make a POST request to **yourwebsite.com**/email with the headers *name* and *email*.
4. Set up an nginx config to require an authorized connection to access the page. Make sure to allow POST requests to /email, but require authorized access to /delete so strangers can't delete your emails.

## Built With
- [Express](https://expressjs.com/) - Route handler

## Authors
- [**Gabe Kuslansky**](https://github.com/GabeKuslansky) - Main Developer

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
