/** Will get the url of the current tab
 * 
 * @returns --> tabs.Tab instance
 */

export async function getCurrentURL() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    print(await tab);
    return tab.url;
}