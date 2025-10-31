# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Kisan Circle** is a comprehensive digital agriculture platform connecting farmers, government authorities, and research institutions in India. The platform empowers farmers with access to relevant information, expert advice, and a supportive digital community while supporting multiple Indian languages.

### Core Purpose
- **Farmer Community Hub**: Experience sharing, Q&A, peer rating system
- **Expert & Institutional Pages**: Verified research, official publications  
- **Government Schemes Portal**: Centralized information on subsidies and programs
- **Multilingual Accessibility**: Interface in Hindi, English, and regional Indian languages
- **Smart Notifications**: Weather alerts, market prices, disease outbreaks

## Architecture

### High-Level Structure
This is a **monorepo with npm workspaces** containing:
- `frontend/` - React.js web application  
- `backend/` - Node.js Express.js API server
- `mobile/` - React Native mobile application
- `admin/` - React.js admin dashboard
- `database/` - Schema definitions, migrations, seeds
- `tests/` - Unit and integration test suites
- `scripts/` - Build and deployment automation
- `docs/` - Technical documentation

### Technology Stack
- **Frontend**: React.js with TypeScript, Tailwind CSS, i18next for multilingual support
- **Backend**: Node.js, Express.js, GraphQL, Socket.io for real-time features
- **Mobile**: React Native for iOS/Android
- **Databases**: PostgreSQL (structured data), MongoDB (media/documents), Redis (caching/sessions)
- **Authentication**: JWT with refresh tokens, role-based access control
- **File Storage**: AWS S3 or Azure Blob (configured via environment variables)
- **Real-time**: Socket.io for notifications and chat

### Service Architecture
- **User Service**: Authentication, profiles, role management
- **Content Service**: Posts, media, comments, ratings (PostgreSQL + MongoDB)
- **Expert Service**: Verification, institution management  
- **Government Service**: Schemes database, policy announcements
- **Alert Service**: Real-time notifications, weather/market alerts (Redis + PostgreSQL)
- **Integration Service**: External API integrations, background jobs

### Database Strategy  
- **PostgreSQL**: Users, content relationships, government schemes, transactions
- **MongoDB**: Media metadata, files, activity logs, search indexes
- **Redis**: Sessions, caching, message queuing, rate limiting

## Development Commands

### Environment Setup
```bash
# Copy environment template and configure
cp .env.example .env
# Edit .env with your database credentials and API keys

# Install all dependencies (root + all workspaces)
npm install
```

### Database Operations
```bash
# Complete database setup (create + migrate)
npm run db:setup

# Individual database operations
npm run db:create      # Create databases
npm run db:migrate     # Run migrations
npm run db:seed        # Seed with test data
npm run db:reset       # Drop, recreate, and seed
npm run db:drop        # Drop all databases
```

### Development Servers
```bash
# Start all services concurrently (frontend + backend)
npm run dev

# Start individual services
npm run frontend:dev   # React web app on port 3000
npm run backend:dev    # API server on port 8000  
npm run mobile:dev     # React Native development
npm run admin:dev      # Admin dashboard
```

### Testing
```bash
# Run all tests (unit + integration)
npm test

# Run specific test suites
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests only

# Test individual workspaces
cd frontend && npm test
cd backend && npm test
```

### Code Quality
```bash
# Linting
npm run lint           # Check all code
npm run lint:fix       # Auto-fix linting issues

# Formatting
npm run format         # Format all code with Prettier
```

### Build & Deployment
```bash
# Build all applications
npm run build

# Build individual applications  
npm run frontend:build
npm run backend:build
npm run mobile:build
npm run admin:build

# Production start (requires build)
npm start              # Starts backend server
```

### Docker (if available)
```bash
npm run docker:dev     # Development environment
npm run docker:prod    # Production environment
```

## Key Development Patterns

### Workspace Structure
Each workspace (frontend, backend, mobile, admin) is an independent npm package with its own:
- `package.json` with specific dependencies
- `src/` directory with TypeScript/JavaScript source
- Individual build and test configurations

### Multilingual Support
- **i18next integration** in all frontend applications
- **Default language**: Hindi (`hi`)
- **Supported languages**: English, Hindi, Telugu, Tamil, Bengali, Gujarati, Marathi, Punjabi, Odia, Assamese
- All user-facing strings must be translatable
- Regional customization for farming practices and terminology

### Authentication & Authorization
- **JWT-based authentication** with refresh tokens
- **Role hierarchy**: Farmer → Verified Farmer → Expert → Institution → Admin/Moderator  
- **Location-aware permissions** for regional content
- Social features (following, blocking) built into user service

### Real-time Features
- **Socket.io implementation** for live notifications
- **WebSocket connections** for real-time chat and updates  
- **Push notifications** via Firebase Cloud Messaging (FCM)
- **Weather and market alerts** based on user location and crops

### Content Management
- **Media handling** supports images, videos, documents
- **Content moderation** system with admin/moderator tools
- **Rating and review system** for community-driven quality
- **Category system** for agricultural topics (crop management, livestock, etc.)

### Data Privacy & Security
- **Farmer data protection** with explicit consent management
- **Location data encryption** and careful handling
- **No data sharing** without explicit user consent  
- **Audit logging** for all data access and modifications

## Testing Strategy

### Unit Tests (`tests/unit/`)
- Individual component and function testing
- Mock external dependencies (APIs, databases)
- Focus on business logic and utility functions

### Integration Tests (`tests/integration/`)
- End-to-end API testing
- Database integration testing  
- Service interaction testing
- Authentication flow testing

### Test Data
- Seed scripts provide realistic agricultural test data
- Multilingual content samples for testing i18n
- Various user roles and permission scenarios

## Development Environment Requirements

### Prerequisites
- **Node.js 18+** (specified in `volta` config and `engines`)
- **npm 9+** 
- **PostgreSQL 13+** for structured data
- **MongoDB 5+** for media and flexible data
- **Redis 6+** for caching and sessions

### Environment Configuration
Key environment variables in `.env`:
- **Database URLs**: PostgreSQL, MongoDB, Redis connection strings
- **JWT secrets**: Authentication token configuration
- **API keys**: Weather, market data, government APIs  
- **File storage**: AWS/Azure credentials for media uploads
- **Notification services**: Twilio, FCM configuration
- **Supported languages**: Language codes for multilingual support

## Agricultural Domain Considerations

### Target Users
- **Indian farmers** with varying technical literacy levels
- **Government agricultural officers** managing schemes and policies
- **Research institutions** publishing official findings
- **Agricultural experts** providing verified advice

### Cultural Context
- **Regional farming practices** vary significantly across Indian states
- **Seasonal variations** affect content relevance and timing
- **Local language preferences** critical for user adoption
- **Low-bandwidth environments** common in rural areas
- **Voice and image input** important for users with limited text literacy

### Content Categories
- Crop management techniques
- Livestock and dairy farming  
- Government schemes and subsidies
- Market prices and trading
- Weather and climate information
- Pest and disease management
- Sustainable farming practices

This platform serves India's agricultural community, so always consider rural connectivity constraints, multilingual requirements, and the diverse educational backgrounds of farmers when implementing features.
