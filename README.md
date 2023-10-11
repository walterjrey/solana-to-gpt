# Solana to GPT

Integration of the Solana blockchain with the GPT-4 language model to retrieve and process data from the blockchain and answer related queries for Hyperdrive Hackatoon.

## Prerequisites

- Python 3.10+
- Node.js 18+
- Yarn or npm
- Docker and Docker Compose


## Getting Started

### Backend

1. Navigate to the `backend` directory:

2. To start additional services (Redis and PostgreSQL) using Docker Compose:

3. Install dependencies using `poetry`:

4. Start the development server with `uvicorn main:app --reload`:


The backend server will be running at `http://localhost:8000`.

### Frontend

1. Navigate to the `frontend` directory:

2. Install dependencies using `yarn` or `npm`:

3. Start the development server:

npm run dev


The frontend server will be running at `http://localhost:3000`.

## Key Dependencies

### Backend
- all dependencies into pyproject.toml

### Frontend
- all dependencies into package.json
## Contributing

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and test.
4. Submit a pull request describing your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
