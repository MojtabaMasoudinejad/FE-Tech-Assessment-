### Installation

To get the project up and running, and view components in the browser, complete the following steps:

Install project dependancies: yarn install
Start the development environment: yarn start
Open your browser and visit http://localhost:3000

### Creating a static build

To create a static instance of this project, run the following task:

npm run build

This will create a folder called www, into which the required files will be created.

### Repo structure

```js
/
├─ src/
│  ├─ assets/          # Assets
│  │  ├─ image/        # Home Page image
│  │
│  ├─ components/      # Components
│  │  ├─ cartProduct/  # …that shows the cart for purchasing items
│  │  ├─ globalStyles  # …that changed the overall style across the entire site
│  │  ├─ item/         # …that shows the information for each item in specific pages
│  │  ├─ navbar/       # …that shows navbar in website
│  │  ├─ products/     # …that shows home page with all products
│  │  └─ usercontext/  # …that provides data and functions to all components
│  ├─ hook/            # …that shows the costum hook to storage the purchase item in cart
│
│
├─ .gitignore        # List of files and folders not tracked by Git
├─ package.json      # Project manifest
└─ README.md         # This file

```
