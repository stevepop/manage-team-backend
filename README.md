# Football Team Management Backend Project

> API project for football Team Management

## Build Setup


### Install dependencies
`$ npm install`

### Serve with hot reload at localhost:4000
`$ npm start`

### Configurartion

You will need to create a .env file in the root of the project to configure the following:

### File uploads
This project uses the multer package for file uploads. If using AWS S3, you will need to create a bucket on S3 then create a .env file with the following details;

```
ENABLE_S3=true
AWS_ACCESS_KEY=YOUR ACCESS KEY
AWS_SECRET_ACCESS_KEY=YOUR SECRET ACCESS KEY
AWS_REGION=S3 REGION
AWS_S3_BUCKET=S3 BUCKET
```

### JWT
You will need a secret for JWT authentication
```JWT_SECRET=`your super secret```

### Email
```
MAILTRAP_USERNAME=mailtrap username
MAILTRAP_PASSWORD=mailtrap password
```

### MONGO DB
`MONGODB_URI='mongodb://localhost:27017/myteam'`

Above URI will be the default if not set.

You can either install MongoDB locally, or create an account on Mongo DB atlas (https://cloud.mongodb.com)
Alternatively, you can spin up a Mongo DB Docker container on your local environment and expose relevant ports

```
docker run -d -p 27017:27017 --name team-mongo -v ~/dev/mongodb/data:/data/db mongo
```
where 'team-mongo' refers to the name you assign to your container and '~/dev/mongodb/data' refers to the host directory mapped to the docker instance mongo db data directory.

Make sure that the volume folder already exists before execute the docker command

You will need at least one user to login to the application. You can add a test user by logging in to your mongodb console
```
docker exec -it team-mongo mongo
```

- Create a new database
```
use myteam
```
- Add the users collection to the database
```
db.createCollection("users")
```
- Insert a new user document
```
db.users.insert({first_name: 'Steve', last_name: 'Popoola', email: 'steve@test.com', role: 'manager', password:'$2y$12$fx4FYLjFdoShIocGsSqACu79SoaajVs.HGor0dxDt.Scc3CazNWvy'})
```
Above hashed password is the word'secret'. Don't use this in production!!!

You should now be able to login to the application

### Author
Steve Popoola @stevepop
````
