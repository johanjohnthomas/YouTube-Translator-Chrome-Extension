// Function to be executed when the menu item is clicked
async function onMenuItemClick(info, tab) {
  try {
    // Send a message to the content script with the selected text and language code
    chrome.tabs.sendMessage(tab.id, {
      action: "generateVoiceOver",
      selectedText: info.selectionText,
      languageCode: info.menuItemId.replace("voiceOver", ""),
    });
  } catch (error) {
    console.error("Error: Unable to generate voice-over.", error);
  }
}

// Create the context menu and sub-context menus
chrome.runtime.onInstalled.addListener(function () {
  // Create the main context menu item
  chrome.contextMenus.create({
    id: "uniqueMenuItemId", // Use a unique id for the menu item
    title: "Generate Voice Over", // Display name for the menu item
    contexts: ["selection"], // Show the menu item on selected text
  });

  // Create sub-context menu items for different languages
  const languages = [
    "En", // English
    "De", // German
    "Pl", // Polish
    "Es", // Spanish
    "It", // Italian
    "Fr", // French
    "Pt", // Portuguese
    "Hi", // Hindi
  ];

  languages.forEach((language) => {
    chrome.contextMenus.create({
      id: "voiceOver" + language,
      parentId: "uniqueMenuItemId", // The parent id to link it as a sub-menu
      title: language,
      contexts: ["selection"], // Show the menu item on selected text
    });
  });
});

// Add event listener for the context menu click event
chrome.contextMenus.onClicked.addListener(onMenuItemClick);
