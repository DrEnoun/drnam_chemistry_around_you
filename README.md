# Chemistry Around You · with Dr. NAM

**From Zero to Chemistry Hero!** A free, self-paced chemistry hub for learners with no science background: arts-stream students starting PHD115, and anyone curious about chemistry.

Every idea starts with an everyday question, then an analogy, then the science. There are no grades. Learners can choose to send anonymous feedback (how much they liked each stop, how helpful it was, and time spent).

## What is inside

| File | What it is |
| --- | --- |
| `index.html` | The whole hub: welcome page, journey map, Prelude plus Stops 1 to 6 (with 4B), activities, self-checks, feedback form |
| `config.js` | One setting: the address of your feedback inbox (Google Sheet) |
| `assets/bg-dna.mp4`, `assets/bg-dna.jpg` | Background video and its still image |
| `assets/logo.png`, `assets/logo-192.png`, `assets/avatar.png` | Chemistry with Dr. NAM logo, app icon, and the face used in "Dr. NAM Says" |
| `manifest.webmanifest`, `sw.js` | Let learners install the hub on their phone and use it offline |
| `apps-script/Code.gs` | The Google Sheet script that collects anonymous feedback |

## 1. Put the hub online (GitHub Pages)

1. On GitHub, create a new **public** repository, for example `chemistry-around-you`.
2. Click **Add file → Upload files**. Drag in everything from this folder, keeping the `assets` and `apps-script` folders. Click **Commit changes**.
3. Go to **Settings → Pages**. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
4. After 1 to 2 minutes, your hub is live at
   `https://YOUR-GITHUB-NAME.github.io/chemistry-around-you/`

The hub works straight away. Without step 2 below, each learner's progress stays on their own device.

## 2. Switch on feedback (Google Sheet, about 5 minutes)

1. With your Google account, create a new Google Sheet. Name it `Chemistry Around You · Feedback`.
2. In the Sheet, open **Extensions → Apps Script**.
3. Delete what is there, paste in everything from `apps-script/Code.gs`, and click **Save**.
4. Click **Deploy → New deployment**. Choose the type **Web app** and set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, allow the permissions, and **copy the Web app URL**. It starts with `https://script.google.com/macros/s/...`.
6. Back on GitHub, open `config.js`, click the pencil icon to edit, and paste the URL between the quotes:
   ```js
   feedbackUrl: "https://script.google.com/macros/s/XXXX/exec"
   ```
   Then **Commit changes**.

From now on, each learner device appears as one row in the **Feedback** tab and updates as they learn. Use Sheets' filters and charts to compare learners who never studied chemistry with those who did.

**If you edit `Code.gs` later**, deploy again with **Deploy → Manage deployments → Edit → New version**, so the URL stays the same.

## What the feedback sheet records

- Learner type and chemistry background (optional, chosen by the learner)
- Visits, first and last visit, and total minutes on the hub (counted only while the page is open)
- For each stop: minutes, completed or not, first-try answers out of 5, liking (1 to 5), helpfulness (1 to 5), what helped most, and optional comments
- "Would you recommend this?" (0 to 10)
- "Do you still remember?" checks after 7+ days away: how many, and how many were correct

No names, emails or student IDs are collected. Each device gets a random code. Learners can switch feedback off at the bottom of the page. If you plan to publish this data, apply for UiTM research ethics (REC) approval first.

## Editing content

All lesson text is in `index.html`, inside the `STOPS` list near the top of the script. Each card has four parts:

- `t`: title
- `a`: the analogy or everyday picture
- `s`: the science
- `l`: where the picture stops working (a note for teachers; not shown to learners)

When you add new stops (`s3`, `s4` ...), also add them to the `STOPS` line at the top of `apps-script/Code.gs` and deploy a new version.

---

For learning only. For your health, always ask a pharmacist or doctor.
© Dr. Nur 'Ainun Mokhtar (Dr. NAM), Faculty of Pharmacy, UiTM Cawangan Pulau Pinang.
