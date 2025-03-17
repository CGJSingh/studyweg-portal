# StudyWeg Student Portal

A modern React application for StudyWeg, designed to replace the previous WordPress website. This portal provides students with easy access to educational programs and resources.

## Features

- Browse and search for educational programs
- Filter programs by category
- View detailed program information
- Responsive design for all devices
- Modern UI/UX

## Technologies Used

- React.js with TypeScript
- React Router for navigation
- Styled Components for styling
- Axios for API requests
- Font Awesome for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/studyweg-portal.git
cd studyweg-portal
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
studyweg-portal/
├── public/                 # Public assets
├── src/                    # Source files
│   ├── assets/             # Static assets
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main App component
│   ├── globalStyles.ts     # Global styles
│   └── index.tsx           # Entry point
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## API Integration

The application integrates with the WooCommerce API to fetch program data:

```
https://studyweg.com/wp-json/wc/v3/products
```

## Deployment

To build the application for production:

```
npm run build
```

This will create a `build` folder with optimized production files.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspiration from the original StudyWeg WordPress site
- React.js documentation and community
- WooCommerce API documentation
