# Product Management System

## Description
This project is a product management system built with React and TypeScript, connected to an API developed with Laravel. The system allows users to view, add, edit, and delete products.

## Features
- View a list of products with detailed information
- Add new products
- Edit existing product information
- Delete products after confirmation
- Modal for viewing product details
- Pagination for navigating through product pages

## Technologies Used
- **Frontend**: React, TypeScript, Redux Toolkit, Axios
- **Backend**: Laravel
- **Styling**: CSS Modules
- **Toast Notifications**: React Toastify

## Project Structure
├── src
│   ├── app
│   │   ├── hooks.ts
│   │   ├── store.ts
│   ├── components
│   │   ├── input
│   │   ├── modal
│   ├── features
│   │   ├── product
│   │   │   ├── ProductSlice.ts
│   │   │   ├── ProductService.ts
│   │   │   ├── Product.type.ts
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductForm.tsx
│   ├── service
│   │   ├── ApiConfig.ts
│   │   ├── HttpService.ts
│   └── App.tsx
├── public
│   └── index.html
├── package.json
└── README.md

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/FadillMD/typescript-product-ui.git
   cd repo-name
   ```
2. Install dependencies:
  ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```
## Contributing
If you would like to contribute to this project, please create an issue or pull request.

## License
This project is licensed under the MIT License.

Feel free to copy and paste this into your README.md file!