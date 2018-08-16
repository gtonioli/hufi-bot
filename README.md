# Hufi Bot

## Configure

```
npm install
```

## Build

```
npm run-script build
```

## Run

```
npm start
```

## Deploy

### Configuration
Initial configuration
```
heroku login
heroku create
```

Add remote to already existing project
```
heroku git:remote -a APP_NAME
```

Config your Discord Token
```
heroku config:set DISCORD_TOKEN=XXX
```

### Deploy to Heroku
```
git push heroku master
```
