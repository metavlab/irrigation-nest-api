# Framework Usage

- Authencation Bearer
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ3YWRlIiwidmVyc2lvbiI6IjEiLCJwbGF0Zm9ybSI6MiwiaWF0IjoxNjg0MjA1NDg5LCJleHAiOjE3MTUzMDk0ODksImlzcyI6Imp3dC5hbmdsYXIuZGV2In0.0FmWLc5wwY4EvhWORbdylOsOCIGgyMpmcefZnP69CQk
{
  "id": 1,
  "username": "wade",
  "version": "1",
  "platform": 2,
  "iat": 1684205489,
  "exp": 1715309489, //2024-05-10
  "iss": "jwt.anglar.dev"
}

## Init Develop DB 
> Execute docker file

```bash
# run at docker-compose.yml file dir
docker-compose -f  docker-compose.yml up -d
```

## Decorators

### PublicApi

> Make api no need authencation

- for example api :/xxx will not authencation

```ts
//method 
@PublicApi()
@Get('/xxx')
someMethod(...args){}
```

### ApiIgnoreTransform
> If user this decorator API response will not transform data struct



```ts
@ApiIgnoreTransform()
someMethod(...args){}

// no ApiIgnoreTransform response struct
{
    code:0,
    message:'Success',
    result:{
        username:'abc',
        mobile:'12312345678',
        ...
    }
}

// add ApiIgnoreTransform response struct
{
    username:'abc',
    mobile:'12312345678',
    ...
}

```

### JWT validate

https://jwt.io/

Signature algorithm: HS256:    HMAC using SHA-256 hash algorithm (default)