// Dummy Data Generator for Kisan Circle
// This file contains realistic Indian farmer profiles, posts, expert data, and interactions

// Indian Farmer Names Database
const indianFarmerNames = {
    male: [
        "Ramesh Singh", "Suresh Patel", "Rajesh Kumar", "Anil Sharma", "Vikram Singh Chauhan",
        "Keshav Joshi", "Mahesh Reddy", "Prakash Yadav", "Santosh Gupta", "Deepak Thakur",
        "Ravi Kumar", "Ashok Singh", "Mukesh Patel", "Vinod Sharma", "Naresh Yadav",
        "Girish Reddy", "Sunil Kumar", "Ajay Singh", "Manoj Patel", "Dinesh Kumar",
        "Harish Singh", "Yogesh Sharma", "Gopal Yadav", "Laxman Reddy", "Bharat Singh",
        "Mohan Kumar", "Jagdish Patel", "Kishanlal Sharma", "Ramchandra Singh", "Baldev Kumar"
    ],
    female: [
        "Sunita Devi", "Meera Patel", "Priya Sharma", "Anita Singh", "Savita Kumar",
        "Geeta Devi", "Radha Patel", "Sushma Sharma", "Kamala Singh", "Usha Devi",
        "Shanti Patel", "Pushpa Sharma", "Lalita Singh", "Rekha Kumar", "Seema Devi",
        "Manju Patel", "Parvati Sharma", "Vandana Singh", "Sumitra Devi", "Kiran Patel",
        "Asha Devi", "Sudha Sharma", "Prema Singh", "Kavita Patel", "Lata Devi"
    ]
};

// Indian States and Districts
const indianLocations = [
    "Jaipur, Rajasthan", "Ahmedabad, Gujarat", "Pune, Maharashtra", "Ludhiana, Punjab",
    "Bhopal, Madhya Pradesh", "Patna, Bihar", "Lucknow, Uttar Pradesh", "Hyderabad, Telangana",
    "Bengaluru, Karnataka", "Chennai, Tamil Nadu", "Kochi, Kerala", "Bhubaneswar, Odisha",
    "Raipur, Chhattisgarh", "Dehradun, Uttarakhand", "Ranchi, Jharkhand", "Guwahati, Assam",
    "Gandhinagar, Gujarat", "Nagpur, Maharashtra", "Indore, Madhya Pradesh", "Kanpur, Uttar Pradesh",
    "Surat, Gujarat", "Nashik, Maharashtra", "Amritsar, Punjab", "Jodhpur, Rajasthan",
    "Kota, Rajasthan", "Vadodara, Gujarat", "Aurangabad, Maharashtra", "Jalandhar, Punjab",
    "Agra, Uttar Pradesh", "Meerut, Uttar Pradesh", "Coimbatore, Tamil Nadu", "Madurai, Tamil Nadu",
    "Thiruvananthapuram, Kerala", "Vijayawada, Andhra Pradesh", "Visakhapatnam, Andhra Pradesh",
    "Mysore, Karnataka", "Mangalore, Karnataka", "Cuttack, Odisha", "Rourkela, Odisha"
];

// Crop Types
const cropTypes = [
    "Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Barley", "Jowar", "Bajra",
    "Groundnut", "Sesame", "Mustard", "Sunflower", "Soybean", "Tur", "Gram", "Lentil",
    "Tomato", "Potato", "Onion", "Garlic", "Chilli", "Turmeric", "Coriander", "Cumin",
    "Mango", "Banana", "Orange", "Apple", "Grapes", "Pomegranate", "Guava", "Papaya"
];

// Post Categories with realistic content
const postCategories = {
    "crop-tips": {
        titles: [
            "New {crop} variety gives amazing results!",
            "Best practices for {crop} cultivation",
            "How I increased {crop} yield by 30%",
            "Organic {crop} farming techniques that work",
            "Seasonal tips for growing {crop}",
            "{crop} spacing and planting guide",
            "Best fertilizers for {crop} in {season}",
            "Harvesting {crop} at the right time"
        ],
        content: [
            "I've been experimenting with different varieties and techniques for {crop} cultivation. The results have been remarkable with proper soil preparation and nutrient management.",
            "After years of traditional farming, I switched to modern techniques for {crop}. The investment in quality seeds and proper irrigation has paid off well.",
            "Sharing my experience with {crop} farming. The key is understanding soil health and using the right balance of organic and chemical fertilizers.",
            "This season's {crop} harvest exceeded expectations. I used integrated pest management and saw significant improvement in both quality and quantity.",
            "Fellow farmers, here's what I learned about {crop} cultivation after 15 years of farming. Timing is everything in agriculture."
        ]
    },
    "pest-control": {
        titles: [
            "Effective solution for {pest} in {crop}",
            "Organic pest control for {crop} that works",
            "How to prevent {pest} attack in {crop}",
            "Natural pesticide recipe for {crop}",
            "IPM techniques for {crop} protection"
        ],
        content: [
            "Been dealing with {pest} problem in my {crop} field. Found an effective organic solution that reduced pest damage by 80%. Here's the detailed recipe and application method.",
            "Integrated Pest Management has transformed my {crop} farming. Combining biological controls with minimal chemical intervention has given excellent results.",
            "After losing crops to {pest} last season, I developed a prevention strategy. Early detection and timely intervention is crucial for pest management.",
            "Sharing my homemade organic pesticide recipe that worked wonders for {crop}. It's cost-effective and environmentally friendly.",
            "Traditional knowledge combined with modern IPM techniques has helped me achieve pest-free {crop} cultivation."
        ]
    },
    "success-story": {
        titles: [
            "From 2 acres to 20 acres: My farming journey",
            "How I tripled my income with {crop} farming",
            "Organic certification changed my life",
            "From loss to profit: My {crop} success story",
            "Technology adoption in {crop} farming"
        ],
        content: [
            "Started with just 2 acres of inherited land. Today, I farm 20 acres using modern techniques. The key was gradual expansion, learning new methods, and building relationships with fellow farmers.",
            "Three years ago, I was struggling to make ends meet. Switching to {crop} cultivation and adopting scientific methods changed everything. Now my annual income has tripled.",
            "Getting organic certification was the best decision I made. My {crop} now sells at premium prices, and I have a steady buyer network. The initial investment was worth it.",
            "Last year was difficult due to pest attacks in {crop}. But with proper guidance from agricultural experts and fellow farmers, I recovered and had the best harvest this season.",
            "Embracing technology in farming has been a game-changer. From soil testing to weather monitoring, technology helps me make informed decisions about {crop} cultivation."
        ]
    },
    "question": {
        titles: [
            "Need help with {crop} disease identification",
            "Best time to plant {crop} in {location}?",
            "Which fertilizer is best for {crop}?",
            "How to improve soil health for {crop}?",
            "Market prices for {crop} - where to sell?"
        ],
        content: [
            "I'm seeing unusual symptoms in my {crop} plants. Leaves are turning yellow and there are brown spots. Has anyone experienced similar issues? What treatment worked for you?",
            "Planning to start {crop} cultivation next season. What's the ideal planting time in {location}? Also, which variety gives best results in our local climate?",
            "Confused about fertilizer selection for {crop}. There are so many options in the market. Experienced farmers, please share what works best for maximum yield.",
            "My soil test results show low organic matter. How can I improve soil health for better {crop} production? What organic amendments do you recommend?",
            "Harvesting {crop} soon but unsure about market rates. Where do you sell your produce for best prices? Any tips for post-harvest handling?"
        ]
    },
    "market-price": {
        titles: [
            "{crop} prices hit ₹{price}/kg in {location} mandi",
            "Good market rates for {crop} this season",
            "Price analysis: {crop} trends in {month}",
            "Best time to sell {crop} for maximum profit",
            "Market update: {crop} demand increasing"
        ],
        content: [
            "Great news for {crop} farmers! Market prices have reached ₹{price}/kg in our local mandi. This is {percentage}% higher than last month. Good time to sell if you have stock.",
            "After monitoring market trends, I sold my {crop} at ₹{price}/kg. The key is timing and understanding seasonal demand patterns. Transportation cost is also important to consider.",
            "Market analysis shows {crop} prices are expected to rise due to increased demand. Farmers who stored their produce are likely to get better rates next month.",
            "Been tracking {crop} prices across different mandis. Found significant price variation - sometimes ₹10-15/kg difference! Worth traveling to distant markets for better rates.",
            "Export demand for {crop} is increasing, leading to better local prices. Quality grading and proper packaging are essential for getting premium rates."
        ]
    },
    "irrigation": {
        titles: [
            "Drip irrigation setup for {crop} - complete guide",
            "Water management tips for {crop} in summer",
            "Sprinkler vs drip: What works for {crop}?",
            "Rainwater harvesting for sustainable farming",
            "Smart irrigation techniques for {crop}"
        ],
        content: [
            "Just completed drip irrigation installation for my {crop} field. Water usage reduced by 40% and yield increased by 25%. Sharing complete setup details and cost breakdown.",
            "Summer irrigation for {crop} requires careful planning. I use mulching and micro-irrigation to conserve water. The investment pays off with better crop health.",
            "Comparing different irrigation methods for {crop}. Drip irrigation works best for precision watering, while sprinklers are good for larger areas. Choose based on crop type and field size.",
            "Installed rainwater harvesting system last year. Now I have enough water for {crop} cultivation even during dry spells. It's sustainable and cost-effective long-term.",
            "Using soil moisture sensors and automated irrigation for {crop}. Technology helps optimize water usage and ensures crops get water exactly when needed."
        ]
    },
    "weather": {
        titles: [
            "Weather forecast impact on {crop} cultivation",
            "Preparing {crop} for monsoon season",
            "Heat wave protection for {crop} plants",
            "Frost damage prevention in {crop}",
            "Climate-smart {crop} varieties"
        ],
        content: [
            "Weather department predicts good monsoon this year. Planning to increase {crop} area accordingly. Proper drainage is essential to prevent waterlogging in fields.",
            "Unseasonal rains last week affected {crop} flowering. Implementing protective measures and fungicide spray to prevent disease outbreak. Fellow farmers, please share your experience.",
            "Extreme heat is stressing {crop} plants. Using shade nets and increased irrigation frequency. Mulching also helps in retaining soil moisture during hot weather.",
            "Frost warning issued for next week. Taking precautions to protect {crop} seedlings. Covering with cloth and using smudge pots in critical areas.",
            "Switched to climate-resilient {crop} varieties. They perform better under stress conditions and give stable yields despite weather variations. Highly recommend for sustainable farming."
        ]
    }
};

// Expert Specializations and Realistic Profiles
const expertProfiles = [
    {
        name: "Dr. Rajesh Kumar Singh",
        specialization: "Soil Science & Fertility Management",
        institution: "ICAR - Indian Agricultural Research Institute",
        location: "New Delhi",
        experience: 15,
        category: "soil-health",
        skills: ["Soil Testing", "Nutrient Management", "Organic Matter Enhancement", "pH Correction", "Micronutrient Deficiency"],
        bio: "Leading soil scientist with expertise in sustainable soil management practices. Published 85+ research papers on soil health and nutrient management.",
        consultations: 1247,
        rating: 4.9,
        languages: ["Hindi", "English", "Punjabi"],
        achievements: ["Best Scientist Award 2020", "Soil Health Champion", "Published 85 research papers"]
    },
    {
        name: "Dr. Priya Sharma",
        specialization: "Plant Pathology & Pest Management",
        institution: "Punjab Agricultural University",
        location: "Ludhiana, Punjab",
        experience: 12,
        category: "pest-disease",
        skills: ["IPM", "Disease Diagnosis", "Biological Control", "Pesticide Residue Management", "Organic Pest Control"],
        bio: "Expert in integrated pest management with focus on sustainable crop protection strategies. Specializes in biocontrol agents and organic farming.",
        consultations: 956,
        rating: 4.8,
        languages: ["Hindi", "English", "Punjabi"],
        achievements: ["IPM Pioneer Award", "Organic Farming Expert", "60 research publications"]
    },
    {
        name: "Prof. Arun Patel",
        specialization: "Horticulture & Post-Harvest Technology",
        institution: "Indian Institute of Horticultural Research",
        location: "Bengaluru, Karnataka",
        experience: 18,
        category: "crop-science",
        skills: ["Fruit Cultivation", "Vegetable Production", "Storage Technology", "Value Addition", "Precision Horticulture"],
        bio: "Renowned horticulturist specializing in fruit and vegetable cultivation with expertise in post-harvest management and value addition.",
        consultations: 1543,
        rating: 4.9,
        languages: ["Hindi", "English", "Kannada", "Tamil"],
        achievements: ["Horticulture Excellence Award", "Technology Innovation Medal", "100+ research papers"]
    }
];

// Message Templates for Farmer-Expert Conversations
const conversationTemplates = [
    {
        farmerQuery: "Dr. sahib, my {crop} plants are showing yellow leaves and stunted growth. What could be the reason?",
        expertResponse: "This appears to be a nutrient deficiency, likely nitrogen or iron. I recommend a soil test first. In the meantime, apply NPK fertilizer and check soil pH. Can you share photos of the affected plants?",
        followUp: "Thank you doctor. I'll do the soil test. Should I apply foliar spray as well?",
        finalResponse: "Yes, foliar application of micronutrients can help immediately. Use zinc sulphate and iron sulphate spray in the evening. Keep me updated on the progress."
    },
    {
        farmerQuery: "Need guidance on organic pest control for {crop}. Chemical pesticides are expensive and harmful.",
        expertResponse: "Excellent decision to go organic! For {crop}, neem oil spray works very well. Mix 50ml neem oil + 20ml liquid soap in 1 liter water. Also consider releasing Trichogramma wasps for biological control.",
        followUp: "Where can I get Trichogramma wasps? And how often should I spray neem oil?",
        finalResponse: "Contact your nearest KVK or agricultural university for biocontrol agents. Neem spray every 10-15 days, preferably in evening. Avoid during flowering to protect beneficial insects."
    }
];

// Generate Random Dummy Users
function generateDummyUsers(count = 50) {
    const users = [];
    const maleNames = indianFarmerNames.male;
    const femaleNames = indianFarmerNames.female;
    const allNames = [...maleNames, ...femaleNames];
    
    for (let i = 0; i < count; i++) {
        const name = allNames[Math.floor(Math.random() * allNames.length)];
        const location = indianLocations[Math.floor(Math.random() * indianLocations.length)];
        const primaryCrop = cropTypes[Math.floor(Math.random() * cropTypes.length)];
        const experience = Math.floor(Math.random() * 25) + 2; // 2-27 years
        const landSize = Math.floor(Math.random() * 15) + 1; // 1-15 acres
        const verified = Math.random() > 0.7; // 30% verified users
        
        users.push({
            id: i + 1,
            name: name,
            location: location,
            avatar: name.charAt(0).toUpperCase(),
            primaryCrop: primaryCrop,
            farmingExperience: experience,
            landSize: landSize,
            verified: verified,
            joinedDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
            bio: `${experience} years experienced farmer growing ${primaryCrop} in ${landSize} acres. Passionate about sustainable farming practices.`,
            email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
            phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
            specialties: [primaryCrop, cropTypes[Math.floor(Math.random() * cropTypes.length)]].filter((v, i, a) => a.indexOf(v) === i)
        });
    }
    
    return users;
}

// Generate Realistic Posts
function generateDummyPosts(users, count = 100) {
    const posts = [];
    const categories = Object.keys(postCategories);
    const seasons = ["Kharif", "Rabi", "Summer", "Winter"];
    const months = ["January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"];
    const pests = ["Bollworm", "Aphids", "Thrips", "Whitefly", "Red Spider Mite", "Stem Borer"];
    const prices = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 80, 95, 100];
    const percentages = [10, 15, 20, 25, 30, 35, 40];
    
    for (let i = 0; i < count; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const categoryData = postCategories[category];
        
        const title = categoryData.titles[Math.floor(Math.random() * categoryData.titles.length)]
            .replace('{crop}', user.primaryCrop)
            .replace('{location}', user.location)
            .replace('{season}', seasons[Math.floor(Math.random() * seasons.length)])
            .replace('{pest}', pests[Math.floor(Math.random() * pests.length)])
            .replace('{price}', prices[Math.floor(Math.random() * prices.length)])
            .replace('{month}', months[Math.floor(Math.random() * months.length)])
            .replace('{percentage}', percentages[Math.floor(Math.random() * percentages.length)]);
            
        const content = categoryData.content[Math.floor(Math.random() * categoryData.content.length)]
            .replace(/{crop}/g, user.primaryCrop)
            .replace(/{location}/g, user.location)
            .replace(/{pest}/g, pests[Math.floor(Math.random() * pests.length)])
            .replace(/{price}/g, prices[Math.floor(Math.random() * prices.length)])
            .replace(/{percentage}/g, percentages[Math.floor(Math.random() * percentages.length)]);
        
        const daysAgo = Math.floor(Math.random() * 30); // Posts from last 30 days
        const timestamp = daysAgo === 0 ? 'Just now' : 
                         daysAgo === 1 ? '1 day ago' : 
                         daysAgo < 7 ? `${daysAgo} days ago` : 
                         daysAgo < 14 ? '1 week ago' : 
                         daysAgo < 21 ? '2 weeks ago' : 
                         daysAgo < 28 ? '3 weeks ago' : '1 month ago';
        
        const likes = Math.floor(Math.random() * 500) + 10;
        const comments = Math.floor(Math.random() * 100) + 2;
        const shares = Math.floor(Math.random() * 50) + 1;
        
        // Add image for some posts (40% chance)
        const images = [
            "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1545315003-c5ad6226c272?w=400&h=300&fit=crop"
        ];
        const image = Math.random() > 0.6 ? images[Math.floor(Math.random() * images.length)] : null;
        
        posts.push({
            id: i + 1,
            author: {
                name: user.name,
                location: user.location,
                avatar: user.avatar,
                verified: user.verified
            },
            title: title,
            content: content,
            category: category,
            timestamp: timestamp,
            likes: likes,
            comments: comments,
            shares: shares,
            image: image
        });
    }
    
    return posts.sort((a, b) => {
        // Sort by timestamp (most recent first)
        const timeOrder = { 'Just now': 0, '1 hour ago': 1, '2 hours ago': 2, '1 day ago': 3 };
        return (timeOrder[a.timestamp] || 10) - (timeOrder[b.timestamp] || 10);
    });
}

// Generate Conversations between Farmers and Experts
function generateConversations(users, experts, count = 20) {
    const conversations = [];
    
    for (let i = 0; i < count; i++) {
        const farmer = users[Math.floor(Math.random() * users.length)];
        const expert = experts[Math.floor(Math.random() * experts.length)];
        const template = conversationTemplates[Math.floor(Math.random() * conversationTemplates.length)];
        
        const crop = farmer.primaryCrop;
        
        const messages = [
            {
                id: 1,
                sender: farmer.name,
                message: template.farmerQuery.replace('{crop}', crop),
                timestamp: "2 hours ago",
                type: "farmer"
            },
            {
                id: 2,
                sender: expert.name,
                message: template.expertResponse.replace('{crop}', crop),
                timestamp: "1 hour ago",
                type: "expert"
            },
            {
                id: 3,
                sender: farmer.name,
                message: template.followUp,
                timestamp: "45 min ago",
                type: "farmer"
            },
            {
                id: 4,
                sender: expert.name,
                message: template.finalResponse,
                timestamp: "30 min ago",
                type: "expert"
            }
        ];
        
        conversations.push({
            id: i + 1,
            participants: [farmer, expert],
            lastMessage: messages[messages.length - 1].message,
            timestamp: messages[messages.length - 1].timestamp,
            unread: Math.random() > 0.5,
            messages: messages
        });
    }
    
    return conversations;
}

// Expert Consultation Data
function generateExpertConsultations(experts, users, count = 50) {
    const consultations = [];
    const consultationTypes = [
        "Crop Disease Diagnosis",
        "Soil Health Assessment", 
        "Pest Management Strategy",
        "Fertilizer Recommendation",
        "Irrigation Planning",
        "Market Price Advisory",
        "Organic Farming Guidance",
        "Post-Harvest Management"
    ];
    
    const statuses = ["Completed", "In Progress", "Scheduled"];
    
    for (let i = 0; i < count; i++) {
        const expert = experts[Math.floor(Math.random() * experts.length)];
        const farmer = users[Math.floor(Math.random() * users.length)];
        const consultationType = consultationTypes[Math.floor(Math.random() * consultationTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        consultations.push({
            id: i + 1,
            expert: expert,
            farmer: farmer,
            type: consultationType,
            crop: farmer.primaryCrop,
            status: status,
            scheduledDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
            duration: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
            fee: Math.floor(Math.random() * 500) + 200, // ₹200-700
            rating: status === "Completed" ? (Math.random() * 2 + 3).toFixed(1) : null, // 3.0-5.0
            feedback: status === "Completed" ? "Very helpful consultation. Got practical solutions for my farming problems." : null
        });
    }
    
    return consultations;
}

// Export all dummy data
const DummyData = {
    users: generateDummyUsers(50),
    posts: null, // Will be generated after users
    experts: expertProfiles,
    conversations: null, // Will be generated after users and experts
    consultations: null, // Will be generated after experts and users
    
    // Initialize all data
    initialize() {
        this.posts = generateDummyPosts(this.users, 100);
        this.conversations = generateConversations(this.users, this.experts, 20);
        this.consultations = generateExpertConsultations(this.experts, this.users, 50);
        return this;
    },
    
    // Get posts by category
    getPostsByCategory(category) {
        return category === 'all' ? this.posts : this.posts.filter(post => post.category === category);
    },
    
    // Get user by name
    getUserByName(name) {
        return this.users.find(user => user.name === name);
    },
    
    // Get expert by name
    getExpertByName(name) {
        return this.experts.find(expert => expert.name === name);
    },
    
    // Get conversations for a user
    getUserConversations(userName) {
        return this.conversations.filter(conv => 
            conv.participants.some(p => p.name === userName)
        );
    }
};

// Initialize dummy data
DummyData.initialize();

// Make it available globally
window.DummyData = DummyData;
