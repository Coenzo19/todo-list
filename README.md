# To-Do App 

A Demo To-do List application built with React featuring adding, editing, deleting and filtering todos.This Demo demonstrates proficiency in React hooks, state management, component architecture, and responsive design, and error handling with custom validation and extra validation behind the scenes

## Live Demo Link
Deployment is optional for this project, so no live demo is available.

## Screenshots
![Login page](./screenshots/img1.png)
![TodosPage](./screenshots/img2.png)
![Mobile example](./screenshots/img3.png)

# Feature List
- Add task to keep track of
- Edit tasks
- Delete unwanted Tasks
- Filter existing todos by completed, title, created and change the order list
- form validation and dynamic navigation
- data persistence between reloads

# technologies Used

- **Frontend:** React 18, React Router, CSS Modules
- **State Management:** useReducer, Context API,useState
- **Build Tool:** Vite

## Installing

To install this app click [here](https://github.com/Coenzo19/todo-list) to begin the process. Open Git Bash and type:

> git clone <repo-url>
cd todo-list/

once your in your project directory type:

> npm install

## Running the App

If you are using Git Bash type this command to spin the server

> npm run dev

you should see a link that reads like this:

> http://localhost:5173/ 

open the link printed in the console rather than hard-coding a port.

# Available Scripts

**npm install** — installs dependencies

**npm run dev** — starts the local development server

**npm run build** — creates the production build

**npm run preview** — previews the production build locally


## Design Decision

When designing this app, I used strong contrasting colors so text stays readable against the background. I chose green, light green, brown, and peach because they stand out from one another and create clear visual separation. I added spacing between text elements to make the page easier to scan, and I made sure borders and buttons do not blend in with surrounding content.

I also made buttons and other interactive elements large enough for mobile users and added focus states to improve accessibility.

## Future Improvements

- **backend authorization check**:  Removing sensitive information and relying more on backend authorization to show live sessions pass user data when the backend becomes available.Remove sensitive information from storage
- **Robust rollbacks**: Adding stronger rollback functionality when multiple todos are changed in rapid succession
- **further CSS styling**: Tweaking elements to align better and adjusting more for mobile

## Contact Information
- **GitHub** https://github.com/Coenzo19

- **Portfolio:** https://www.artstation.com/rromero16


## License Information

Copyright (c) 2026 Renzo Romero

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.