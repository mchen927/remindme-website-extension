// THE SERVICE WORKER (the "brain")
//
// Right now this does almost nothing on purpose — Part 1 is only about
// proving the plumbing works. In Part 3 this file will grow into the engine
// that watches which website you visit and decides what to show.
//
// Two things to know about this world:
//   1. It has NO access to a web page's DOM. It can't draw anything on screen.
//   2. Chrome KILLS it when it's idle and RESTARTS it on the next event.
//      So it can never trust variables to survive — durable data must go in
//      chrome.storage (we'll build that in Part 2).

console.log("[RemindMe] service worker is alive");

// `onInstalled` fires once, right after the extension is installed or updated.
// It's the classic place to set up first-run defaults later on.
chrome.runtime.onInstalled.addListener(() => {
  console.log("[RemindMe] extension installed and ready");
});
