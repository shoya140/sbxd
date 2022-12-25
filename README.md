# sbxd: sxrapbox-diary

sbxd is software that creates a website from Scrapbox diary. The diary, in this context, is a single piece of text beginning with a user icon on a page named in a specific format such as YYYY/MM/DD. For example, [this page](https://diary.shoya.io/2022/11#22) was generated with contents in [villagepump/2022/11/22](https://scrapbox.io/villagepump/2022%2F11%2F22) and [shoya140/2022/11/22](https://scrapbox.io/shoya140/2022%2F11%2F22).

## How to use

Update `sbxd.config.js` with your information.

```
const sbxdConfig = {
  userId: 'shoya140',
  title: '井戸端日記帳',
  projects: [
    {
      projectId: 'shoya140',
      startDate: '2022-11-21',
    },
    {
      projectId: 'villagepump',
      startDate: '2022-08-01',
      endDate: '2022-11-22',
    },
  ],
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
