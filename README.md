## How to check

1. Clone this repo.
2. Checkout to `develop` branch.
3. Open terminal in project folder.
4. Run `npm run i` and await for modules has been installed.
5. Rename `.env.example` to `.env`, change port if you want to.
6. Make sure you are using 18 LTS version of Node.js.
7. You are ready!

To check app in dev mode: 
- Run `npm run start:dev`

To check app in production mode: 
- Run `npm run start:prod`

To run tests: 
- Run `npm run test`

### How to test without Postman

In project root directory you will see `requests.http` file.
- install VS code extension `REST Client` (author `Huachao Mao`) or click this [link](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).
- open `requests.http`
- you will see a small button `Send Request` above each prepared request. (if don't see buttons maybe vs code reload will help) 
- start app in any mode. 
- click `Send Request` button on any request. 
- vs code will open a separate window with the response. 
- you can edit this template, change userIds and so on.

If you don't want to try this awesome extension, you still can test it with Postman or any client you want to.
