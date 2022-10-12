# sbxd: sxrapbox diary

## Getting Started

Update `sbxd.config.js`.

```
const sbxdConfig = {
  projectId: 'villagepump',
  userId: 'shoya140',
  startDate: '2022-08-01',
  title: '井戸端日記帳',
}
```

Fetch recent scrapbox posts.

```
$ yarn fetch
# or
$ yarn fetch-all
```

Run the server or export web pages as a static site.

```bash
$ yarn build && yarn start
# or
$ yarn export
```
