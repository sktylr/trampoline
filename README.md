# Trampoline

A small static site for forwarding an HTTPS callback to one browser-local destination, including a desktop app URI scheme; redirect behavior is not implemented yet.

Serve this directory with `python3 -m http.server 8000` and open `http://localhost:8000/`; GitHub Pages can serve the same files, with `/trampoline/callback.html` as the fixed callback URL.
