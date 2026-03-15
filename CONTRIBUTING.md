# Contributing to ClaudeTuts

Thank you for your interest in contributing to ClaudeTuts! This document outlines the process for contributing to this project.

## Code of Conduct

By participating, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs
- Use the GitHub Issues tracker
- Describe the bug clearly with steps to reproduce
- Include environment details (OS, Node.js version, Python version)

### Suggesting Features
- Open a GitHub Issue with the `enhancement` label
- Describe the use case and expected behavior

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes following our coding standards
4. Add tests for new functionality
5. Run the test suite: `npm test` / `pytest`
6. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation
   - `chore:` maintenance
7. Push and open a Pull Request against `main`

### Lesson Content Contributions

Lesson content lives in `lessons/`. Each lesson is an MDX file with:
- A frontmatter header (title, module, difficulty, tags)
- Prose explanation
- Code examples
- Exercises
- Quiz questions

See `lessons/template.mdx` for the full format.

## Development Setup

See [README.md](README.md) for full setup instructions.

## Coding Standards

- **TypeScript**: strict mode, ESLint + Prettier
- **Python**: Black formatter, Ruff linter, type hints required
- **Tests**: maintain >80% coverage

## AI Usage Disclosure

Some boilerplate, lesson drafts, and documentation in this project were generated with the assistance of AI tools (Claude, GitHub Copilot). All AI-generated content has been reviewed and edited by human contributors. AI-generated code is not submitted as original creative work.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
