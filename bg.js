"use strict";

/**
 * https://developer.chrome.com/docs/extensions/reference/downloads/#type-DownloadItem
 * @typedef {{
 *  filename: string,
 *  finalUrl: string,
 *  referrer: string,
 *  url: string,
 * }} DownloadItem
 */

/**
 * https://developer.chrome.com/docs/extensions/reference/downloads/#type-FilenameSuggestion
 * @typedef {{
 *  conflictAction: "uniquify" | "overwrite" | "prompt",
 *  filename: string,
 * }} FilenameSuggestion
 */

chrome.downloads.onDeterminingFilename.addListener(
    /**
     * @param {DownloadItem} item
     * @param {(suggestion?: FilenameSuggestion) => void} suggest
     */
    function (item, suggest) {
        console.log(item);
        const { filename, finalUrl, referrer } = item;

        if (finalUrl.startsWith("blob:")) {
            const hostname = new URL(finalUrl.replace(/^blob:/, "")).hostname;
            suggest({
                conflictAction: "uniquify",
                filename: `${hostname}/${filename}`,
            });

            return;
        }

        const referrerHostname = new URL(referrer).hostname;
        suggest({
            conflictAction: "uniquify",
            filename: `${referrerHostname}/${filename}`,
        });
    }
);
