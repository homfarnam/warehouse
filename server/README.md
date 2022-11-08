# Warehouse API

## Requirements

- [Node.js](https://nodejs.org/en/download/)

## Installing the Dependencies

```bash
npm install
```

## Starting the API

```bash
npm start
```

After installing the dependencies and starting the API, it should be available at <http://localhost:8000/>

## Try It with Postman

Try the API with [Postman](https://www.postman.com/downloads/)! You can import the [collection](Warehouse%20API.postman_collection.json) that comes with this ZIP file in Postman and you should be ready to go :)

## Documentation

Bellow is a detailed list of all the API endpoints, with examples.

- [Articles](#articles)
- [Products](#products)
- [Sales](#sales)

## Articles

### `GET /articles/`

Lists the entire article collection.

Request example:

```bash
curl --request GET 'http://localhost:8000/articles/'
```

Response example:

```json
[
  {
    "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
    "name": "Leg",
    "amountInStock": 12
  },
  {
    "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
    "name": "Screw",
    "amountInStock": 17
  },
  {
    "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
    "name": "Seat",
    "amountInStock": 2
  },
  {
    "id": "6892b98b-9b87-4520-9a9e-7528f1d78cb4",
    "name": "Table Top",
    "amountInStock": 1
  }
]
```

### `POST /articles/`

Creates a new article.

Request example:

```bash
curl --request POST 'http://localhost:8000/articles/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Leg",
  "amountInStock": 12
}'
```

Response example:

```json
{
  "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
  "name": "Leg",
  "amountInStock": 12
}
```

**NOTE:** A new `id` will be generated. You don't have to provide it.

### `GET /articles/:id`

Gets an article by `id`.

Request example:

```bash
curl --request GET 'http://localhost:8000/articles/0517f083-0e15-4876-8d1f-6fa45900431c'
```

Response example:

```json
{
  "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
  "name": "Leg",
  "amountInStock": 12
}
```

### `PATCH /articles/:id`

Patches an article by `id`.

Request example:

```bash
curl --request PATCH 'http://localhost:8000/articles/0517f083-0e15-4876-8d1f-6fa45900431c' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Patched Leg",
  "amountInStock": 24
}'
```

**NOTE:** You can only patch `name` and `amountInStock`. You can also use `amountToSubtract` to patch the _amount in stock_. The value provided will be subtracted from `amountInStock`.

Response example:

```json
{
  "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
  "name": "Patched Leg",
  "amountInStock": 24
}
```

### `DELETE /articles/:id`

Deletes an article by `id`.

Request example:

```bash
curl --request DELETE 'http://localhost:8000/articles/0517f083-0e15-4876-8d1f-6fa45900431c'
```

### `PATCH /articles/`

Bulk patch multiple articles at once.

Request example:

```bash
curl --request PATCH 'http://localhost:8000/articles/' \
--header 'Content-Type: application/json' \
--data-raw '[
  {
    "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
    "name": "Patched Leg",
    "amountInStock": 24
  },
  {
    "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
    "name": "Patched Screw",
    "amountToSubtract": 4
  }
]'
```

**NOTE:** You can only patch `name` and `amountInStock`. You can also use `amountToSubtract` to patch the _amount in stock_. The value provided will be subtracted from `amountInStock`.

Response example:

```json
[
  {
    "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
    "name": "Patched Leg",
    "amountInStock": 24
  },
  {
    "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
    "name": "Patched Screw",
    "amountToSubtract": 13
  }
]
```

## Products

### `GET /products/`

Lists the entire product collection.

Request example:

```bash
curl --request GET 'http://localhost:8000/products/'
```

Response example:

```json
[
  {
    "id": "a269a247-0d38-4b47-9630-79c9ae545b68",
    "name": "Dining Chair",
    "articles": [
      {
        "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
        "amountRequired": 4
      },
      {
        "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
        "amountRequired": 1
      },
      {
        "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
        "amountRequired": 8
      }
    ]
  },
  {
    "id": "6fed6191-ee01-4563-a33d-5010abe0db36",
    "name": "Dining Table",
    "articles": [
      {
        "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
        "amountRequired": 4
      },
      {
        "id": "6892b98b-9b87-4520-9a9e-7528f1d78cb4",
        "amountRequired": 1
      },
      {
        "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
        "amountRequired": 8
      }
    ]
  }
]
```

### `POST /products/`

Creates a new product.

Request example:

```bash
curl --request POST 'http://localhost:8000/products/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Dining Chair",
  "articles": [
    {
      "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
      "amountRequired": 4
    },
    {
      "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
      "amountRequired": 1
    },
    {
      "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
      "amountRequired": 8
    }
  ]
}'
```

Response example:

```json
{
  "id": "a269a247-0d38-4b47-9630-79c9ae545b68",
  "name": "Dining Chair",
  "articles": [
    {
      "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
      "amountRequired": 4
    },
    {
      "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
      "amountRequired": 1
    },
    {
      "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
      "amountRequired": 8
    }
  ]
}
```

**NOTE:** A new `id` will be generated. You don't have to provide it.

### `GET /products/:id`

Gets a product by `id`.

Request example:

```bash
curl --request GET 'http://localhost:8000/products/a269a247-0d38-4b47-9630-79c9ae545b68'
```

Response example:

```json
{
  "id": "a269a247-0d38-4b47-9630-79c9ae545b68",
  "name": "Dining Chair",
  "articles": [
    {
      "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
      "amountRequired": 4
    },
    {
      "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
      "amountRequired": 1
    },
    {
      "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
      "amountRequired": 8
    }
  ]
}
```

### `PATCH /products/:id`

Patches a product by `id`.

Request example:

```bash
curl --request PATCH 'http://localhost:8000/products/a269a247-0d38-4b47-9630-79c9ae545b68' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Patched Dining Chair",
  "articles": [
    {
      "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
      "amountRequired": 8
    },
    {
      "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
      "amountRequired": 1
    },
    {
      "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
      "amountRequired": 16
    }
  ]
}'
```

**NOTE:** You can only patch `name` and `articles`.

Response example:

```json
{
  "id": "a269a247-0d38-4b47-9630-79c9ae545b68",
  "name": "Patched Dining Chair",
  "articles": [
    {
      "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
      "amountRequired": 8
    },
    {
      "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
      "amountRequired": 1
    },
    {
      "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
      "amountRequired": 16
    }
  ]
}
```

### `DELETE /products/:id`

Deletes a product by `id`.

Request example:

```bash
curl --request DELETE 'http://localhost:8000/products/a269a247-0d38-4b47-9630-79c9ae545b68'
```

## Sales

### `GET /sales/`

Lists the entire sale collection.

Request example:

```bash
curl --request GET 'http://localhost:8000/sales/'
```

Response example:

```json
[
  {
    "id": "da5846e7-ba53-4189-b062-81fc64582431",
    "createdAt": "2020-11-13T12:00:00.123",
    "productId": "a269a247-0d38-4b47-9630-79c9ae545b68",
    "amountSold": 1
  },
  {
    "id": "e1981c6f-7af3-43d9-ac6a-2c5da486f774",
    "createdAt": "2020-11-13T12:00:00.456",
    "productId": "6fed6191-ee01-4563-a33d-5010abe0db36",
    "amountSold": 1
  }
]
```

### `POST /sales/`

Creates a new sale.

Request example:

```bash
curl --request POST 'http://localhost:8000/sales/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "productId": "a269a247-0d38-4b47-9630-79c9ae545b68",
  "amountSold": 1
}'
```

Response example:

```json
{
  "id": "da5846e7-ba53-4189-b062-81fc64582431",
  "createdAt": "2020-11-13T12:00:00.123",
  "productId": "a269a247-0d38-4b47-9630-79c9ae545b68",
  "amountSold": 1
}
```

**NOTE:** A new `id` and `createdAt` will be generated. You don't have to provide them.

### `GET /sales/:id`

Gets a sale by `id`.

Request example:

```bash
curl --request GET 'http://localhost:8000/sales/da5846e7-ba53-4189-b062-81fc64582431'
```

Example response:

```json
{
  "id": "da5846e7-ba53-4189-b062-81fc64582431",
  "createdAt": "2020-11-13T12:00:00.123",
  "productId": "a269a247-0d38-4b47-9630-79c9ae545b68",
  "amountSold": 1
}
```

### `PATCH /sales/:id`

Patches a sale by `id`.

Request example:

```bash
curl --request PATCH 'http://localhost:8000/sales/da5846e7-ba53-4189-b062-81fc64582431' \
--header 'Content-Type: application/json' \
--data-raw '{
  "amountSold": 2
}'
```

**NOTE:** You can only patch `amountSold`.

Response example:

```json
{
  "id": "da5846e7-ba53-4189-b062-81fc64582431",
  "createdAt": "2020-11-13T12:00:00.123",
  "productId": "a269a247-0d38-4b47-9630-79c9ae545b68",
  "amountSold": 2
}
```

### `DELETE /sales/:id`

Deletes a sale by `id`.

Request example:

```bash
curl --request DELETE 'http://localhost:8000/sales/da5846e7-ba53-4189-b062-81fc64582431'
```
