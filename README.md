# Cache shared data for Next.js

This repo has two approatches to cache data before you start build your Next.app

### Disk cache server

Run this command for caching all data on disk

```
$ npm run cache-requests
```

Start server which serve cached data

```
$ npm run cache-server
```

### In-memory cache server

This command runs server which requests data one time and returns it

```
$ npm run proxy-cache-server
```
