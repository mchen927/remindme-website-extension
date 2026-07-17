// THE CONTENT SCRIPT (runs inside every web page)
//
// This code is injected into the pages you browse. It's the ONLY world that
// can see and change the page — so in Part 4 this is where we'll draw the
// top-right sticky-note widget.
//
// For now it just announces itself in the page's console, so we can confirm
// that Chrome is really injecting our code into real websites.
//
// `location.hostname` is the domain of the current page, e.g. "www.google.com".

console.log("[RemindMe] content script loaded on:", location.hostname);
