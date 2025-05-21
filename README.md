# Capstone Project

Wireframes: https://www.figma.com/proto/bZYFcJrGtI7EqjoVwc1ud5/Capstone-Wires?page-id=0%3A1&node-id=1-2123&p=f&viewport=-200%2C552%2C0.36&t=GI7rBblVmwhqrJok-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A2123

Deployed App: https://capstone-d9iz.onrender.com/

Backend Repo: https://github.com/JennMilano/Unit37.git

Test User: test@test.com, password123
Admin User: admin@admin.com, password123

## Setup

1. Clone and install:
   ```bash
   git clone https://github.com/JennMilano/Capstone.git
   cd Capstone
   npm install
   ```

2. Create `.env` file:
   ```
   VITE_API_URL=https://capstone-backend-sdbp.onrender.com
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173)

## Features

- User authentication (login/register)
- Product browsing and searching
- Shopping cart functionality
- User profile management
- Admin product management

## Tech Stack

- Frontend: React, Redux Toolkit, React Router, Vite
- Backend: Node.js, Express, PostgreSQL
- Authentication: JWT

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (for local development)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── api/          # API configuration and endpoints
│   ├── components/   # React components
│   ├── redux/        # Redux store and slices
│   ├── assets/       # Static assets
│   └── App.jsx       # Main application component
├── public/           # Public assets
└── vite.config.js    # Vite configuration
```



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
