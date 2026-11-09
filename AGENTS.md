# Repository Guidelines

## Project Overview

Trampoline is a buildless static site intended for GitHub Pages. It forwards a fixed HTTPS callback to one destination saved in the current browser, supporting HTTP(S) URLs and desktop app URI schemes.

## Project Structure

- `index.html` and `destination.js`: destination form, validation, and save feedback.
- `callback.html` and `callback.js`: callback forwarding and a manual fallback link.
- `storage.js`: shared `destinationStore` interface; owns local storage access and the `trampoline:destination` key.
- `.nojekyll`: disables Jekyll processing on GitHub Pages.

Load `storage.js` before the page-specific script using ordered, deferred script tags. Keep storage keys and implementation details out of page scripts; prefix every local storage key with `trampoline:`.

## Development & Validation

Run `python3 -m http.server 8000`, then open `http://localhost:8000/`. No build step, package installation, test framework, or lint configuration is currently required.

Use `node --check <file.js>` for JavaScript syntax and `git diff --check` for whitespace. For behaviour changes, check saving and reloading a destination, missing or unavailable storage, invalid URLs, HTTP(S) redirects, and custom app schemes; verify query forwarding with `/callback.html?code=123&state=456`.

## Redirect & Storage Rules

Append incoming query parameters while preserving existing destination parameters and fragments. Never persist callback parameters, codes, tokens, or other secrets; only save the configured destination. Revalidate saved URLs before redirecting, and retain the manual link for browsers that require a user gesture to launch an app.

## Style & Contributions

Use two-space indentation, single-quoted JavaScript strings, semicolons, and descriptive camelCase names. Keep dependencies and changes small and focused.

Use Irish English in prose and commit messages. Follow existing prefixes such as `feat:`, `refactor:`, and `chore:`; always obtain user approval before creating a commit. Summarise behaviour changes and relevant validation when presenting work for review.
