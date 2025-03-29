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
- Firebase account
- YouTube API key

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
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

4. Set up Firebase:
   - Create a new Firebase project
   - Enable Google Authentication
   - Create a Firestore database
   - Set up security rules

5. Start the development server:
```bash
npm start
```

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
- Firebase for authentication and database
- Framer Motion for animations
- i18next for internationalization #   p i p s - a w a r e - c u r s o r  
 