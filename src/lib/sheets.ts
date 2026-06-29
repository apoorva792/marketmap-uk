// Saves a row to a Google Sheet via a Google Apps Script Web App.
//
// SETUP (one time):
// 1. Open the sheet → Extensions → Apps Script, paste the script from the bottom
//    of this file, and Save.
// 2. Deploy → New deployment → type "Web app" → Execute as "Me",
//    Who has access "Anyone" → Deploy → copy the /exec URL.
// 3. Paste that URL into SHEET_WEBHOOK_URL below.
export const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyMZ07i6w2EkLyDrEF9gUZMuuaTzMtdlSvkMdjCM0HKy87ls9XtBHuCSWdvc7p5aqY9Ng/exec"; // e.g. "https://script.google.com/macros/s/AKfy.../exec"

export async function logToSheet(data: Record<string, string>): Promise<void> {
  if (!SHEET_WEBHOOK_URL) return;
  try {
    await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script web apps don't return CORS headers
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight
      body: JSON.stringify({
        ...data,
        ts: new Date().toISOString(),
        page: typeof window !== "undefined" ? window.location.href : "",
      }),
    });
  } catch {
    /* best-effort, never block the UI */
  }
}

/*
=== Google Apps Script (paste into the sheet's Apps Script editor, then Deploy) ===

var HEADERS = ['ts', 'source', 'name', 'email', 'company', 'channel', 'page'];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS); // write header row once
  var d = JSON.parse(e.postData.contents);
  sheet.appendRow(HEADERS.map(function (k) { return d[k] || ''; }));
  return ContentService.createTextOutput('ok');
}
*/
