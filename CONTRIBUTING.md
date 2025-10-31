# Contributing to Kisan Circle

Welcome to Kisan Circle! We're excited that you want to contribute to building India's premier digital agriculture platform. This guide will help you get started with contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and supportive
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- PostgreSQL 13+
- MongoDB 5+
- Redis 6+

### Local Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/kisan-circle.git
   cd kisan-circle
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   cd backend && npm install && cd ..
   cd mobile && npm install && cd ..
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**
   ```bash
   npm run db:setup
   npm run db:migrate
   npm run db:seed
   ```

5. **Start Development**
   ```bash
   npm run dev
   ```

### Project Structure
```
kisan-circle/
├── frontend/          # React.js web application
├── backend/           # Node.js API server
├── mobile/            # React Native mobile app
├── admin/             # Admin dashboard
├── database/          # Database schemas and migrations
├── docs/              # Documentation
├── scripts/           # Build and deployment scripts
├── tests/             # Test suites
└── config/            # Configuration files
```

## Development Process

### Branch Naming Convention
- `feature/feature-name` - New features
- `bugfix/issue-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes
- `docs/documentation-update` - Documentation updates
- `refactor/component-name` - Code refactoring

### Commit Message Format
We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add social media login
fix(posts): resolve image upload issue
docs(api): update authentication endpoints
test(users): add user registration tests
```

### Issue Guidelines

When creating issues, please:
- Use clear, descriptive titles
- Provide detailed descriptions
- Include steps to reproduce (for bugs)
- Add relevant labels
- Include screenshots if applicable

**Issue Templates:**
- Bug Report
- Feature Request
- Documentation Improvement
- Performance Issue

## Pull Request Process

### Before Submitting
1. **Create an Issue**: Discuss your changes first
2. **Branch from main**: Create a feature branch
3. **Follow Coding Standards**: Run linting and formatting
4. **Write Tests**: Add tests for new functionality
5. **Update Documentation**: Keep docs current
6. **Test Thoroughly**: Ensure all tests pass

### PR Checklist
- [ ] Code follows project coding standards
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] PR description clearly explains changes
- [ ] Screenshots included (for UI changes)
- [ ] Breaking changes are documented

### PR Description Template
```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Changes Made
- List key changes
- Include any breaking changes

## Testing
- Describe testing performed
- List any new test cases added

## Screenshots
(Include for UI changes)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

### Review Process
1. **Automated Checks**: CI/CD pipeline runs tests
2. **Peer Review**: 2+ maintainer approvals required
3. **Testing**: QA testing for significant features
4. **Merge**: Squash and merge to main branch

## Coding Standards

### JavaScript/TypeScript
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable names
- Write self-documenting code

### React/React Native
- Use functional components and hooks
- Follow component composition patterns
- Implement proper error boundaries
- Use React.memo for performance optimization
- Keep components focused and small

### Node.js/Express
- Use async/await over promises
- Implement proper error handling
- Use middleware for cross-cutting concerns
- Follow RESTful API design principles
- Implement proper logging

### Database
- Use parameterized queries
- Implement database transactions
- Create proper indexes
- Follow normalization principles
- Use migrations for schema changes

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS variables for theming
- Optimize for performance

## Testing Guidelines

### Test Types
- **Unit Tests**: Individual functions/components
- **Integration Tests**: API endpoints and workflows
- **E2E Tests**: Complete user scenarios
- **Performance Tests**: Load and stress testing

### Testing Standards
- Maintain 80%+ code coverage
- Write descriptive test names
- Use arrange-act-assert pattern
- Mock external dependencies
- Test edge cases and error conditions

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## Documentation

### Types of Documentation
- **Code Documentation**: JSDoc comments
- **API Documentation**: OpenAPI/Swagger specs
- **User Documentation**: Usage guides and tutorials
- **Architecture Documentation**: System design docs

### Documentation Standards
- Keep documentation up-to-date
- Use clear, simple language
- Include code examples
- Provide context and rationale
- Support multiple languages (Hindi, English)

## Multilingual Support

### Language Guidelines
- Primary languages: Hindi and English
- All user-facing text must be translatable
- Use i18next for internationalization
- Test with different languages
- Consider cultural context

### Translation Process
1. Extract translatable strings
2. Create translation files
3. Review with native speakers
4. Test UI with longer text
5. Maintain translation consistency

## Community

### Communication Channels
- **GitHub Discussions**: Feature discussions and questions
- **Issues**: Bug reports and feature requests
- **Email**: kisan-circle-dev@example.com
- **Slack**: (Coming soon)

### Getting Help
- Check existing documentation
- Search through issues
- Ask in GitHub Discussions
- Contact maintainers

### Contributor Recognition
We recognize contributors through:
- GitHub contributor insights
- Release notes mentions
- Contributor wall of fame
- Special badges for significant contributions

### Mentorship Program
New contributors can get guidance from experienced maintainers:
- Code reviews with detailed feedback
- Pairing sessions for complex features
- Architecture discussions
- Best practices guidance

## Special Considerations for Agricultural Domain

### Domain Knowledge
- Understand farming practices and terminology
- Research Indian agricultural regions and crops
- Consider seasonal variations and weather patterns
- Respect cultural and regional differences

### User Experience
- Design for low-bandwidth environments
- Support multiple input methods (text, voice, image)
- Consider users with varying technical literacy
- Ensure accessibility for all users

### Data Sensitivity
- Protect farmer privacy
- Handle location data carefully
- Secure financial information
- Comply with data protection regulations

## Release Process

### Version Numbers
We follow [Semantic Versioning](https://semver.org/):
- MAJOR.MINOR.PATCH
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Schedule
- Major releases: Every 6 months
- Minor releases: Monthly
- Patch releases: As needed

Thank you for contributing to Kisan Circle! Together, we're building technology that empowers India's farmers and transforms agriculture.
