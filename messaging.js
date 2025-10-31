// Messaging System for Kisan Circle
// This handles all messaging and conversation functionality

// Initialize messaging when DummyData is available
function initializeMessagingSystem() {
    if (typeof DummyData === 'undefined') {
        console.warn('DummyData not loaded. Messaging will not work properly.');
        return;
    }
    
    loadConversations();
    setupMessageInput();
    setupNewMessageModal();
    setupMessageStyles();
    
    // Show messages section if accessed via hash
    if (window.location.hash === '#messages') {
        showMessagesSection();
    }
}

function loadConversations() {
    const conversationsList = document.getElementById('conversationsList');
    if (!conversationsList) return;
    
    conversationsList.innerHTML = '';
    
    DummyData.conversations.forEach(conversation => {
        const conversationElement = createConversationElement(conversation);
        conversationsList.appendChild(conversationElement);
    });
}

function createConversationElement(conversation) {
    const div = document.createElement('div');
    div.className = `conversation-item ${conversation.unread ? 'unread' : ''}`;
    div.dataset.conversationId = conversation.id;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const otherParticipant = conversation.participants.find(p => p.name !== currentUser.name) || conversation.participants[0];
    
    div.innerHTML = `
        <div class="conversation-avatar">
            ${otherParticipant.avatar || otherParticipant.name.charAt(0).toUpperCase()}
        </div>
        <div class="conversation-details">
            <h4>${otherParticipant.name} ${otherParticipant.specialization ? '<span class="expert-badge-small">Expert</span>' : ''}</h4>
            <p class="last-message">${conversation.lastMessage}</p>
            <span class="timestamp">${conversation.timestamp}</span>
        </div>
        ${conversation.unread ? '<div class="unread-indicator"></div>' : ''}
    `;
    
    div.addEventListener('click', () => {
        selectConversation(conversation, otherParticipant);
    });
    
    return div;
}

function selectConversation(conversation, otherParticipant) {
    // Update active conversation
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-conversation-id="${conversation.id}"]`).classList.add('active');
    
    // Update chat header
    const chatUserName = document.getElementById('chatUserName');
    const chatUserStatus = document.getElementById('chatUserStatus');
    
    if (chatUserName) chatUserName.textContent = otherParticipant.name;
    if (chatUserStatus) chatUserStatus.textContent = Math.random() > 0.5 ? 'Online' : 'Last seen 2 hours ago';
    
    // Load messages for this conversation
    loadMessagesForConversation(conversation);
    
    // Show message input area
    const messageInputArea = document.getElementById('messageInputArea');
    const noConversation = document.querySelector('.no-conversation');
    
    if (messageInputArea) messageInputArea.style.display = 'flex';
    if (noConversation) noConversation.style.display = 'none';
    
    // Store current conversation
    window.currentConversation = conversation;
    
    // Mark as read
    conversation.unread = false;
    const conversationElement = document.querySelector(`[data-conversation-id="${conversation.id}"]`);
    if (conversationElement) {
        conversationElement.classList.remove('unread');
        const unreadIndicator = conversationElement.querySelector('.unread-indicator');
        if (unreadIndicator) unreadIndicator.remove();
    }
}

function loadMessagesForConversation(conversation) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    messagesContainer.innerHTML = '';
    
    conversation.messages.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function createMessageElement(message) {
    const div = document.createElement('div');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const isCurrentUser = message.sender === currentUser.name;
    
    div.className = `message ${isCurrentUser ? 'sent' : 'received'}`;
    
    div.innerHTML = `
        <div class="message-content">
            <p>${message.message}</p>
            <span class="message-time">${message.timestamp}</span>
        </div>
        ${!isCurrentUser ? `<div class="message-avatar">${message.sender.charAt(0).toUpperCase()}</div>` : ''}
    `;
    
    return div;
}

function setupMessageInput() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendMessageBtn');
    
    if (!messageInput || !sendBtn) return;
    
    messageInput.addEventListener('input', () => {
        sendBtn.disabled = messageInput.value.trim() === '';
    });
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !sendBtn.disabled) {
            sendMessage();
        }
    });
    
    sendBtn.addEventListener('click', sendMessage);
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!messageInput || !currentUser.name || !window.currentConversation) {
        showNotification('Please login to send messages', 'info');
        return;
    }
    
    const messageText = messageInput.value.trim();
    if (!messageText) return;
    
    // Create new message
    const newMessage = {
        id: Date.now(),
        sender: currentUser.name,
        message: messageText,
        timestamp: 'Just now',
        type: 'farmer'
    };
    
    // Add message to current conversation
    window.currentConversation.messages.push(newMessage);
    window.currentConversation.lastMessage = messageText;
    window.currentConversation.timestamp = 'Just now';
    
    // Update UI
    const messageElement = createMessageElement(newMessage);
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Update conversation preview
    const conversationItem = document.querySelector(`[data-conversation-id="${window.currentConversation.id}"]`);
    if (conversationItem) {
        const lastMessageElement = conversationItem.querySelector('.last-message');
        const timestampElement = conversationItem.querySelector('.timestamp');
        if (lastMessageElement) lastMessageElement.textContent = messageText;
        if (timestampElement) timestampElement.textContent = 'Just now';
    }
    
    // Clear input
    messageInput.value = '';
    document.getElementById('sendMessageBtn').disabled = true;
    
    // Simulate expert response after 2-3 seconds
    setTimeout(() => {
        simulateExpertResponse();
    }, 2000 + Math.random() * 3000);
}

function simulateExpertResponse() {
    if (!window.currentConversation) return;
    
    const responses = [
        "Thank you for your question. Let me provide you with some guidance on this topic.",
        "Based on your description, I recommend trying organic methods first.",
        "This is a common issue in your region. Here's what usually works...",
        "I'd suggest consulting with local agricultural extension officers as well.",
        "Please share some photos if possible for better diagnosis.",
        "Have you tried soil testing? That would help determine the exact cause.",
        "This requires immediate attention. Please implement these steps right away.",
        "I recommend using integrated pest management approach for this problem.",
        "The symptoms you describe indicate nutrient deficiency. Apply balanced fertilizer.",
        "Weather conditions play a major role here. Monitor forecasts carefully."
    ];
    
    const expertParticipant = window.currentConversation.participants.find(p => p.specialization);
    if (!expertParticipant) return;
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    const expertMessage = {
        id: Date.now(),
        sender: expertParticipant.name,
        message: response,
        timestamp: 'Just now',
        type: 'expert'
    };
    
    // Add expert response
    window.currentConversation.messages.push(expertMessage);
    window.currentConversation.lastMessage = response;
    
    // Update UI
    const messageElement = createMessageElement(expertMessage);
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Update conversation preview
    const conversationItem = document.querySelector(`[data-conversation-id="${window.currentConversation.id}"]`);
    if (conversationItem) {
        const lastMessageElement = conversationItem.querySelector('.last-message');
        if (lastMessageElement) lastMessageElement.textContent = response;
        // Mark as unread from expert
        conversationItem.classList.add('unread');
        if (!conversationItem.querySelector('.unread-indicator')) {
            conversationItem.insertAdjacentHTML('beforeend', '<div class="unread-indicator"></div>');
        }
    }
    
    // Show notification for expert response
    showNotification(`New message from ${expertParticipant.name}`, 'info');
}

function setupNewMessageModal() {
    const newMessageBtn = document.getElementById('newMessageBtn');
    const modal = document.getElementById('newMessageModal');
    const closeBtn = modal?.querySelector('.modal-close');
    const searchInput = document.getElementById('userSearchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!newMessageBtn || !modal) return;
    
    newMessageBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        loadAvailableUsers();
    });
    
    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterAvailableUsers(searchTerm);
    });
}

function loadAvailableUsers() {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    // Combine users and experts
    const allUsers = [
        ...DummyData.users.slice(0, 10), // Show first 10 farmers
        ...DummyData.experts // Show all experts
    ];
    
    searchResults.innerHTML = '';
    
    allUsers.forEach(user => {
        const userElement = createUserSearchResult(user);
        searchResults.appendChild(userElement);
    });
}

function createUserSearchResult(user) {
    const div = document.createElement('div');
    div.className = 'user-search-result';
    
    const isExpert = user.specialization !== undefined;
    const displayName = user.name;
    const displayInfo = isExpert ? user.specialization : `${user.primaryCrop} farmer, ${user.location}`;
    
    div.innerHTML = `
        <div class="user-avatar">${user.avatar || displayName.charAt(0).toUpperCase()}</div>
        <div class="user-info">
            <h4>${displayName} ${isExpert ? '<span class="expert-badge-small">Expert</span>' : ''}</h4>
            <p>${displayInfo}</p>
        </div>
    `;
    
    div.addEventListener('click', () => {
        startNewConversation(user);
    });
    
    return div;
}

function startNewConversation(otherUser) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!currentUser.name) {
        showNotification('Please login to start conversations', 'info');
        return;
    }
    
    // Check if conversation already exists
    const existingConversation = DummyData.conversations.find(conv => 
        conv.participants.some(p => p.name === otherUser.name)
    );
    
    if (existingConversation) {
        // Close modal and select existing conversation
        document.getElementById('newMessageModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        selectConversation(existingConversation, otherUser);
        return;
    }
    
    // Create new conversation
    const newConversation = {
        id: Date.now(),
        participants: [currentUser, otherUser],
        lastMessage: 'Start a conversation...',
        timestamp: 'Just now',
        unread: false,
        messages: []
    };
    
    // Add to conversations list
    DummyData.conversations.unshift(newConversation);
    
    // Refresh conversations UI
    loadConversations();
    
    // Close modal and select new conversation
    document.getElementById('newMessageModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    selectConversation(newConversation, otherUser);
    
    showNotification(`Started conversation with ${otherUser.name}`, 'success');
}

function filterAvailableUsers(searchTerm) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    const userResults = searchResults.querySelectorAll('.user-search-result');
    
    userResults.forEach(result => {
        const userName = result.querySelector('h4').textContent.toLowerCase();
        const userInfo = result.querySelector('p').textContent.toLowerCase();
        
        if (userName.includes(searchTerm) || userInfo.includes(searchTerm)) {
            result.style.display = 'flex';
        } else {
            result.style.display = 'none';
        }
    });
}

function showMessagesSection() {
    const messagesSection = document.getElementById('messages');
    if (messagesSection) {
        messagesSection.style.display = 'block';
        initializeMessagingSystem();
    }
}

function setupMessageStyles() {
    if (document.getElementById('messaging-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'messaging-styles';
    style.textContent = `
        .conversation-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #F1F8E9;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .conversation-item:hover {
            background: #F9FBE7;
        }
        
        .conversation-item.active {
            background: #E8F5E8;
            border-left: 4px solid #4CAF50;
        }
        
        .conversation-item.unread {
            background: #FFF3E0;
        }
        
        .conversation-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4CAF50, #81C784);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 1.1rem;
            margin-right: 1rem;
        }
        
        .conversation-details {
            flex: 1;
        }
        
        .conversation-details h4 {
            margin: 0 0 0.25rem;
            color: #1B5E20;
            font-size: 1rem;
        }
        
        .conversation-details .last-message {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .conversation-details .timestamp {
            color: #4CAF50;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .unread-indicator {
            width: 10px;
            height: 10px;
            background: #4CAF50;
            border-radius: 50%;
            position: absolute;
            right: 1rem;
            top: 1rem;
        }
        
        .expert-badge-small {
            background: #4CAF50;
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 10px;
            font-size: 0.7rem;
            font-weight: 600;
            margin-left: 0.5rem;
        }
        
        .message {
            display: flex;
            margin-bottom: 1rem;
            align-items: flex-end;
        }
        
        .message.sent {
            justify-content: flex-end;
        }
        
        .message.received {
            justify-content: flex-start;
        }
        
        .message-content {
            max-width: 70%;
            padding: 0.75rem 1rem;
            border-radius: 15px;
            position: relative;
        }
        
        .message.sent .message-content {
            background: #4CAF50;
            color: white;
            border-bottom-right-radius: 5px;
        }
        
        .message.received .message-content {
            background: #F1F8E9;
            color: #333;
            border-bottom-left-radius: 5px;
        }
        
        .message-content p {
            margin: 0 0 0.25rem;
            line-height: 1.4;
        }
        
        .message-time {
            font-size: 0.75rem;
            opacity: 0.7;
        }
        
        .message-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4CAF50, #81C784);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 0.8rem;
            margin-right: 0.5rem;
        }
        
        .user-search-result {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #F1F8E9;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .user-search-result:hover {
            background: #F9FBE7;
        }
        
        .user-search-result .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4CAF50, #81C784);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            margin-right: 1rem;
        }
        
        .user-search-result .user-info h4 {
            margin: 0 0 0.25rem;
            color: #1B5E20;
        }
        
        .user-search-result .user-info p {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
        }
        
        .messages-container {
            height: 400px;
            overflow-y: auto;
            padding: 1rem;
            background: #FAFAFA;
        }
        
        .message-input-area {
            display: flex;
            align-items: center;
            padding: 1rem;
            background: white;
            border-top: 1px solid #E0E0E0;
            gap: 0.5rem;
        }
        
        .message-input-area input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid #E0E0E0;
            border-radius: 25px;
            outline: none;
        }
        
        .message-input-area input:focus {
            border-color: #4CAF50;
        }
        
        .btn-icon {
            background: none;
            border: none;
            color: #4CAF50;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .btn-icon:hover {
            background: #F1F8E9;
        }
        
        .btn-icon:disabled {
            color: #CCC;
            cursor: not-allowed;
        }
        
        .send-btn:not(:disabled) {
            background: #4CAF50;
            color: white;
        }
        
        .send-btn:not(:disabled):hover {
            background: #2E7D32;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize messaging when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for DummyData to be available
    if (typeof DummyData !== 'undefined') {
        initializeMessagingSystem();
    } else {
        // Wait for DummyData to load
        setTimeout(() => {
            if (typeof DummyData !== 'undefined') {
                initializeMessagingSystem();
            }
        }, 100);
    }
});

// Handle navigation to messages
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href="#messages"]') || e.target.matches('.nav-link[data-translate="nav-messages"]')) {
        e.preventDefault();
        showMessagesSection();
    }
});
