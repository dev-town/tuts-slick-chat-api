# Slick Chat - API

Slick Chat Serverless API - for use as part of the Dev Town "Slick Chat" course.

This API uses serverless, AWS, Lambda, and DynamoDB.

The authentication service MUST be deployed before this service is deployed:

Auth service repo:
[Slick Chat Auth Service](https://github.com/dev-town/tuts-slick-chat-auth-service)

## To Deploy
```
sls deploy
```

## To generate typescript types from the GraphQL schema.
```
npm run generate
```

## To create a system message for all channels
```
sls invoke -f systemMessage
```

