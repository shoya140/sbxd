# sbxd: sxrapbox-diary

Update `sbxd.config.js` with your information.

```
const sbxdConfig = {
  // Your Scrapbox project ID.
  projectId: 'villagepump',

  // Your user ID in the project.
  userId: 'shoya140',

  // $ npm run fetch-all fetches all diary posts since this date.
  startDate: '2022-08-01',

  // used for the title of the website.
  title: '井戸端日記帳',
}
```

## How to host sbxd locally

Fetch recent Scrapbox posts.

```bash
$ npm run fetch
# or
$ npm run fetch-all
```

Run the dev server or export web pages as a static website.

```bash
$ npm run dev
# or
$ npm run build
# or
$ npm run build && npm run start
```

## How to host sbxd on GitHub Pages

If you host sbxd on GitHub Pages, the recent 3 posts will be automatically fetched from Scrapbox every day (00:00 UTC) by GitHub Actions. The following tutorial explains the details of the setup.

Click [Use this template](https://github.com/shoya140/sbxd/generate) button in this page and create a new repository. The `Include all branches` option must be turned on since we need a branch named `contents`.

![](https://i.gyazo.com/b0fbae9db92fccc958a7a00f13cf9c5c.png)

Go to the Settings tab and activate GitHub Pages. Select `GitHub Actions (Beta)` as the source and leave other fields blank.

![](https://i.gyazo.com/3606278d629322f94994aa7a56bf8750.png)

Go to the Actions tab and click `Run workflow` in the "Fetch all data..." workflow. This action needs to be manually performed once. Then "Deploy Next.js site to page" including fetching the recent 3 posts will be performed every day.

![](https://i.gyazo.com/4e539ad425e5313b9adb4394e00daeb0.png)
