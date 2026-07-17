// THE POPUP SCRIPT
//
// This runs when the user clicks the extension's toolbar icon. A popup is
// just a normal little web page, so this is plain DOM code — nothing exotic.
//
// In Part 5 this becomes the "add a reminder for THIS site" form. For now it
// only flips the status text, to prove the popup and its script are wired up.

const status = document.getElementById("status");

if (status) {
  status.textContent = "Popup is working 🎉";
}
