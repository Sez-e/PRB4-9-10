# 🛍️ Интернет-магазин (каталог и админка)

Этот проект содержит несколько серверов и простой фронтенд:

- **product_server** — HTTP-сервер, отдающий HTML-страницу с карточками товаров (порт `3000`)
- **admin_api** — HTTP API для управления товарами (порт `8080`)
- **graphql_server** — GraphQL API для получения данных о товарах (порт `4000`)
- **chat_server** — WebSocket сервер для чата поддержки (порт `5000`)
- **index.html** — простой клиент без фреймворков

---

## Установка и запуск

### 1. Установка зависимостей

Перейдите в корневую директорию проекта и выполните:

```bash
npm install
```

Затем установите зависимости для каждого сервера:

```bash
cd product_server
npm install
cd ..

cd admin_api
npm install
cd ..

cd graphql_server
npm install
cd ..

cd chat_server
npm install
cd ..
```

### 2. Запуск серверов

Откройте 4 терминала:

```bash
# Терминал 1
cd product_server
node server.js

# Терминал 2
cd admin_api
node server.js

# Терминал 3 
cd graphql_server
node server.js

# Терминал 4
cd chat_server
node server.js
```

---

## Интерфейсы

- Каталог товаров (клиент): [http://localhost:3000]
- Админка (API): [http://localhost:8080]
- Swagger UI: [http://localhost:8080/api-docs]
- GraphQL Playground: [http://localhost:4000/graphql]
- WebSocket чат: ws://localhost:5000

---

### Эндпоинты:

#### `GET /api/products`

Получить список всех товаров.

**Ответ:** `200 OK`  
```json
[
  {
    "id": 1,
    "name": "Товар 1",
    "price": 199.99,
    "description": "Описание товара",
    "categories": ["одежда"]
  }
]
```

---

#### ➕ `POST /api/products`

Добавить **один** или **массив** товаров.

**Тело запроса:**
```json
[
  {
    "name": "Новый товар",
    "price": 299.99,
    "description": "Описание",
    "categories": ["техника", "электроника"]
  }
]
```

**Ответ:** `201 Created`

---

#### `PUT /api/products/{id}`

Редактировать товар по ID.

**Тело запроса:**
```json
{
  "name": "Обновлённый товар",
  "price": 250.00,
  "description": "Новое описание",
  "categories": ["одежда"]
}
```

**Ответы:**
- `200 OK` — успешно обновлён
- `404 Not Found` — товар не найден

---

#### `DELETE /api/products/{id}`

Удалить товар по ID.

**Ответы:**
- `200 OK` — успешно удалено
- `404 Not Found` — не найден