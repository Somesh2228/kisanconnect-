// JavaScript for Kisan Circle Interactive Features

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Language Selector
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        changeLanguage(selectedLanguage);
        // Store preference in localStorage
        localStorage.setItem('preferredLanguage', selectedLanguage);
    });

    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
        changeLanguage(savedLanguage);
    }

    // Community Form Handling
    const communityForm = document.getElementById('communityForm');
    communityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleCommunityFormSubmission(this);
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmission(this);
    });

    // Feature Buttons
    setupFeatureButtons();

    // Scheme Buttons
    setupSchemeButtons();

    // Expert Buttons
    setupExpertButtons();

    // Hero Buttons
    setupHeroButtons();

    // Animated Counter for Stats
    animateCounters();

    // Intersection Observer for animations
    setupScrollAnimations();

    // Add typing effect to hero title
    addTypingEffect();
});

// Comprehensive Language Translation System
const translations = {
    'en': {
        // Navigation
        'site-name': 'Kisan Circle',
        'nav-home': 'Home',
        'nav-features': 'Features',
        'nav-community': 'Community',
        'nav-schemes': 'Schemes',
        'nav-experts': 'Experts',
        'nav-contact': 'Contact',
        
        // Hero Section
        'hero-title': 'Welcome to Kisan Circle',
        'hero-subtitle': 'Connecting Farmers, Research, and Government in India\'s Digital Agriculture Ecosystem',
        'join-community': 'Join Community',
        'explore-features': 'Explore Features',
        
        // Vision Section
        'vision-title': 'Our Vision',
        'vision-description': 'Kisan Circle connects farmers, government agriculture authorities, and research institutions in a collaborative ecosystem. The platform empowers every Indian farmer with easy access to relevant information, actionable expert advice, and a supportive digital community—bridging the gap between research, policy, and rural life in the most accessible way possible.',
        
        // Features Section
        'features-title': 'Core Features',
        'farmer-hub-title': '🌾 Farmer Community Hub',
        'farmer-hub-experience': 'Experience Sharing: Create posts with images and videos detailing farm practices',
        'farmer-hub-qa': 'Interactive Q&A: Ask questions and engage with the farming community',
        'farmer-hub-rating': 'Peer Rating System: Rate advice for practical value',
        'farmer-hub-solving': 'Real-time Problem Solving: Social and immediate solutions',
        'farmer-hub-btn': 'Join Community',
        
        'expert-title': '🏛️ Expert & Institutional Pages',
        'expert-research': 'Verified Research: Dedicated sections for recognized institutes',
        'expert-publications': 'Official Publications: Direct access to research papers',
        'expert-findings': 'Breakthrough Findings: Latest scientific discoveries',
        'expert-consultation': 'Expert Consultation: Direct access to agricultural experts',
        'expert-btn': 'View Experts',
        
        'schemes-title': '🏛️ Government Schemes & Portal',
        'schemes-info': 'Centralized Information: User-friendly portal for schemes',
        'schemes-docs': 'Document Guidelines: Clear eligibility information',
        'schemes-regional': 'Regional Customization: Tailored instructions by region',
        'schemes-support': 'Support Programs: Comprehensive coverage',
        'schemes-btn': 'Browse Schemes',
        
        'multilingual-title': '🌐 Multilingual Accessibility',
        'multilingual-regional': 'Regional Languages: Multiple Indian languages supported',
        'multilingual-inclusive': 'Inclusive Design: No farmer left behind',
        'multilingual-context': 'Cultural Context: Adapted to regional practices',
        'multilingual-translation': 'Easy Translation: One-click language switching',
        'multilingual-btn': 'Switch Language',
        
        'notifications-title': '📲 Smart Notification System',
        'notifications-weather': 'Weather Alerts: Timely weather updates',
        'notifications-market': 'Market Prices: Real-time mandi prices',
        'notifications-disease': 'Disease Outbreaks: Early warning system',
        'notifications-govt': 'Government Updates: New initiatives and policies',
        'notifications-btn': 'Enable Alerts',
        
        'privacy-title': '🔒 Privacy & Security',
        'privacy-protection': 'Data Protection: Strong privacy policies',
        'privacy-consent': 'User Consent: No data sharing without consent',
        'privacy-communication': 'Secure Communication: Protected interactions',
        'privacy-trust': 'Trust Framework: Building digital confidence',
        'privacy-btn': 'Learn More',
        
        // Community Section
        'community-title': 'Join Our Farming Community',
        'community-farmers': 'Active Farmers',
        'community-discussions': 'Daily Discussions',
        'community-solutions': 'Expert Solutions',
        'community-states': 'States Covered',
        'community-form-title': 'Share Your Farming Experience',
        'community-name-placeholder': 'Your Name',
        'community-location-placeholder': 'Location (District, State)',
        'community-crop-select': 'Select Your Crop',
        'community-crop-rice': 'Rice',
        'community-crop-wheat': 'Wheat',
        'community-crop-cotton': 'Cotton',
        'community-crop-sugarcane': 'Sugarcane',
        'community-crop-other': 'Other',
        'community-experience-placeholder': 'Share your farming experience, tips, or ask questions...',
        'community-submit': 'Share Experience',
        
        // Government Schemes Section
        'govt-schemes-title': 'Government Agriculture Schemes',
        'pm-kisan-title': 'PM-KISAN Scheme',
        'pm-kisan-desc': 'Direct income support to farmers with ₹6000 per year',
        'pm-kisan-eligibility': 'Eligibility: All land-holding farmers',
        'pm-kisan-btn': 'Apply Now',
        
        'crop-insurance-title': 'Crop Insurance Scheme',
        'crop-insurance-desc': 'Protection against crop loss due to natural calamities',
        'crop-insurance-eligibility': 'Eligibility: All farmers',
        'crop-insurance-btn': 'Learn More',
        
        'soil-health-title': 'Soil Health Card',
        'soil-health-desc': 'Free soil testing and nutrient recommendations',
        'soil-health-eligibility': 'Eligibility: All farmers',
        'soil-health-btn': 'Get Card',
        
        'kisan-credit-title': 'Kisan Credit Card',
        'kisan-credit-desc': 'Easy credit access for agricultural needs',
        'kisan-credit-eligibility': 'Eligibility: Land-owning farmers',
        'kisan-credit-btn': 'Apply',
        
        // Experts Section
        'experts-title': 'Agricultural Experts & Institutions',
        'expert-dr-rajesh': 'Dr. Rajesh Kumar',
        'expert-soil-science': 'Soil Science Expert',
        'expert-icar': 'ICAR - Indian Agricultural Research Institute',
        'expert-dr-priya': 'Dr. Priya Sharma',
        'expert-crop-protection': 'Crop Protection Specialist',
        'expert-punjab': 'Punjab Agricultural University',
        'expert-dr-arun': 'Dr. Arun Patel',
        'expert-horticulture': 'Horticulture Expert',
        'expert-horticultural': 'Indian Institute of Horticultural Research',
        'expert-consult-btn': 'Consult',
        
        // Technology Stack
        'tech-stack-title': 'Technology Stack',
        'tech-frontend': 'Frontend',
        'tech-backend': 'Backend',
        'tech-database': 'Database',
        
        // Contact Section
        'contact-title': 'Contact Us',
        'contact-get-in-touch': 'Get in Touch',
        'contact-name-placeholder': 'Your Name',
        'contact-email-placeholder': 'Your Email',
        'contact-subject-placeholder': 'Subject',
        'contact-message-placeholder': 'Your Message',
        'contact-send-btn': 'Send Message',
        
        // Footer
        'footer-tagline': 'Empowering Indian Agriculture Through Digital Innovation',
        'footer-quick-links': 'Quick Links',
        'footer-support': 'Support',
        'footer-community': 'Community',
        'footer-documentation': 'Documentation',
        'footer-privacy': 'Privacy Policy',
        'footer-terms': 'Terms of Service',
        'footer-github': 'GitHub',
        'footer-discussions': 'Discussions',
        'footer-contributing': 'Contributing',
        'footer-support-link': 'Support',
        'footer-copyright': '© 2024 Kisan Circle. Licensed under MIT License.'
    },
    
    'hi': {
        // Navigation
        'site-name': 'किसान सर्कल',
        'nav-home': 'होम',
        'nav-features': 'सुविधाएं',
        'nav-community': 'समुदाय',
        'nav-schemes': 'योजनाएं',
        'nav-experts': 'विशेषज्ञ',
        'nav-contact': 'संपर्क',
        
        // Hero Section
        'hero-title': 'किसान सर्कल में आपका स्वागत है',
        'hero-subtitle': 'भारत के डिजिटल कृषि पारिस्थितिकी तंत्र में किसान, अनुसंधान और सरकार को जोड़ना',
        'join-community': 'समुदाय से जुड़ें',
        'explore-features': 'सुविधाओं का अन्वेषण करें',
        
        // Vision Section
        'vision-title': 'हमारी दृष्टि',
        'vision-description': 'किसान सर्कल किसानों, सरकारी कृषि अधिकारियों और अनुसंधान संस्थानों को एक सहयोगी पारिस्थितिकी तंत्र में जोड़ता है। यह प्लेटफॉर्म हर भारतीय किसान को प्रासंगिक जानकारी, कार्यात्मक विशेषज्ञ सलाह और एक सहायक डिजिटल समुदाय तक आसान पहुंच प्रदान करता है।',
        
        // Features Section
        'features-title': 'मुख्य सुविधाएं',
        'farmer-hub-title': '🌾 किसान समुदाय केंद्र',
        'farmer-hub-experience': 'अनुभव साझाकरण: खेती की प्रथाओं का विवरण देने वाली छवियों और वीडियो के साथ पोस्ट बनाएं',
        'farmer-hub-qa': 'इंटरैक्टिव प्रश्नोत्तर: प्रश्न पूछें और कृषि समुदाय के साथ जुड़ें',
        'farmer-hub-rating': 'सहयोगी रेटिंग सिस्टम: व्यावहारिक मूल्य के लिए सलाह को रेट करें',
        'farmer-hub-solving': 'रियल-टाइम समस्या समाधान: सामाजिक और तत्काल समाधान',
        'farmer-hub-btn': 'समुदाय में शामिल हों',
        
        'expert-title': '🏛️ विशेषज्ञ और संस्थागत पृष्ठ',
        'expert-research': 'सत्यापित अनुसंधान: मान्यता प्राप्त संस्थानों के लिए समर्पित अनुभाग',
        'expert-publications': 'आधिकारिक प्रकाशन: अनुसंधान पत्रों तक सीधी पहुंच',
        'expert-findings': 'नवीन खोजें: नवीनतम वैज्ञानिक खोजें',
        'expert-consultation': 'विशेषज्ञ परामर्श: कृषि विशेषज्ञों तक सीधी पहुंच',
        'expert-btn': 'विशेषज्ञ देखें',
        
        'schemes-title': '🏛️ सरकारी योजनाएं और पोर्टल',
        'schemes-info': 'केंद्रीकृत जानकारी: योजनाओं के लिए उपयोगकर्ता-अनुकूल पोर्टल',
        'schemes-docs': 'दस्तावेज़ दिशानिर्देश: स्पष्ट पात्रता जानकारी',
        'schemes-regional': 'क्षेत्रीय अनुकूलन: क्षेत्र के अनुसार तैयार निर्देश',
        'schemes-support': 'सहायता कार्यक्रम: व्यापक कवरेज',
        'schemes-btn': 'योजनाएं ब्राउज़ करें',
        
        'multilingual-title': '🌐 बहुभाषी पहुंच',
        'multilingual-regional': 'क्षेत्रीय भाषाएं: कई भारतीय भाषाओं में समर्थन',
        'multilingual-inclusive': 'समावेशी डिज़ाइन: कोई किसान पीछे न छूटे',
        'multilingual-context': 'सांस्कृतिक संदर्भ: क्षेत्रीय प्रथाओं के अनुकूल',
        'multilingual-translation': 'आसान अनुवाद: एक-क्लिक भाषा बदलाव',
        'multilingual-btn': 'भाषा बदलें',
        
        'notifications-title': '📲 स्मार्ट सूचना सिस्टम',
        'notifications-weather': 'मौसम अलर्ट: समय पर मौसम अपडेट',
        'notifications-market': 'बाजार भाव: रियल-टाइम मंडी भाव',
        'notifications-disease': 'रोग प्रकोप: प्रारंभिक चेतावनी प्रणाली',
        'notifications-govt': 'सरकारी अपडेट: नई पहल और नीतियां',
        'notifications-btn': 'अलर्ट सक्षम करें',
        
        'privacy-title': '🔒 गोपनीयता और सुरक्षा',
        'privacy-protection': 'डेटा सुरक्षा: मजबूत गोपनीयता नीतियां',
        'privacy-consent': 'उपयोगकर्ता सहमति: सहमति के बिना कोई डेटा साझाकरण नहीं',
        'privacy-communication': 'सुरक्षित संचार: सुरक्षित बातचीत',
        'privacy-trust': 'विश्वास ढांचा: डिजिटल विश्वास निर्माण',
        'privacy-btn': 'और जानें',
        
        // Community Section
        'community-title': 'हमारे कृषि समुदाय से जुड़ें',
        'community-farmers': 'सक्रिय किसान',
        'community-discussions': 'दैनिक चर्चा',
        'community-solutions': 'विशेषज्ञ समाधान',
        'community-states': 'कवर किए गए राज्य',
        'community-form-title': 'अपना कृषि अनुभव साझा करें',
        'community-name-placeholder': 'आपका नाम',
        'community-location-placeholder': 'स्थान (जिला, राज्य)',
        'community-crop-select': 'अपनी फसल चुनें',
        'community-crop-rice': 'चावल',
        'community-crop-wheat': 'गेहूं',
        'community-crop-cotton': 'कपास',
        'community-crop-sugarcane': 'गन्ना',
        'community-crop-other': 'अन्य',
        'community-experience-placeholder': 'अपना कृषि अनुभव, सुझाव साझा करें या प्रश्न पूछें...',
        'community-submit': 'अनुभव साझा करें',
        
        // Government Schemes Section
        'govt-schemes-title': 'सरकारी कृषि योजनाएं',
        'pm-kisan-title': 'पीएम-किसान योजना',
        'pm-kisan-desc': 'किसानों को ₹6000 प्रति वर्ष के साथ सीधी आय सहायता',
        'pm-kisan-eligibility': 'पात्रता: सभी भूमिधारी किसान',
        'pm-kisan-btn': 'अभी आवेदन करें',
        
        'crop-insurance-title': 'फसल बीमा योजना',
        'crop-insurance-desc': 'प्राकृतिक आपदाओं के कारण फसल नुकसान के खिलाफ सुरक्षा',
        'crop-insurance-eligibility': 'पात्रता: सभी किसान',
        'crop-insurance-btn': 'और जानें',
        
        'soil-health-title': 'मृदा स्वास्थ्य कार्ड',
        'soil-health-desc': 'मुफ्त मृदा परीक्षण और पोषक तत्व सिफारिशें',
        'soil-health-eligibility': 'पात्रता: सभी किसान',
        'soil-health-btn': 'कार्ड प्राप्त करें',
        
        'kisan-credit-title': 'किसान क्रेडिट कार्ड',
        'kisan-credit-desc': 'कृषि आवश्यकताओं के लिए आसान क्रेडिट पहुंच',
        'kisan-credit-eligibility': 'पात्रता: भूमिधारी किसान',
        'kisan-credit-btn': 'आवेदन करें',
        
        // Experts Section
        'experts-title': 'कृषि विशेषज्ञ और संस्थान',
        'expert-dr-rajesh': 'डॉ. राजेश कुमार',
        'expert-soil-science': 'मृदा विज्ञान विशेषज्ञ',
        'expert-icar': 'ICAR - भारतीय कृषि अनुसंधान संस्थान',
        'expert-dr-priya': 'डॉ. प्रिया शर्मा',
        'expert-crop-protection': 'फसल सुरक्षा विशेषज्ञ',
        'expert-punjab': 'पंजाब कृषि विश्वविद्यालय',
        'expert-dr-arun': 'डॉ. अरुण पटेल',
        'expert-horticulture': 'बागवानी विशेषज्ञ',
        'expert-horticultural': 'भारतीय बागवानी अनुसंधान संस्थान',
        'expert-consult-btn': 'परामर्श करें',
        
        // Technology Stack
        'tech-stack-title': 'प्रौद्योगिकी स्टैक',
        'tech-frontend': 'फ्रंटएंड',
        'tech-backend': 'बैकएंड',
        'tech-database': 'डेटाबेस',
        
        // Contact Section
        'contact-title': 'संपर्क करें',
        'contact-get-in-touch': 'संपर्क में रहें',
        'contact-name-placeholder': 'आपका नाम',
        'contact-email-placeholder': 'आपका ईमेल',
        'contact-subject-placeholder': 'विषय',
        'contact-message-placeholder': 'आपका संदेश',
        'contact-send-btn': 'संदेश भेजें',
        
        // Footer
        'footer-tagline': 'डिजिटल नवाचार के माध्यम से भारतीय कृषि को सशक्त बनाना',
        'footer-quick-links': 'त्वरित लिंक',
        'footer-support': 'सहायता',
        'footer-community': 'समुदाय',
        'footer-documentation': 'प्रलेखन',
        'footer-privacy': 'गोपनीयता नीति',
        'footer-terms': 'सेवा की शर्तें',
        'footer-github': 'GitHub',
        'footer-discussions': 'चर्चा',
        'footer-contributing': 'योगदान',
        'footer-support-link': 'सहायता',
        'footer-copyright': '© 2024 किसान सर्कल। MIT लाइसेंस के तहत लाइसेंस प्राप्त।'
    },
    
    'mr': {
        // Navigation
        'site-name': 'किसान सर्कल',
        'nav-home': 'मुख्य',
        'nav-features': 'वैशिष्ट्ये',
        'nav-community': 'समुदाय',
        'nav-schemes': 'योजना',
        'nav-experts': 'तज्ज्ञ',
        'nav-contact': 'संपर्क',
        
        // Hero Section
        'hero-title': 'किसान सर्कलमध्ये आपले स्वागत आहे',
        'hero-subtitle': 'भारताच्या डिजिटल कृषी परिसंस्थेत शेतकरी, संशोधन आणि सरकार यांना जोडणे',
        'join-community': 'समुदायात सामील व्हा',
        'explore-features': 'वैशिष्ट्यांचा शोध घ्या',
        
        // Vision Section
        'vision-title': 'आमची दृष्टी',
        'vision-description': 'किसान सर्कल शेतकऱ्यांना, सरकारी कृषी अधिकारी आणि संशोधन संस्थांना एका सहयोगी परिसंस्थेत जोडते। हे प्लॅटफॉर्म प्रत्येक भारतीय शेतकऱ्याला संबंधित माहिती, कार्यात्मक तज्ञ सल्ला आणि सहाय्यक डिजिटल समुदायाचा सहज प्रवेश देते.',
        
        // Add more Marathi translations...
        'features-title': 'मुख्य वैशिष्ट्ये',
        'community-title': 'आमच्या शेती समुदायात सामील व्हा',
        'govt-schemes-title': 'सरकारी कृषी योजना',
        'experts-title': 'कृषी तज्ञ आणि संस्था',
        'tech-stack-title': 'तंत्रज्ञान स्टॅक',
        'contact-title': 'संपर्क करा',
        'footer-tagline': 'डिजिटल नावीन्याद्वारे भारतीय शेतीला सशक्त करणे'
    },
    
    'gu': {
        // Navigation
        'site-name': 'કિસાન સર્કલ',
        'nav-home': 'ઘર',
        'nav-features': 'સુવિધાઓ',
        'nav-community': 'સમુદાય',
        'nav-schemes': 'યોજનાઓ',
        'nav-experts': 'નિષ્ણાતો',
        'nav-contact': 'સંપર્ક',
        
        // Hero Section
        'hero-title': 'કિસાન સર્કલમાં આપનું સ્વાગત છે',
        'hero-subtitle': 'ભારતની ડિજિટલ કૃષિ પર્યાવરણ વ્યવસ્થામાં ખેડૂતો, સંશોધન અને સરકારને જોડવું',
        'join-community': 'સમુદાયમાં જોડાઓ',
        'explore-features': 'સુવિધાઓનું અન્વેષણ કરો',
        
        // Vision Section
        'vision-title': 'અમારી દ્રષ્ટિ',
        'vision-description': 'કિસાન સર્કલ ખેડૂતો, સરકારી કૃષિ અધિકારીઓ અને સંશોધન સંસ્થાઓને સહયોગી પર્યાવરણ વ્યવસ્થામાં જોડે છે. આ પ્લેટફોર્મ દરેક ભારતીય ખેડૂતને સંબંધિત માહિતી, કાર્યાત્મક નિષ્ણાત સલાહ અને સહાયક ડિજિટલ સમુદાયની સરળ પહોંચ પ્રદાન કરે છે.',
        
        // Add more Gujarati translations...
        'features-title': 'મુખ્ય સુવિધાઓ',
        'community-title': 'અમારા કૃષિ સમુદાયમાં જોડાઓ',
        'govt-schemes-title': 'સરકારી કૃષિ યોજનાઓ',
        'experts-title': 'કૃષિ નિષ્ણાતો અને સંસ્થાઓ',
        'tech-stack-title': 'ટેક્નોલોજી સ્ટેક',
        'contact-title': 'સંપર્ક કરો',
        'footer-tagline': 'ડિજિટલ નવીનતા દ્વારા ભારતીય કૃષિને સશક્ત બનાવવું'
    }
};

function changeLanguage(language) {
    if (translations[language]) {
        // Update all elements with data-translate attributes
        Object.keys(translations[language]).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            });
        });
        
        // Update document title
        document.title = translations[language]['site-name'] + ' - ' + translations[language]['hero-subtitle'];
        
        // Update page language attribute
        document.documentElement.lang = language;
        
        // Show notification
        showNotification(`Language changed to ${getLanguageName(language)}`, 'info');
    }
}

function getLanguageName(code) {
    const names = {
        'en': 'English',
        'hi': 'हिंदी',
        'mr': 'मराठी', 
        'gu': 'ગુજરાતી'
    };
    return names[code] || code;
}

// Community Form Submission
function handleCommunityFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sharing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for sharing your experience! Your post will be reviewed and published soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Contact Form Submission
function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Feature Buttons Setup
function setupFeatureButtons() {
    document.querySelectorAll('.feature-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const featureTitle = this.closest('.feature-card').querySelector('h3').textContent;
            showFeatureModal(featureTitle);
        });
    });
}

// Scheme Buttons Setup
function setupSchemeButtons() {
    document.querySelectorAll('.scheme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const schemeTitle = this.closest('.scheme-card').querySelector('h3').textContent;
            showSchemeModal(schemeTitle);
        });
    });
}

// Expert Buttons Setup
function setupExpertButtons() {
    document.querySelectorAll('.expert-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const expertName = this.closest('.expert-card').querySelector('h3').textContent;
            showExpertModal(expertName);
        });
    });
}

// Hero Buttons Setup
function setupHeroButtons() {
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Join Community')) {
                document.querySelector('#community').scrollIntoView({ behavior: 'smooth' });
            } else if (this.textContent.includes('Explore Features')) {
                document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Modal Functions
function showFeatureModal(title) {
    const modal = createModal(
        `${title} - Coming Soon!`,
        `This feature is currently under development. Join our community to get notified when ${title.replace(/🌾|🏛️|🌐|📲|🔒/g, '')} becomes available.`,
        [
            { text: 'Join Community', action: () => document.querySelector('#community').scrollIntoView({ behavior: 'smooth' }) },
            { text: 'Close', action: null }
        ]
    );
    document.body.appendChild(modal);
}

function showSchemeModal(title) {
    const schemeInfo = {
        'PM-KISAN Scheme': {
            description: 'The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme launched in 2019 to provide income support to all land holding farmers.',
            benefits: ['₹6000 per year in 3 equal installments', 'Direct benefit transfer to bank account', 'No income criteria'],
            eligibility: 'All landholding farmers (excluding institutional landholders)',
            documents: ['Aadhaar Card', 'Bank Account Details', 'Land Records']
        },
        'Crop Insurance Scheme': {
            description: 'Pradhan Mantri Fasal Bima Yojana provides financial support to farmers in case of crop failure due to natural calamities.',
            benefits: ['Premium subsidy up to 90%', 'Coverage for all food crops', 'Quick claim settlement'],
            eligibility: 'All farmers including tenant farmers and sharecroppers',
            documents: ['Aadhaar Card', 'Bank Account', 'Sowing Certificate', 'Land Records']
        }
    };

    const info = schemeInfo[title] || {
        description: 'This scheme provides various benefits to farmers. Please contact your nearest agriculture office for detailed information.',
        benefits: ['Various agricultural benefits', 'Financial assistance', 'Technical support'],
        eligibility: 'Eligible farmers as per scheme guidelines',
        documents: ['Required documents as specified']
    };

    const content = `
        <div class="scheme-modal-content">
            <h3>${title}</h3>
            <p>${info.description}</p>
            <h4>Benefits:</h4>
            <ul>${info.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
            <h4>Eligibility:</h4>
            <p>${info.eligibility}</p>
            <h4>Required Documents:</h4>
            <ul>${info.documents.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>
    `;

    const modal = createModal('Scheme Details', content, [
        { text: 'Apply Online', action: () => showNotification('Redirecting to official portal...', 'info') },
        { text: 'Close', action: null }
    ]);
    document.body.appendChild(modal);
}

function showExpertModal(expertName) {
    const modal = createModal(
        `Consult ${expertName}`,
        `Would you like to schedule a consultation with ${expertName}? Our experts are available for video calls and written consultations.`,
        [
            { text: 'Schedule Video Call', action: () => showNotification('Feature coming soon! Please contact us directly.', 'info') },
            { text: 'Written Consultation', action: () => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) },
            { text: 'Close', action: null }
        ]
    );
    document.body.appendChild(modal);
}

// Generic Modal Creator
function createModal(title, content, buttons) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                ${buttons.map(btn => `<button class="btn ${btn.text === 'Close' ? 'btn-secondary' : 'btn-primary'}" data-action="${btn.text}">${btn.text}</button>`).join('')}
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        .modal {
            background: white;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h2 {
            color: #1B5E20;
            margin: 0;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }
        .modal-body {
            padding: 1.5rem;
            color: #333;
        }
        .modal-footer {
            padding: 1rem 1.5rem;
            border-top: 1px solid #eee;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }
        .scheme-modal-content h4 {
            color: #2E7D32;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }
        .scheme-modal-content ul {
            margin-left: 1rem;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Event listeners
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close') || e.target.dataset.action === 'Close') {
            document.body.removeChild(modal);
        }
    });

    buttons.forEach(btn => {
        if (btn.action) {
            modal.addEventListener('click', function(e) {
                if (e.target.dataset.action === btn.text) {
                    btn.action();
                    document.body.removeChild(modal);
                }
            });
        }
    });

    return modal;
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                padding: 1rem;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                border-left: 4px solid #4CAF50;
            }
            .notification-success {
                border-left-color: #4CAF50;
            }
            .notification-error {
                border-left-color: #f44336;
            }
            .notification-info {
                border-left-color: #2196F3;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .notification-content i {
                color: #4CAF50;
                font-size: 1.2rem;
            }
            .notification-error .notification-content i {
                color: #f44336;
            }
            .notification-info .notification-content i {
                color: #2196F3;
            }
            .notification-close {
                position: absolute;
                top: 5px;
                right: 10px;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);

    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    });
}

// Animated Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
    let current = 0;
    const increment = target / 50;
    const suffix = counter.textContent.replace(/[0-9,]/g, '');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 40);
}

// Scroll Animations
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.feature-card, .scheme-card, .expert-card, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typing Effect for Hero Title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
}
