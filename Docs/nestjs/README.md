# NestJS

## Create project

```bash
nest -v # nest --help
nest new <project_name>
# select run command mode npm /yarn or pnpm
```

## Add Dependencies

```bash
pnpm i -D <package_name>
```

## NestJs JWT integation

- 1. import xxxMoudle
- 2. provider LocalStrategy 
- 3. build LocalAuthGuard
- 4. UseGuard(JwtAuthGuard)