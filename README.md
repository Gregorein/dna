# Task project

## Todo
### MVP implementing (part of) the:
* main screen for festivals grouped by organiser
* festival page
* QR code page + wallet actions  
* (redux)  

### What could be implemented/changed further:
* refactor and implement proper routing (without redux) and use a auth middleware to lock access, short token lifespan + reauth (bc money), and also because tokens in URLS can't be added rn. Stop inventing wheels :D
* finishing festival page with a separate reducer

* everything - use Next.js to rewrite app with SSR + api middleman
  
* rewrite `<Screen/>` to remove forced actions from views
* add normalize.css and parts of reset.css
* minimized bundle size by modyfying imports
* refactor server, split endpoints, interfaces, logic
* etc.

## Prerequisites

- [Node.js](https://nodejs.org/en) v20
- [React.js](https://react.dev/0) v18+

## Project structure

### web

Web application written in React (bootstrapped from [Create React App](https://github.com/facebook/create-react-app)). Runs on `http://localhost:3000`. Uses [React Redux Toolkit](https://redux-toolkit.js.org/) for state management.

### api 

Simple vanilla Node.js backend server for REST API. Runs on `http://localhost:8000`. Available endpoints:

- `/users/register` POST 

  Request: `{ email: string, password: string }`

  Response: `{ id: string, email: string, balance: number }`

  Error: `{ error: string }`

- `/users/login` POST

  Request: `{ email: string, password: string }`

  Response: `{ id: string, email: string, balance: number }`

  Error: `{ error: string }`

- `/users/acount/top-up`

  Request: `{ userId: string, amount: number }`

  Response: `{ newBalance: number }`

  Error: `{ error: string }`

### contract

Contains TypeScript type definitions shared by web and api.

## Scripts

- `npm run api` - start backend server (localhost:8000)
- `npm run web` - start web app server (localhost:3000)
- `npm run test` - run unit tests
