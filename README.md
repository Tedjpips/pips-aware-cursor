# Pips Aware

A comprehensive trading education platform with interactive lessons, live sessions, and trading tools.

## Features

- Google Authentication
- Multilingual Support (English, French, Arabic)
- Interactive Video Lessons
- Progress Tracking
- Live Trading Sessions
- Trading Tools and Calculators
- Dark/Light Mode
- Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TinyHost account

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pips-aware.git
cd pips-aware
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=your_api_url
REACT_APP_AUTH_URL=your_auth_url
```

4. Start the development server:
```bash
npm start
```

## Deployment

This project is configured for deployment on TinyHost:

1. Create a TinyHost account at https://tinyhost.app/
2. Create a new project and select "Static Site"
3. Connect your GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`
5. Add environment variables in TinyHost dashboard
6. Deploy!

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── config/        # Configuration files
  ├── i18n/          # Internationalization
  ├── utils/         # Utility functions
  ├── App.js         # Main App component
  └── index.js       # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- TinyHost for hosting
- Framer Motion for animations
- i18next for internationalization

#   p i p s - a w a r e - c u r s o r 
 
 