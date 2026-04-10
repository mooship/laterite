# 🤝 Contributing to The Red Soil

Thank you for your interest in contributing to The Red Soil! 🌍 This document provides guidelines and information for contributors.

## 📨 How to Submit Content

You can contribute dispatches or articles in two ways:

- **Fork and Pull Request:** Fork the repository, add your content, and submit a Pull Request (see instructions below).
- **Email Submission:** Email your content directly to the maintainers at contact@theredsoil.co.za for review and publication.

Both methods are welcome. All content will be reviewed for alignment with the platform's mission and published with clear author attribution.

## 🌟 Ways to Contribute

### Content Contributions

**Writing Articles**: Submit dispatches or articles on eco-socialist analysis, decolonial thought, and liberation from Africa and the Global South. We welcome contributions from other authors. Posts by other authors will be clearly attributed, with the author's name displayed prominently, and remain your content.

- **Editing**: Help improve existing content for clarity, accuracy, and accessibility.
- **Other Languages**: We welcome dispatches and articles written in languages other than English. We do not accept translations of existing posts, but original content in any language is encouraged.

### Code Contributions

- **Bug Fixes**: Report and fix issues in the codebase.
- **Feature Development**: Implement new features that align with the project's goals.
- **Testing**: Add tests and improve test coverage.

## 📝 Content Guidelines

### Writing Standards

- Use clear, accessible English, or another language if preferred
- Focus on eco-socialist analysis and decolonial perspectives
- Ensure content is accessible and inclusive
- Cite sources and provide context for claims
- Avoid unnecessary jargon; explain technical terms when used

### Topics

Content should align with the site's focus on:

- Capitalism, colonialism, and climate systems
- Liberation movements and decolonial thought
- Analysis from Africa and the Global South
- Intersectional approaches to social justice

## 🛠️ Development Guidelines

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/laterite.git`
3. Install dependencies: `bun install`
4. Start development server: `bun run dev`

### Code Standards

- Follow TypeScript best practices
- Use semantic HTML and accessible markup
- Maintain consistent code formatting (Prettier is configured)
- Write meaningful commit messages
- Add tests for new features

### Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and test thoroughly
3. Run linting: `bun run lint`
4. Run type checking: `bun run check`
5. Format code: `bun run format`
6. Commit your changes: `git commit -m "Add: brief description of changes"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request with a clear description

### Commit Message Format

```
type: brief description

Optional longer description explaining the change.
```

Types:

- `Add:` - New features or content
- `Fix:` - Bug fixes
- `Update:` - Changes to existing features
- `Remove:` - Removed features or code
- `Docs:` - Documentation changes

## 📋 Content Submission Guidelines

### Dispatches

You may submit dispatches or articles by either:

- **Forking the repository and submitting a Pull Request** (recommended for those familiar with GitHub):
  1.  Create a new `.md` or `.mdx` file in `src/content/dispatches/`
  2.  Use the required frontmatter fields:
      ```yaml
      ---
      title: "Your Article Title"
      datePublished: "YYYY-MM-DD"
      description: "Brief SEO description"
      author: "Your Name"
      excerpt: "Short summary for listings"
      categories: ["Category1", "Category2"]
      tags: ["tag1", "tag2"]
      image: "/images/your-open-graph-image.webp"
      ---
      ```
  3.  Write in clear, accessible language
  4.  Include relevant headings and structure
  5.  Add alt text to any images
  6.  Submit your content via Pull Request

- **Emailing your content** (if you prefer not to use GitHub):
  - Send your article and any images to contact@theredsoil.co.za
  - Please include the required frontmatter information in your email

### Content Review Process

All submitted content will be reviewed for alignment with project goals. Feedback may be provided if changes are needed. Editorial changes may be suggested or made for clarity, consistency, and alignment with the platform's mission, but your voice and intent will be respected. Once approved, your content will be published with clear author attribution.

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs, feature requests, and general questions
- **Discussions**: Use GitHub Discussions for longer-form conversations
- **Email**: Contact the maintainers at contact@theredsoil.co.za

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (CC0 1.0 Universal).

Thank you for contributing to The Red Soil! 🌟
