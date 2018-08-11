# OjalaThreadsEmailCollector
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)

The purpose of this project is to store emails in a .csv file from a POST request, so that newsletters can be sent out to customers. While this is a REST API for [Ojala Threads](https://ojalathreads.com), anyone this tool can use this tool to gather information for sending out a newsletter.

![preview](https://i.imgur.com/2I9GTOr.png)


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
3. Restrict the server with a username and password built with nginx or a similar tool. Here is an example nginx configuration which allows restricted file downloading. Make sure to install a tool like `http-tools` and run `
sudo htpasswd -c /etc/nginx/.htpasswd usernameGoesHere` to set up credentials to access the server. 
```
events {
  worker_connections 1024;
}

http {
  server {
    listen 80;
    server_name yourwebsite.com;
    return 301 https://$server_name$request_uri;
  }

  server {
    listen 443 ssl http2;
    server_name yourwebsite.com;
    ssl_certificate /etc/letsencrypt/live/yourwebsite.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourwebsite.com/privkey.pem;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        sendfile on;
        auth_basic "Protected Email Download";
        auth_basic_user_file /etc/nginx/.htpasswd;
        proxy_pass http://0.0.0.0:8080;
    }
  }
}
```

## Built With
- [Express](https://expressjs.com/) - Route handler

## Authors
- [**Gabe Kuslansky**](https://github.com/GabeKuslansky) - Main Developer

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
