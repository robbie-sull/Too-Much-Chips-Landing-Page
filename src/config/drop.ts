// The two settings to touch when running a monthly drop.

// Shown on the site as "Next drop: …". Leave null until the date is set.
// Example: export const NEXT_DROP: string | null = 'Sat, Nov 15';
export const NEXT_DROP: string | null = null;

// The Google Apps Script web app that adds signups to the waitlist Sheet and
// emails a heads-up. Setup steps: waitlist/README.md. Empty = signups show as
// "opening soon" and the form is disabled.
export const WAITLIST_URL = 'https://script.google.com/macros/s/AKfycbxSzXDH87qdpiwb0l3bB4Bw7w3VLGTVfc1Zn5TRSgQ4u-LCSV7otwdTw3pDQ2pJ-T2Xpg/exec';

// Where the flyer QR code sends people. ref=flyer lets the Sheet show which
// signups came from paper.
export const FLYER_URL = 'https://toomuchchips.com/?ref=flyer#drop';
