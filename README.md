# Holiday Extras Technical Task

## Simple BE REST-API application to create, update, get and delete user.

### To run application locally

- Install dependencies
```
npm i
```

- Run server locally
```
npm run dev
```

#### Or using Docker
```
docker build -t holiday_extras .
docker run -d -p 3000:3000 holiday_extras
```

You can test the app by http://localhost:3000/docs

### To run tests
```
npm t
```