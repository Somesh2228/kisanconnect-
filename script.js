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
    if (languageSelect) {
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
    
    // Initialize social platform features
    initializeSocialPlatform();
    
    // Initialize messaging if on messages section
    if (window.location.hash === '#messages' || document.getElementById('conversationsList')) {
        initializeMessaging();
    }
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
        'footer-copyright': '© 2024 Kisan Circle. Licensed under MIT License.',
        
        // Social Platform Features
        'login': 'Login',
        'signup': 'Sign Up',
        'login-title': 'Login to Kisan Circle',
        'signup-title': 'Join Kisan Circle',
        'phone-email': 'Phone Number or Email',
        'password': 'Password',
        'login-btn': 'Login',
        'signup-btn': 'Sign Up',
        'no-account': 'Don\'t have an account?',
        'have-account': 'Already have an account?',
        'full-name': 'Full Name',
        'phone-number': 'Phone Number',
        'email': 'Email',
        'location': 'Location (District, State)',
        'farming-experience': 'Farming Experience',
        'primary-crops': 'Primary Crops',
        'my-profile': 'My Profile',
        'my-posts': 'My Posts',
        'settings': 'Settings',
        'logout': 'Logout',
        'nav-feed': 'Community Feed',
        'nav-trending': 'Trending',
        'nav-messages': 'Messages',
        'community-feed-title': 'Community Feed',
        'share-experience': 'Share Your Experience',
        'create-post-title': 'Share Your Farming Experience',
        'post-title': 'Title',
        'post-description': 'Description',
        'post-category': 'Category',
        'add-media': 'Add Photos or Videos',
        'drag-drop': 'Drag and drop files here or click to browse',
        'cancel': 'Cancel',
        'post-submit': 'Share Post',
        'trending-title': 'Trending in Agriculture',
        'all': 'All',
        'crop-tips': 'Crop Tips',
        'pest-control': 'Pest Control',
        'success-stories': 'Success Stories',
        'questions': 'Questions',
        'messages-title': 'Messages',
        'new-message': 'New Message',
        'new-message-title': 'Start New Conversation',
        'select-conversation': 'Select a conversation to start messaging',
        'message': 'Message',
        'view-profile': 'View Profile',
        'help-center': 'Help Center',
        'community-guidelines': 'Community Guidelines',
        'feedback': 'Feedback'
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
        'footer-copyright': '© 2024 किसान सर्कल। MIT लाइसेंस के तहत लाइसेंस प्राप्त।',
        
        // Social Platform Features
        'login': 'लॉगिन',
        'signup': 'साइन अप',
        'login-title': 'किसान सर्कल में लॉगिन करें',
        'signup-title': 'किसान सर्कल में शामिल हों',
        'phone-email': 'फोन नंबर या ईमेल',
        'password': 'पासवर्ड',
        'login-btn': 'लॉगिन करें',
        'signup-btn': 'साइन अप करें',
        'no-account': 'कोई खाता नहीं है?',
        'have-account': 'पहले से खाता है?',
        'full-name': 'पूरा नाम',
        'phone-number': 'फोन नंबर',
        'email': 'ईमेल',
        'location': 'स्थान (जिला, राज्य)',
        'farming-experience': 'खेती का अनुभव',
        'primary-crops': 'मुख्य फसलें',
        'my-profile': 'मेरा प्रोफ़ाइल',
        'my-posts': 'मेरे पोस्ट',
        'settings': 'सेटिंग्स',
        'logout': 'लॉगआउट',
        'nav-feed': 'समुदायिक फीड',
        'nav-trending': 'ट्रेंडिंग',
        'nav-messages': 'संदेश',
        'community-feed-title': 'समुदायिक फीड',
        'share-experience': 'अपना अनुभव साझा करें',
        'create-post-title': 'अपना खेती का अनुभव साझा करें',
        'post-title': 'शीर्षक',
        'post-description': 'विवरण',
        'post-category': 'श्रेणी',
        'add-media': 'फोटो या वीडियो जोड़ें',
        'drag-drop': 'फ़ाइलें यहाँ खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें',
        'cancel': 'रद्द करें',
        'post-submit': 'पोस्ट साझा करें',
        'trending-title': 'कृषि में ट्रेंडिंग',
        'all': 'सभी',
        'crop-tips': 'फसल के टिप्स',
        'pest-control': 'कीट नियंत्रण',
        'success-stories': 'सफलता की कहानियाँ',
        'questions': 'प्रश्न',
        'messages-title': 'संदेश',
        'new-message': 'नया संदेश',
        'new-message-title': 'नई बातचीत शुरू करें',
        'select-conversation': 'मैसेजिंग शुरू करने के लिए कोई बातचीत चुनें',
        'message': 'संदेश',
        'view-profile': 'प्रोफ़ाइल देखें',
        'help-center': 'सहायता केंद्र',
        'community-guidelines': 'समुदायिक दिशानिर्देश',
        'feedback': 'फीडबैक'
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
        'tech-stack-title': 'टेक्नोलोजी स्टेक',
        'contact-title': 'संपर्क करो',
        'footer-tagline': 'डिजिटल नवीनता द्वारा भारतीय कृषिने सशक्त बनाववुं',
        
        // Social Platform Features
        'login': 'लॉगइन',
        'signup': 'साइन अप',
        'login-title': 'किसान सर्कलमां लॉगइन करो',
        'signup-title': 'किसान सर्कलमां जोडाओ',
        'phone-email': 'फोन नंबर अथवा ईमेल',
        'password': 'पासवर्ड',
        'login-btn': 'लॉगइन करो',
        'signup-btn': 'साइन अप करो',
        'no-account': 'खातुं नथी?',
        'have-account': 'पहेलेथी ज खातुं छे?',
        'full-name': 'पूरुं नाम',
        'phone-number': 'फोन नंबर',
        'email': 'ईमेल',
        'location': 'स्थळ (जिल्लो, राज्य)',
        'farming-experience': 'खेतीनो अनुभव',
        'primary-crops': 'मुख्य पाको',
        'my-profile': 'मारी प्रोफाइल',
        'my-posts': 'मारा पोस्ट',
        'settings': 'सेटिंग्स',
        'logout': 'लॉगआउट',
        'nav-feed': 'समुदाय फीड',
        'nav-trending': 'ट्रेन्डिंग',
        'nav-messages': 'संदेशो',
        'community-feed-title': 'समुदाय फीड',
        'share-experience': 'तमारो अनुभव शेर करो',
        'create-post-title': 'तमारो खेतीनो अनुभव शेर करो',
        'post-title': 'शीर्षक',
        'post-description': 'विवरण',
        'post-category': 'श्रेणी',
        'add-media': 'फोटो अथवा वीडियो उमेरो',
        'drag-drop': 'फाइल्स अहीं खेंचो अने मूको अथवा ब्राउझ करवा माटे क्लिक करो',
        'cancel': 'रद करो',
        'post-submit': 'पोस्ट शेर करो',
        'trending-title': 'कृषिमां ट्रेन्डिंग',
        'all': 'बधा',
        'crop-tips': 'पाकनी टिप्स',
        'pest-control': 'जीवात नियंत्रण',
        'success-stories': 'सफळतानी वार्ताओ',
        'questions': 'प्रश्नो',
        'messages-title': 'संदेशो',
        'new-message': 'नवो संदेश',
        'new-message-title': 'नवी वातचीत शरू करो',
        'select-conversation': 'मेसेजिंग शरू करवा माटे कोई वातचीत पसंद करो',
        'message': 'संदेश',
        'view-profile': 'प्रोफाइल जुओ',
        'help-center': 'सहायता केन्द्र',
        'community-guidelines': 'समुदाय मार्गदर्शिका',
        'feedback': 'प्रतिसाद'
        
        // Social Platform Features
        'login': 'लॉगिन',
        'signup': 'साइन अप',
        'login-title': 'किसान सर्कल मध्ये लॉगिन करा',
        'signup-title': 'किसान सर्कल मध्ये सामील व्हा',
        'phone-email': 'फोन नंबर किंवा ईमेल',
        'password': 'पासवर्ड',
        'login-btn': 'लॉगिन करा',
        'signup-btn': 'साइन अप करा',
        'no-account': 'कोणते खाते नाही?',
        'have-account': 'आधीपासून खाते आहे?',
        'full-name': 'पूर्ण नाव',
        'phone-number': 'फोन नंबर',
        'email': 'ईमेल',
        'location': 'स्थान (जिल्हा, राज्य)',
        'farming-experience': 'शेतीचा अनुभव',
        'primary-crops': 'मुख्य पिके',
        'my-profile': 'माझा प्रोफाइल',
        'my-posts': 'माझे पोस्ट',
        'settings': 'सेटिंग्ज',
        'logout': 'लॉगआउट',
        'nav-feed': 'समुदायिक फीड',
        'nav-trending': 'ट्रेंडिंग',
        'nav-messages': 'संदेश',
        'community-feed-title': 'समुदायिक फीड',
        'share-experience': 'आपला अनुभव सांगा',
        'create-post-title': 'आपला शेतीचा अनुभव सामायिक करा',
        'post-title': 'शीर्षक',
        'post-description': 'वर्णन',
        'post-category': 'श्रेणी',
        'add-media': 'फोटो किंवा व्हिडिओ जोडा',
        'drag-drop': 'फाइल्स येथे खेचून आणून सोडा किंवा ब्राउझ करण्यासाठी क्लिक करा',
        'cancel': 'रद्द करा',
        'post-submit': 'पोस्ट सामायिक करा',
        'trending-title': 'शेतीमध्ये ट्रेंडिंग',
        'all': 'सर्व',
        'crop-tips': 'पिकांच्या टिप्स',
        'pest-control': 'किड नियंत्रण',
        'success-stories': 'यशाच्या कथा',
        'questions': 'प्रश्न',
        'messages-title': 'संदेश',
        'new-message': 'नवा संदेश',
        'new-message-title': 'नवीन संवाद सुरू करा',
        'select-conversation': 'मेसेजिंग सुरू करण्यासाठी एखादा संवाद निवडा',
        'message': 'संदेश',
        'view-profile': 'प्रोफाइल पहा',
        'help-center': 'सहाय्य केंद्र',
        'community-guidelines': 'समुदायिक मार्गदर्शक तत्त्वे',
        'feedback': 'फीडबॅक'
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
    const joinCommunityBtn = document.getElementById('joinCommunityBtn');
    const exploreFeaturesBtn = document.getElementById('exploreFeaturesBtn');
    
    // Join Community Button
    joinCommunityBtn?.addEventListener('click', function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        if (!currentUser) {
            // Not logged in - redirect to login
            showNotification('Please login to join our farming community!', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            // Already logged in - redirect to community with notification
            showNotification(`Welcome back, ${currentUser.name.split(' ')[0]}! Ready to share your farming experience?`, 'success');
            setTimeout(() => {
                window.location.href = 'community.html';
                // Set a flag for the community page to show the "share experience" notification
                localStorage.setItem('showShareNotification', 'true');
            }, 1500);
        }
    });
    
    // Explore Features Button
    exploreFeaturesBtn?.addEventListener('click', function() {
        showExploreModal();
    });
}

// Explore Features Modal Functions
function showExploreModal() {
    const modal = document.getElementById('exploreFeaturesModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add event listener for closing modal
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                hideExploreModal();
            }
        });
    }
}

function hideExploreModal() {
    const modal = document.getElementById('exploreFeaturesModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function navigateToFeature(page) {
    hideExploreModal();
    showNotification('Navigating to ' + page.replace('.html', '') + ' section...', 'info');
    setTimeout(() => {
        window.location.href = page;
    }, 1000);
}

// Add keyboard support for modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('exploreFeaturesModal');
        if (modal && modal.style.display === 'flex') {
            hideExploreModal();
        }
    }
});

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

// Modal Management Functions
function showModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
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

// ===== SOCIAL PLATFORM FEATURES =====

// Global state management
let currentUser = null;
let posts = [];
let conversations = [];
let currentConversation = null;
let mediaFiles = [];

// Initialize social platform features
function initializeSocialPlatform() {
    initializeAuth();
    initializePostCreation();
    initializeMessaging();
    loadSampleData();
    setupEventListeners();
}

// Authentication System
function initializeAuth() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
    
    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
}


function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForLoggedOutUser();
    showNotification('Successfully logged out. See you soon!', 'info');
}

function updateUIForLoggedInUser() {
    document.getElementById('userActions').style.display = 'none';
    document.getElementById('userProfile').style.display = 'flex';
    document.getElementById('currentUsername').textContent = currentUser.name.split(' ')[0];
    
    // Enable post creation
    document.getElementById('createPostBtn').style.display = 'block';
    
    // Show messages in navigation
    showMessagesSection();
}

function updateUIForLoggedOutUser() {
    document.getElementById('userActions').style.display = 'flex';
    document.getElementById('userProfile').style.display = 'none';
    
    // Hide post creation
    document.getElementById('createPostSection').style.display = 'none';
    document.getElementById('createPostBtn').style.display = 'none';
    
    // Hide messages
    hideMessagesSection();
}

// Post Creation System
function initializePostCreation() {
    const createPostBtn = document.getElementById('createPostBtn');
    const createPostSection = document.getElementById('createPostSection');
    const createPostForm = document.getElementById('createPostForm');
    const cancelPostBtn = document.getElementById('cancelPost');
    const mediaInput = document.getElementById('mediaInput');
    const uploadArea = document.getElementById('uploadArea');
    
    createPostBtn?.addEventListener('click', () => {
        if (!currentUser) {
            showNotification('Please login to share your experience!', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
            return;
        }
        createPostSection.style.display = createPostSection.style.display === 'none' ? 'block' : 'none';
    });
    
    cancelPostBtn?.addEventListener('click', () => {
        createPostSection.style.display = 'none';
        createPostForm.reset();
        clearMediaPreview();
    });
    
    createPostForm?.addEventListener('submit', handlePostSubmission);
    
    // Media upload handling
    mediaInput?.addEventListener('change', handleMediaUpload);
    
    // Drag and drop functionality
    uploadArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.background = '#F1F8E9';
    });
    
    uploadArea?.addEventListener('dragleave', () => {
        uploadArea.style.background = '';
    });
    
    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.background = '';
        const files = Array.from(e.dataTransfer.files);
        handleMediaFiles(files);
    });
    
    uploadArea?.addEventListener('click', () => {
        mediaInput.click();
    });
}

function handleMediaUpload(e) {
    const files = Array.from(e.target.files);
    handleMediaFiles(files);
}

function handleMediaFiles(files) {
    files.forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const mediaItem = {
                    id: generateId(),
                    file: file,
                    url: e.target.result,
                    type: file.type.startsWith('image/') ? 'image' : 'video'
                };
                mediaFiles.push(mediaItem);
                addMediaPreview(mediaItem);
            };
            reader.readAsDataURL(file);
        }
    });
}

function addMediaPreview(mediaItem) {
    const mediaPreview = document.getElementById('mediaPreview');
    const mediaElement = document.createElement('div');
    mediaElement.className = 'media-item';
    mediaElement.innerHTML = `
        ${mediaItem.type === 'image' 
            ? `<img src="${mediaItem.url}" alt="Preview">` 
            : `<video src="${mediaItem.url}" controls></video>`
        }
        <button class="media-remove" onclick="removeMediaItem('${mediaItem.id}')">&times;</button>
    `;
    mediaPreview.appendChild(mediaElement);
}

function removeMediaItem(itemId) {
    mediaFiles = mediaFiles.filter(item => item.id !== itemId);
    const mediaPreview = document.getElementById('mediaPreview');
    const mediaItems = mediaPreview.querySelectorAll('.media-item');
    mediaItems.forEach(item => {
        const button = item.querySelector('.media-remove');
        if (button && button.getAttribute('onclick').includes(itemId)) {
            item.remove();
        }
    });
}

function clearMediaPreview() {
    mediaFiles = [];
    document.getElementById('mediaPreview').innerHTML = '';
}

function handlePostSubmission(e) {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const description = document.getElementById('postDescription').value;
    const category = document.getElementById('postCategory').value;
    
    const newPost = {
        id: generateId(),
        author: currentUser,
        title,
        description,
        category,
        media: [...mediaFiles],
        timestamp: new Date().toISOString(),
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10),
        trending: Math.random() > 0.7
    };
    
    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Reset form
    e.target.reset();
    clearMediaPreview();
    document.getElementById('createPostSection').style.display = 'none';
    
    // Refresh posts display
    displayPosts();
    displayTrendingPosts();
    
    showNotification('Your post has been shared successfully!', 'success');
}

// Posts Display System
function displayPosts() {
    const postsFeed = document.getElementById('postsFeed');
    if (!postsFeed) return;
    
    postsFeed.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsFeed.appendChild(postElement);
    });
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    
    const mediaHtml = post.media.length > 0 ? `
        <div class="post-media">
            ${post.media.map(media => 
                media.type === 'image' 
                    ? `<img src="${media.url}" alt="Post media" onclick="openMediaModal('${media.url}', 'image')">` 
                    : `<video src="${media.url}" controls></video>`
            ).join('')}
        </div>
    ` : '';
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">${post.author.avatar}</div>
            <div class="post-user-info">
                <h4>${post.author.name}</h4>
                <div class="post-meta">${post.author.location} • ${timeAgo(post.timestamp)}</div>
            </div>
            <div class="post-category">${getCategoryName(post.category)}</div>
        </div>
        <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-description">${post.description}</p>
            ${mediaHtml}
        </div>
        <div class="post-actions">
            <button class="action-btn" onclick="togglePostLike('${post.id}')">
                <i class="fas fa-heart"></i>
                <span class="action-count">${post.likes}</span>
            </button>
            <button class="action-btn" onclick="openCommentsModal('${post.id}')">
                <i class="fas fa-comment"></i>
                <span class="action-count">${post.comments}</span>
            </button>
            <button class="action-btn" onclick="sharePost('${post.id}')">
                <i class="fas fa-share"></i>
                <span class="action-count">${post.shares}</span>
            </button>
            <button class="action-btn" onclick="startConversationWithAuthor('${post.author.id}')">
                <i class="fas fa-message"></i>
                <span>Message</span>
            </button>
        </div>
    `;
    
    return postDiv;
}

// Trending System
function displayTrendingPosts() {
    const trendingContainer = document.getElementById('trendingPosts');
    if (!trendingContainer) return;
    
    const trendingPosts = posts.filter(post => post.trending || post.likes > 30).slice(0, 6);
    
    trendingContainer.innerHTML = '';
    
    trendingPosts.forEach(post => {
        const trendingElement = document.createElement('div');
        trendingElement.className = 'trending-post';
        trendingElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.description.substring(0, 100)}...</p>
            <div class="trending-stats">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
                <span class="trending-badge">Trending</span>
            </div>
        `;
        trendingElement.addEventListener('click', () => scrollToPost(post.id));
        trendingContainer.appendChild(trendingElement);
    });
    
    // Setup trending tabs
    setupTrendingTabs();
}

function setupTrendingTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter posts by category
            const category = tab.getAttribute('data-category');
            filterTrendingPosts(category);
        });
    });
}

function filterTrendingPosts(category) {
    const trendingContainer = document.getElementById('trendingPosts');
    let filteredPosts;
    
    if (category === 'all') {
        filteredPosts = posts.filter(post => post.trending || post.likes > 30);
    } else {
        filteredPosts = posts.filter(post => post.category === category && (post.trending || post.likes > 20));
    }
    
    trendingContainer.innerHTML = '';
    
    filteredPosts.slice(0, 6).forEach(post => {
        const trendingElement = document.createElement('div');
        trendingElement.className = 'trending-post';
        trendingElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.description.substring(0, 100)}...</p>
            <div class="trending-stats">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
                <span class="trending-badge">${getCategoryName(category)}</span>
            </div>
        `;
        trendingElement.addEventListener('click', () => scrollToPost(post.id));
        trendingContainer.appendChild(trendingElement);
    });
}

// Messaging System
function initializeMessaging() {
    const newMessageBtn = document.getElementById('newMessageBtn');
    const newMessageModal = document.getElementById('newMessageModal');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    
    newMessageBtn?.addEventListener('click', () => {
        if (!currentUser) {
            showNotification('Please login to send messages!', 'info');
            return;
        }
        showModal(newMessageModal);
    loadUsersForMessaging();
    });
    
    messageInput?.addEventListener('input', (e) => {
        sendMessageBtn.disabled = e.target.value.trim() === '';
    });
    
    sendMessageBtn?.addEventListener('click', sendMessage);
    
    // Setup message navigation
    document.querySelectorAll('.message-expert').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const expertId = e.target.getAttribute('data-expert');
            if (!currentUser) {
                showNotification('Please login to message experts!', 'info');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
                return;
            }
            startConversationWithExpert(expertId);
        });
    });
}

// Utility Functions
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function timeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return time.toLocaleDateString();
}

function getCategoryName(category) {
    const categories = {
        'crop-tips': 'Crop Tips',
        'pest-control': 'Pest Control', 
        'irrigation': 'Irrigation',
        'fertilizer': 'Fertilizer',
        'weather': 'Weather & Climate',
        'equipment': 'Equipment & Tools',
        'market-price': 'Market Prices',
        'success-story': 'Success Story',
        'question': 'Question/Help'
    };
    return categories[category] || category;
}

// Messages Section Management
function showMessagesSection() {
    const messagesSection = document.getElementById('messages');
    const messagesLink = document.querySelector('a[href="#messages"]');
    if (messagesSection && messagesLink) {
        messagesSection.style.display = 'block';
        messagesLink.parentElement.style.display = 'block';
    }
}

function hideMessagesSection() {
    const messagesSection = document.getElementById('messages');
    const messagesLink = document.querySelector('a[href="#messages"]');
    if (messagesSection && messagesLink) {
        messagesSection.style.display = 'none';
        messagesLink.parentElement.style.display = 'none';
    }
}

// Sample data loading
function loadSampleData() {
    // Load sample posts if none exist
    if (posts.length === 0) {
        posts = [
            {
                id: 'post_1',
                author: {
                    id: 'farmer_1',
                    name: 'Ramesh Sharma',
                    location: 'Punjab, India',
                    avatar: 'R'
                },
                title: 'Successful Organic Rice Farming Techniques',
                description: 'I have been practicing organic rice farming for the past 5 years. Here are the key techniques that have helped me increase yield by 30% while reducing costs.',
                category: 'success-story',
                media: [],
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 45,
                comments: 12,
                shares: 8,
                trending: true
            },
            {
                id: 'post_2',
                author: {
                    id: 'farmer_2',
                    name: 'Sunita Patel',
                    location: 'Gujarat, India',
                    avatar: 'S'
                },
                title: 'How to Control Cotton Bollworm Naturally',
                description: 'Share your experiences with natural pest control methods. I have found neem oil spray to be very effective.',
                category: 'pest-control',
                media: [],
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                likes: 32,
                comments: 18,
                shares: 5,
                trending: true
            },
            {
                id: 'post_3',
                author: {
                    id: 'farmer_3',
                    name: 'Anil Kumar',
                    location: 'Maharashtra, India',
                    avatar: 'A'
                },
                title: 'Water-Efficient Drip Irrigation Setup',
                description: 'Installed drip irrigation system last season. Sharing my experience and cost breakdown for other farmers.',
                category: 'irrigation',
                media: [],
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                likes: 28,
                comments: 9,
                shares: 6,
                trending: false
            }
        ];
        displayPosts();
        displayTrendingPosts();
    }
}

// Social interaction functions
function togglePostLike(postId) {
    if (!currentUser) {
        showNotification('Please login to like posts!', 'info');
        return;
    }
    
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        displayPosts();
        displayTrendingPosts();
        showNotification('Post liked!', 'success');
    }
}

function openCommentsModal(postId) {
    showNotification('Comments feature coming soon!', 'info');
}

function sharePost(postId) {
    if (!currentUser) {
        showNotification('Please login to share posts!', 'info');
        return;
    }
    
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.shares += 1;
        displayPosts();
        displayTrendingPosts();
        showNotification('Post shared!', 'success');
    }
}

function scrollToPost(postId) {
    const feedSection = document.getElementById('feed');
    if (feedSection) {
        feedSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function startConversationWithAuthor(authorId) {
    if (!currentUser) {
        showNotification('Please login to send messages!', 'info');
        return;
    }
    showNotification('Direct messaging feature coming soon!', 'info');
}

function startConversationWithExpert(expertId) {
    if (!currentUser) {
        showNotification('Please login to message experts!', 'info');
        return;
    }
    
    // Switch to messages section
    showMessagesSection();
    document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });
    showNotification('Expert messaging feature coming soon!', 'info');
}

function loadUsersForMessaging() {
    // This would load actual users in a real application
    showNotification('User search feature coming soon!', 'info');
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        showNotification('Message sent!', 'success');
        messageInput.value = '';
        document.getElementById('sendMessageBtn').disabled = true;
    }
}

function openMediaModal(url, type) {
    const modal = createModal(
        'Media Viewer',
        type === 'image' 
            ? `<img src="${url}" style="max-width: 100%; height: auto;">` 
            : `<video src="${url}" controls style="max-width: 100%;">`,
        [{ text: 'Close', action: null }]
    );
    document.body.appendChild(modal);
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation active state on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Messages link click handler
    const messagesNavLink = document.querySelector('a[href="#messages"]');
    if (messagesNavLink) {
        messagesNavLink.addEventListener('click', (e) => {
            if (!currentUser) {
                e.preventDefault();
                showNotification('Please login to access messages!', 'info');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
                return;
            }
            
            const messagesSection = document.getElementById('messages');
            if (messagesSection) {
                messagesSection.style.display = 'block';
            }
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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
    };
    
    messageInput?.addEventListener('input', (e) => {
        sendMessageBtn.disabled = e.target.value.trim() === '';
    });
    
    sendMessageBtn?.addEventListener('click', sendMessage);
    
    messageInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !sendMessageBtn.disabled) {
            sendMessage();
        }
    });
    
    // Setup expert messaging
    document.querySelectorAll('.message-expert').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!currentUser) {
                showNotification('Please login to message experts!', 'info');
                return;
            }
            const expertId = e.target.getAttribute('data-expert');
            startConversationWithExpert(expertId);
        });
    });


function showMessagesSection() {
    const messagesLink = document.querySelector('a[href="#messages"]');
    if (messagesLink) {
        messagesLink.parentElement.style.display = 'block';
    }
}

function hideMessagesSection() {
    const messagesLink = document.querySelector('a[href="#messages"]');
    if (messagesLink) {
        messagesLink.parentElement.style.display = 'none';
    }
    document.getElementById('messages').style.display = 'none';
}

function loadUsersForMessaging() {
    const searchResults = document.getElementById('searchResults');
    const sampleUsers = [
        { id: 'dr-rajesh', name: 'Dr. Rajesh Kumar', type: 'expert', specialization: 'Soil Science' },
        { id: 'dr-priya', name: 'Dr. Priya Sharma', type: 'expert', specialization: 'Crop Protection' },
        { id: 'dr-arun', name: 'Dr. Arun Patel', type: 'expert', specialization: 'Horticulture' },
        { id: 'farmer1', name: 'Ramesh Patil', type: 'farmer', location: 'Maharashtra' },
        { id: 'farmer2', name: 'Suresh Kumar', type: 'farmer', location: 'Punjab' },
        { id: 'farmer3', name: 'Lakshmi Devi', type: 'farmer', location: 'Karnataka' }
    ];
    
    searchResults.innerHTML = '';
    
    sampleUsers.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'search-result-item';
        userElement.innerHTML = `
            <div class="user-avatar">${user.name.charAt(0)}</div>
            <div class="user-info">
                <h4>${user.name}</h4>
                <p>${user.type === 'expert' ? user.specialization : user.location}</p>
            </div>
        `;
        userElement.addEventListener('click', () => {
            startConversation(user);
            hideModal(document.getElementById('newMessageModal'));
        });
        searchResults.appendChild(userElement);
    });
}

function startConversation(user) {
    // Find existing conversation or create new one
    let conversation = conversations.find(conv => 
        conv.participants.some(p => p.id === user.id)
    );
    
    if (!conversation) {
        conversation = {
            id: generateId(),
            participants: [currentUser, user],
            messages: [],
            lastMessage: null,
            timestamp: new Date().toISOString()
        };
        conversations.push(conversation);
    }
    
    openConversation(conversation);
    
    // Show messages section
    document.getElementById('messages').style.display = 'block';
    setTimeout(() => {
        document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function startConversationWithExpert(expertId) {
    const experts = {
        'dr-rajesh': { id: 'dr-rajesh', name: 'Dr. Rajesh Kumar', type: 'expert', specialization: 'Soil Science' },
        'dr-priya': { id: 'dr-priya', name: 'Dr. Priya Sharma', type: 'expert', specialization: 'Crop Protection' },
        'dr-arun': { id: 'dr-arun', name: 'Dr. Arun Patel', type: 'expert', specialization: 'Horticulture' }
    };
    
    const expert = experts[expertId];
    if (expert) {
        startConversation(expert);
    }
}

function startConversationWithAuthor(authorId) {
    if (!currentUser) {
        showNotification('Please login to send messages!', 'info');
        return;
    }
    
    const post = posts.find(p => p.author.id === authorId);
    if (post) {
        startConversation(post.author);
    }
}

function openConversation(conversation) {
    currentConversation = conversation;
    
    // Update conversations sidebar
    updateConversationsList();
    
    // Update chat header
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    document.getElementById('chatUserName').textContent = otherParticipant.name;
    document.getElementById('chatUserStatus').textContent = 'Online';
    
    // Display messages
    displayMessages(conversation.messages);
    
    // Show message input
    document.getElementById('messageInputArea').style.display = 'flex';
    
    // Hide no conversation message
    document.querySelector('.no-conversation').style.display = 'none';
}

function updateConversationsList() {
    const conversationsList = document.getElementById('conversationsList');
    conversationsList.innerHTML = '';
    
    conversations.forEach(conversation => {
        const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        
        const conversationElement = document.createElement('div');
        conversationElement.className = 'conversation-item';
        if (currentConversation && currentConversation.id === conversation.id) {
            conversationElement.classList.add('active');
        }
        
        conversationElement.innerHTML = `
            <div class="conversation-avatar">${otherParticipant.name.charAt(0)}</div>
            <div class="conversation-info">
                <h4>${otherParticipant.name}</h4>
                <p class="conversation-preview">${lastMessage ? lastMessage.content : 'Start a conversation...'}</p>
            </div>
            <div class="conversation-time">${lastMessage ? timeAgo(lastMessage.timestamp) : 'now'}</div>
        `;
        
        conversationElement.addEventListener('click', () => openConversation(conversation));
        conversationsList.appendChild(conversationElement);
    });
}

function displayMessages(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.senderId === currentUser.id ? 'sent' : 'received'}`;
        messageElement.innerHTML = `
            <div class="message-content">${message.content}</div>
            <div class="message-time">${formatTime(message.timestamp)}</div>
        `;
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const content = messageInput.value.trim();
    
    if (!content || !currentConversation) return;
    
    const message = {
        id: generateId(),
        senderId: currentUser.id,
        content,
        timestamp: new Date().toISOString()
    };
    
    currentConversation.messages.push(message);
    currentConversation.lastMessage = message;
    currentConversation.timestamp = message.timestamp;
    
    // Save conversations
    localStorage.setItem('conversations', JSON.stringify(conversations));
    
    // Update UI
    displayMessages(currentConversation.messages);
    updateConversationsList();
    
    // Clear input
    messageInput.value = '';
    document.getElementById('sendMessageBtn').disabled = true;
    
    // Simulate response (in real app, this would come from the other user)
    setTimeout(() => {
        simulateResponse();
    }, 2000 + Math.random() * 3000);
}

function simulateResponse() {
    if (!currentConversation) return;
    
    const otherParticipant = currentConversation.participants.find(p => p.id !== currentUser.id);
    const responses = [
        "Thank you for reaching out! How can I help you?",
        "That's a great question about farming practices.",
        "I'd be happy to share my experience with that crop.",
        "Have you tried organic methods for this issue?",
        "This is a common problem in our region. Here's what I recommend...",
        "Let me share some resources that might help you."
    ];
    
    const response = {
        id: generateId(),
        senderId: otherParticipant.id,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString()
    };
    
    currentConversation.messages.push(response);
    currentConversation.lastMessage = response;
    currentConversation.timestamp = response.timestamp;
    
    // Update UI
    displayMessages(currentConversation.messages);
    updateConversationsList();
    
    // Save conversations
    localStorage.setItem('conversations', JSON.stringify(conversations));
}

// Data Management
function loadSampleData() {
    // Load saved posts
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    } else {
        // Create sample posts
        posts = createSamplePosts();
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    
    // Load saved conversations
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
        conversations = JSON.parse(savedConversations);
    }
    
    // Display posts
    displayPosts();
    displayTrendingPosts();
    
    // Update conversations if user is logged in
    if (currentUser) {
        updateConversationsList();
    }
}

function createSamplePosts() {
    return [
        {
            id: 'post1',
            author: { id: 'farmer1', name: 'Ramesh Patil', location: 'Maharashtra, India', avatar: 'R' },
            title: 'Successful Organic Cotton Farming Method',
            description: 'After 3 years of trial, I have developed a completely organic method for cotton farming that increased my yield by 40% while reducing costs by 25%. Happy to share details!',
            category: 'success-story',
            media: [],
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 45,
            comments: 23,
            shares: 12,
            trending: true
        },
        {
            id: 'post2',
            author: { id: 'farmer2', name: 'Lakshmi Devi', location: 'Karnataka, India', avatar: 'L' },
            title: 'Effective Solution for Aphid Control',
            description: 'Discovered an effective natural spray made from neem oil and soap solution that completely eliminated aphids from my tomato crop. Recipe in comments!',
            category: 'pest-control',
            media: [],
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 38,
            comments: 17,
            shares: 8,
            trending: true
        },
        {
            id: 'post3',
            author: { id: 'farmer3', name: 'Suresh Kumar', location: 'Punjab, India', avatar: 'S' },
            title: 'Drip Irrigation Setup for Small Farms',
            description: 'Successfully installed a low-cost drip irrigation system for my 2-acre farm. Water usage reduced by 60% and yield improved. Sharing the complete setup guide.',
            category: 'irrigation',
            media: [],
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 52,
            comments: 31,
            shares: 19,
            trending: true
        }
    ];
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation for messages
    document.querySelector('a[href="#messages"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!currentUser) {
            showNotification('Please login to access messages!', 'info');
            return;
        }
        showMessagesSection();
        document.getElementById('messages').style.display = 'block';
        setTimeout(() => {
            document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
    
    // Join community button in hero
    document.querySelector('.join-community-btn')?.addEventListener('click', () => {
        if (!currentUser) {
            showModal(document.getElementById('signupModal'));
        } else {
            document.getElementById('feed').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return Math.floor(diffInSeconds / 60) + ' minutes ago';
    if (diffInSeconds < 86400) return Math.floor(diffInSeconds / 3600) + ' hours ago';
    if (diffInSeconds < 604800) return Math.floor(diffInSeconds / 86400) + ' days ago';
    
    return past.toLocaleDateString();
}

function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getCategoryName(category) {
    const categories = {
        'crop-tips': 'Crop Tips',
        'pest-control': 'Pest Control',
        'irrigation': 'Irrigation',
        'fertilizer': 'Fertilizer',
        'weather': 'Weather',
        'equipment': 'Equipment',
        'market-price': 'Market Price',
        'success-story': 'Success Story',
        'question': 'Question'
    };
    return categories[category] || category;
}

function showModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Post Interaction Functions
function togglePostLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += Math.random() > 0.5 ? 1 : -1;
        post.likes = Math.max(0, post.likes);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
        displayTrendingPosts();
    }
}

function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.shares += 1;
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
        showNotification('Post shared successfully!', 'success');
    }
}

function openCommentsModal(postId) {
    showNotification('Comments feature coming soon!', 'info');
}

function openMediaModal(url, type) {
    // Create a simple media modal
    const modal = createModal(
        'Media View',
        type === 'image' 
            ? `<img src="${url}" style="max-width: 100%; height: auto; border-radius: 8px;">` 
            : `<video src="${url}" controls style="max-width: 100%; height: auto; border-radius: 8px;"></video>`,
        [{ text: 'Close', action: null }]
    );
    document.body.appendChild(modal);
}

function scrollToPost(postId) {
    document.getElementById('feed').scrollIntoView({ behavior: 'smooth' });
}
