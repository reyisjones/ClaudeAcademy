# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | ✅        |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub Issues.**

To report a security vulnerability, please email **security@claudetuts.dev** (or open a private GitHub Security Advisory).

Include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested remediation

You will receive a response within **72 hours**. We ask that you:
- Give us reasonable time to investigate and fix before public disclosure
- Avoid accessing or modifying user data during research
- Act in good faith

## Security Practices

- All API keys must be stored in environment variables — never hardcoded
- All user inputs are validated and sanitized server-side
- Dependencies are scanned via Dependabot and GitHub Actions
- Container images are scanned with Trivy
- Secrets management via environment variables or a secrets vault (Azure Key Vault / AWS Secrets Manager)
