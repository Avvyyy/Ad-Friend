# Adfriend
#### a Chrome extension that intercepts and replaces ad elements on web pages with customizable, positive content widgets. The extension transforms ad slots into interactive spaces that can display (these are examples, feel free to use your imagination to do something else or extend this list):
- Motivational Quotes: Inspirational messages to keep users focused.
- Activity Reminders: Custom reminders (e.g., “Have you done your burpees today?”) that remind users to stay active.
- Etc.

# Project Structure:
- Ad Friend (Directory)
    - ad.html (popup file for the extension)
    - motivation.html (the content that the ads will be replaced with)
    - scripts (Directory)
        - ad.js
        - background.js (controller for the extension based on various browser states)
        - fetchQuotes.js (backend node source code) (was nullified now)
        - popup.js
    
## Build Tools
- NodeJs
- HTML
- CSS
- Bootstrap Icons