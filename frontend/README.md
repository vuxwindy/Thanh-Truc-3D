# Web2D Frontend

A modern React frontend application built with Vite, Redux, and React Bootstrap.

## Technologies Used

- React 18
- Redux Toolkit for state management
- React Router v6 for navigation
- React Bootstrap for UI components
- Vite for fast development and building

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── features/       # Redux feature slices
│   │   └── counter/    # Example counter feature
│   ├── pages/          # Page components
│   ├── store/          # Redux store configuration
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── package.json        # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Environment Variables

Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:3000
```

## Features

- Modern React with Vite for fast development
- Redux Toolkit for efficient state management
- React Router for client-side routing
- Bootstrap components for responsive UI
- Hot Module Replacement (HMR)
- ESLint for code quality

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
