# WEATHER APP

A full-stack application built in Remix and MUI

## Setup

Get the Weather API key and put it as WEATHERAPI_KEY in the .env file.

Run docker-compose:

```sh
docker compose up -d
```

Put the database URL as DATABASE_URL in the .env file.

Generate Prisma client and database

```sh
npx prisma generate
```

```sh
npx prisma db push
```

Seed the data

```sh
npx prisma db seed
```

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
