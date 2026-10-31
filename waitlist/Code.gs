/**
 * Too Much Chips drop list.
 *
 * Lives inside the "Too Much Chips Drop List" Google Sheet (Extensions →
 * Apps Script). The website POSTs each signup here; this script adds a row to
 * the Waitlist tab and emails whoever owns the Sheet. Setup: waitlist/README.md.
 */

const SHEET_NAME = 'Waitlist';
const HEADERS = ['Signed up', 'Name', 'Email', 'Flavors', 'Source'];
const EMAIL_PATTERN = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.company) return reply({ ok: true }); // honeypot: only bots fill this in

  const email = clean(p.email, 254).toLowerCase();
  if (!EMAIL_PATTERN.test(email)) return reply({ ok: false, error: 'bad-email' });
  const name = clean(p.name, 80);
  const flavors = clean(p.flavors, 60);
  const source = clean(p.source, 40) || 'site';

  let total;
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = waitlistSheet();
    if (listedEmails(sheet).indexOf(email) !== -1) return reply({ ok: true });
    sheet.appendRow([new Date(), asText(name), asText(email), asText(flavors), asText(source)]);
    total = sheet.getLastRow() - 1;
  } finally {
    lock.releaseLock();
  }

  try {
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      replyTo: email,
      subject: 'New drop signup: ' + (name || email),
      body: [
        'Name: ' + (name || '(none)'),
        'Email: ' + email,
        'Flavors: ' + (flavors || '(none picked)'),
        'Came from: ' + source,
        '',
        total + ' people on the list now.',
        SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      ].join('\n'),
    });
  } catch (err) {
    console.error('Signup saved but notification failed', err); // e.g. daily mail quota
  }
  return reply({ ok: true });
}

// Opening the web app URL in a browser shows this, which confirms it's live.
function doGet() {
  return reply({ ok: true, service: 'too-much-chips-drop-list' });
}

// Adds a "Drop list" menu to the Sheet for drop day.
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Drop list')
    .addItem('Copy all emails (for BCC)', 'showEmails')
    .addToUi();
}

function showEmails() {
  const emails = listedEmails(waitlistSheet()).filter(String);
  const safe = emails.join(', ').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const html = HtmlService.createHtmlOutput(
    '<p style="font-family:sans-serif">Paste these into the BCC line of your drop email.</p>' +
    '<textarea style="width:100%;height:240px" onclick="this.select()">' + safe + '</textarea>'
  ).setWidth(520).setHeight(340);
  SpreadsheetApp.getUi().showModalDialog(html, emails.length + ' people on the drop list');
}

function waitlistSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function listedEmails(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return [];
  return sheet.getRange(2, 3, last - 1, 1).getValues().map(function (row) {
    return String(row[0]).trim().toLowerCase();
  });
}

function clean(value, max) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

// Stops Sheets from treating input like "=IMPORTXML(...)" as a formula.
function asText(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
