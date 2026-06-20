<img src="./public/logo.svg" alt="Extensions Registry Catalog" width="120" />

# Next.js Extensions Registry Catalog

> Публичный каталог расширений для [Extensions Registry API](https://github.com/Zis1220/extensions-registry-api)

Каталог показывает расширения, категории и издателей. Страницы доступны по человекочитаемым URL и подготовлены для индексации поисковыми системами.

Кэш каталога вынесен во внешний Redis, поэтому он не теряется при перезапуске контейнера приложения и может использоваться несколькими экземплярами каталога одновременно.

Файлы скачиваются через API-маршрут Next.js. Каталог получает от Registry API временную ссылку на релиз и перенаправляет пользователя в S3-совместимое хранилище, откуда начинается загрузка файла.

**Live Demo:** [https://extensions.ivanzubkov.ru](https://extensions.ivanzubkov.ru)

## Содержание

- [Возможности](#возможности)
- [Стек](#стек)
- [Маршруты](#маршруты)
  - [Страницы](#страницы)
  - [API](#api)
- [Переменные окружения](#переменные-окружения)
- [SEO файлы](#seo-файлы)
- [Локальный запуск](#локальный-запуск)
- [Сборка и запуск через Docker](#сборка-и-запуск-через-docker)
- [Команды](#команды)
- [License](#license)

## Возможности

- Публичный каталог расширений, категорий и издателей
- `SEO` оптимизация для расширений, категорий и профилей издателей
- Роутинг на `App Router` с динамическими маршрутами
- `Server-side rendering` и кэшируемая загрузка данных
- `Server Components` и `Client Components`
- `Route Handler` для скачивания расширений
- Redirect на S3-совместимое хранилище через `Presigned URL`
- Внешний `Redis` кэш для Next.js
- Runtime-валидация переменных окружения и ответов API через `Zod`
- UI-компоненты на `Mantine`
- Структура проекта по `Feature-Sliced Design`
- Проверка FSD через `Steiger`
- Написан на `TypeScript`

## Стек

- **Frontend:** Next.js, React, TypeScript
- **Routing:** App Router
- **UI:** Mantine
- **Validation:** Zod
- **Cache:** Redis
- **Architecture:** Feature-Sliced Design
- **Code quality:** ESLint, Prettier, Steiger

## Маршруты

### Страницы

| URL | Описание |
| --- | --- |
| `/` | Главная |
| `/resources/[slug]` | Страница расширения |
| `/category/[slug]` | Страница категории |
| `/publishers/[slug]` | Страница издателя |

### API

| URL | Описание |
| --- | --- |
| `/api/download/[id]` | Получает ссылку на скачивание через Registry API и делает redirect |
| `/api/health` | Отдает результат доступности каталога |

## Переменные окружения

| Переменная | Назначение |
| --- | --- |
| `CATALOG_URL` | Публичный URL каталога. Используется для абсолютных SEO-ссылок |
| `REGISTRY_API_URL` | URL запущенного Extensions Registry API. Используется для получения данных |
| `REDIS_CACHE_ENABLED` | Включение Redis-кэша |
| `REDIS_URL` | URL Redis |
| `REDIS_CACHE_KEY_PREFIX` | Префикс ключей в Redis |

## SEO файлы

Добавьте и настройте `sitemap.xml` и `robots.txt` под свой домен, окружение и публичные маршруты проекта.

## Локальный запуск

### Требования

- Node.js v24.16.0
- Запущенный [Extensions Registry API](https://github.com/Zis1220/extensions-registry-api)

### Установка

```bash
git clone https://github.com/Zis1220/extensions-registry-catalog.git
cd extensions-registry-catalog

npm install
```

### Настройка окружения

```bash
cp .env.example .env
```

Заполните `.env` для режима разработки:

```env
CATALOG_URL=http://localhost:3000
REGISTRY_API_URL=http://localhost:3300

REDIS_CACHE_ENABLED=false
REDIS_URL=redis://localhost:6379
REDIS_CACHE_KEY_PREFIX=catalog:
```

> **Примечание:** в `next dev` кэш Next.js не используется полноценно, поэтому Redis не нужен для разработки через `npm run dev`.

### Запуск

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`.

### Проверка Redis кэша локально

Если нужно проверить поведение кэша, запустите Redis, соберите и запустите приложение:

```bash
# Запустить Redis
docker compose -f compose.yml -f compose.dev.yml up -d redis

# Включить Redis в .env
REDIS_CACHE_ENABLED=true

# Собрать и запустить
npm run build
npm run start
```

## Сборка и запуск через Docker

### Требования

- Docker и Docker Compose
- Запущенный [Extensions Registry API](https://github.com/Zis1220/extensions-registry-api)

### Настройка окружения

```bash
cp .env.example .env
```

Заполните `.env` для запуска:

```env
CATALOG_URL=https://domain.com
REGISTRY_API_URL=https://api.domain.com

REDIS_CACHE_ENABLED=true
REDIS_URL=redis://redis:6379
REDIS_CACHE_KEY_PREFIX=catalog:
```

### Запуск

```bash
docker compose -f compose.yml -f compose.prod.yml up --build -d
```

Приложение будет доступно на `http://localhost:3000`. 

Для публикации через HTTPS используйте reverse proxy, например NGINX. Он принимает внешний трафик, выполняет TLS-терминацию, проксирует запросы на контейнер приложения и может выполнять дополнительные инфраструктурные задачи: ограничение частоты запросов, сжатие и настройку HTTP-заголовков.

Live demo развернуто по такой схеме: https://extensions.ivanzubkov.ru

## Команды

| Команда | Описание |
| --- | --- |
| `npm run dev` | Запуск Next.js в режиме разработки |
| `npm run build` | Сборка приложения |
| `npm run start` | Запуск собранного приложения |
| `npm run lint` | Проверка ESLint |
| `npm run lint:fsd` | Проверка Feature-Sliced Design через Steiger |
| `npm run typecheck` | Проверка TypeScript без сборки |
| `npm run format` | Форматирование проекта через Prettier |

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

