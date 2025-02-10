/// <reference types="cypress" />

describe("Reqres API Tests", () => {
  // Test Case 1 – GET: List Users
  describe("GET - List Users", () => {
    it("should return a list of users with correct details", () => {
      cy.request("GET", "https://reqres.in/api/users?page=2").then(
        (response) => {
          // Assert status code 200
          expect(response.status).to.eq(200);

          const body = response.body;
          // Assert that "total" equals 12 (as per API sample)
          expect(body).to.have.property("total", 12);
          // Assert that "page" is 2
          expect(body).to.have.property("page", 2);
          // Assert that the number of users in "data" equals the "per_page" value.
          expect(body.data).to.have.length(body.per_page);
          // Optionally, assert that the length of data is less than the total number of users.
          expect(body.data.length).to.be.lessThan(body.total);

          // Assert that the first and second user have the expected last names.
          // For page=2, the expected last names are "Lawson" and "Ferguson"
          expect(body.data[0]).to.have.property("last_name", "Lawson");
          expect(body.data[1]).to.have.property("last_name", "Ferguson");

          // Optional bonus: Assert the data types for key response properties.
          expect(body.page).to.be.a("number");
          expect(body.per_page).to.be.a("number");
          expect(body.total).to.be.a("number");
          expect(body.total_pages).to.be.a("number");
          expect(body.data).to.be.an("array");
          body.data.forEach((user: any) => {
            expect(user.id).to.be.a("number");
            expect(user.email).to.be.a("string");
            expect(user.first_name).to.be.a("string");
            expect(user.last_name).to.be.a("string");
            expect(user.avatar).to.be.a("string");
          });
        }
      );
    });
  });

  //Test Case 2 – POST: Create a User
  describe("POST - Create a user", () => {
    it("should create a new user and validate response details", () => {
      // Load test data from an external fixture.
      cy.fixture("createUser").then((userData) => {
        const responseTimeLimit = 150; // Increased limit to 150 ms

        cy.request({
          method: "POST",
          url: "https://reqres.in/api/users",
          body: userData,
          failOnStatusCode: false,
        }).then((response) => {
          // Assert HTTP status code 201 (Created)
          expect(response.status).to.eq(201);

          // Assert that the response contains an "id" and "createdAt" field.
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("createdAt");

          // Assert that the response echoes back the "name" and "job" from the request.
          expect(response.body.name).to.eq(userData.name);
          expect(response.body.job).to.eq(userData.job);

          // Assert that the response time is less than the defined limit.
          expect(response.duration).to.be.lessThan(responseTimeLimit);

          // Optional bonus: Validate the response schema structure.
          expect(response.body).to.have.all.keys(
            "name",
            "job",
            "id",
            "createdAt"
          );
          expect(response.body.name).to.be.a("string");
          expect(response.body.job).to.be.a("string");
          expect(response.body.id).to.be.a("string");
          expect(response.body.createdAt).to.be.a("string");
        });
      });
    });
  });
});
