# Reqres API Tests

This repository contains automated API tests for the [Reqres](https://reqres.in/) REST API using Cypress with TypeScript. The tests cover two key scenarios:

1. **GET - List Users**: Retrieve a list of users and validate the response details.
2. **POST - Create a User**: Create a new user using data-driven testing (external fixture) and validate the response.

Both test cases include optional bonus validations.

## Test Scenarios Overview

### Test Case 1 – GET: List Users

- **Objective**:  
  Validate that a GET request returns a list of users along with correct metadata.
- **Endpoint**:  
  `https://reqres.in/api/users?page=2`
- **What is Tested**:
  - The API returns a 200 status code.
  - The response includes a `total` property equal to 12 (as per the sample API).
  - The response includes a `page` property equal to 2.
  - The number of users in the `data` array equals the value of the `per_page` property.
  - The length of the `data` array is less than the total number of users.
  - The first user's `last_name` is `"Lawson"` and the second user's `last_name` is `"Ferguson"`.
  - _(Optional Bonus)_ The test asserts the data types for key properties (e.g., numbers for `page`, `per_page`, etc.).

### Test Case 2 – POST: Create a User

- **Objective**:  
  Validate that a new user can be created using data from an external fixture.
- **Endpoint**:  
  `https://reqres.in/api/users`
- **What is Tested**:
  - The API returns a 201 status code indicating that the user was created.
  - The response contains an `id` and a `createdAt` timestamp.
  - The response echoes back the `name` and `job` from the request.
  - The response time is less than a specified limit (150 ms in our tests).
  - _(Optional Bonus)_ The test verifies that the response structure contains all required keys with values of the expected data types.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/saucedemo-cypress-tests.git
   cd saucedemo-cypress-tests

   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Tests

1. **Headless Mode (Command Line)**

   ```bash
   npm run headless

   ```
