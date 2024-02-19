# Vayu Backend

This document provides the setup instructions for the Vayu backend project.

## Setup

1. **Clone the repository**: Clone the backend repository to your local machine.

2. **Install dependencies**: Run `yarn install` to install all the necessary dependencies.

3. **Environment Variables**: Replace all the `template.env` files with your `.env` file. There are currently 3 `.env` files:
    - One in the root directory
    - One in the `auth` project root directory
    - One in the `notifications` project root directory

4. **Start the Docker containers**: From the root directory, run `docker compose up`. This will create a PostgreSQL image and run the containers.

## API Documentation

- Visit `localhost:8000/api` for the Auth API documentation.
- Visit `localhost:8002/api` for the Notifications API documentation.

## Ports

- Ports 8001 and 8003 are allocated for TCP connections.

## API Usage

### GetMany Requests

- **Ordering**: `localhost:8000/api/users?order[id]=DESC` or `localhost:8000/api/users?order[id]=ASC`
- **Range-based selection**: `localhost:8000/api/users?range=[{"property":"id","lower":11,"upper":12}]&order[id]=DESC`
- **Multiple range-based selection**: `localhost:8000/api/users?range=[{"property":"id","lower":11,"upper":12},{"property":"name","lower":"j","upper":"k"}]`
- **Pagination**: `localhost:8000/api/users?skip=1&take=1` (skip = number of items to skip, take = number of items to take after skip)
- **Where**: `localhost:8000/api/users?name=Amrit`