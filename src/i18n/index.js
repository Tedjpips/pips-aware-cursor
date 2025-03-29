import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome Back",
      progress: "Awareness Progress",
      home: "Home",
      live: "Live Section",
      awareness: "Awareness",
      tools: "Tools",
      logout: "Logout",
      menu: "Menu",
      level: "Level",
      lesson: "Lesson",
      next: "Next",
      complete: "Complete",
      language: "Language",
      selectLanguage: "Select Language",
      signUp: "Sign Up",
      username: "Username",
      createUsername: "Create Username",
      darkMode: "Dark Mode",
      lightMode: "Light Mode"
    }
  },
  fr: {
    translation: {
      welcome: "Bon Retour",
      progress: "Progrès de Conscience",
      home: "Accueil",
      live: "Section Live",
      awareness: "Conscience",
      tools: "Outils",
      logout: "Déconnexion",
      menu: "Menu",
      level: "Niveau",
      lesson: "Leçon",
      next: "Suivant",
      complete: "Terminer",
      language: "Langue",
      selectLanguage: "Sélectionner la Langue",
      signUp: "S'inscrire",
      username: "Nom d'utilisateur",
      createUsername: "Créer un nom d'utilisateur",
      darkMode: "Mode Sombre",
      lightMode: "Mode Clair"
    }
  },
  ar: {
    translation: {
      welcome: "مرحباً بعودتك",
      progress: "تقدم الوعي",
      home: "الرئيسية",
      live: "القسم المباشر",
      awareness: "الوعي",
      tools: "الأدوات",
      logout: "تسجيل الخروج",
      menu: "القائمة",
      level: "المستوى",
      lesson: "الدرس",
      next: "التالي",
      complete: "إكمال",
      language: "اللغة",
      selectLanguage: "اختر اللغة",
      signUp: "تسجيل",
      username: "اسم المستخدم",
      createUsername: "إنشاء اسم مستخدم",
      darkMode: "الوضع الليلي",
      lightMode: "الوضع النهاري"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 