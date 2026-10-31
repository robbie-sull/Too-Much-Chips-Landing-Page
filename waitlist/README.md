# Drop list setup (one time, about 5 minutes)

Signups from the website go into a Google Sheet you own. Each new signup also
lands in your inbox. No paid service is involved.

## 1. Make the Sheet

1. Create a new Google Sheet in the Google account that should get the emails.
   Name it **Too Much Chips Drop List**.
2. In the Sheet, open **Extensions → Apps Script**.
3. Delete what's in `Code.gs` and paste in everything from [`Code.gs`](Code.gs)
   in this folder. Click **Save**.

## 2. Publish it as a web app

1. Click **Deploy → New deployment**. Next to "Select type", click the gear and
   choose **Web app**.
2. Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy**.
3. Google asks you to authorize. Pick your account. You'll see "Google hasn't
   verified this app" because you wrote it yourself: click **Advanced → Go to
   (project name)** and **Allow**. The script can only touch this Sheet and
   send email as you.
4. Copy the **Web app URL**. It ends in `/exec`.

Open that URL in a browser. You should see `{"ok":true,...}`.

## 3. Point the website at it

Paste the URL into `WAITLIST_URL` in [`src/config/drop.ts`](../src/config/drop.ts)
and commit. Vercel redeploys on its own.

## Drop day

- Set `NEXT_DROP` in `src/config/drop.ts` (for example `'Sat, Nov 15'`) so the
  site shows the date.
- In the Sheet, use **Drop list → Copy all emails (for BCC)** and paste them
  into the BCC line of one email. Put the people in BCC, not To, so nobody
  sees anyone else's address.
- If someone asks to be taken off the list, delete their row.

## Changing the script later

After editing the script, use **Deploy → Manage deployments → (pencil) →
Version: New version → Deploy**. That keeps the same URL, so the website
doesn't need to change.
