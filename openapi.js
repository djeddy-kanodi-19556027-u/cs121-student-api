module.exports = {
  openapi: "3.0.0",
  info: {
    title: "CS121 Student API",
    version: "1.0.0",
    description: "API for managing students in CS121"
  },
  servers: [{ url: "/" }],
  paths: {
    "/students": {
      get: {
        summary: "List students",
        responses: { "200": { description: "An array of students" } }
      },
      post: {
        summary: "Create a student",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { name: { type: "string" } },
                required: ["name"]
              }
            }
          }
        },
        responses: { "201": { description: "The created student" } }
      }
    },
    "/students/{id}": {
      get: {
        summary: "Read one student",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "One student" } }
      },
      put: {
        summary: "Update a student",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { name: { type: "string" } },
                required: ["name"]
              }
            }
          }
        },
        responses: { "200": { description: "The updated student" } }
      },
      delete: {
        summary: "Delete a student",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "204": { description: "No Content" } }
      }
    }
  }
};