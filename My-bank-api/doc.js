const swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "description": "My Bank API Description",
    "version": "1.0.0",
    "title": "My Bank API Description"
  },
  "host": "localhost:3000",
  "tags": [
    {
      "name": "account",
      "description": "Account management"
    }
  ],
  "paths": {
    "/account": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get existing accounts",
        "description": "Get existing accounts description",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Account"
              }
            }
          },
          "400": {
            "description": "Error occurred"
          }
        }
      },
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Created a new account",
        "description": "Created a new account with the received parameters",
        "operationId": "updatePet",
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account created"
          },
          "400": {
            "description": "Error occurred"
          }
        }
      }
    }
  },
  "definitions": {
    "Account": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Olívia Resende"
        },
        "balance": {
          "type": "integer",
          "example": 100
        }
      }
    }
  }
}

module.exports = swaggerDocument