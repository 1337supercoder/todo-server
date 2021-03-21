# todo-server

## Get started

Для работы с проектом понадобятся следующие пакеты:

1. `nvm`
2. `yarn`
3. `docker`

### Инициализация
Первым делом начнём использовать нужную версию ноды и установим все нужные
пакеты

```bash
yarn todo:init
```

### docker & postgresql
Далее запустим докер контейнер с базой данных

```bash
yarn docker:postgres:init 
```

Если потребуется взаимодействовать с базой напрямую используйте команды

```bash
yarn docker:postgres:exec 	# подключаемся к оболочке контейнера
psql -U example 			# подключаемся к оболочке psql (user: 'example')
```
Далее всё стандартно для `postgresql`.

### typeorm

Миграции

```bash
yarn typeorm:migration:create <migration_name> 		# Создать миграцию
yarn typeorm:migration:generate <migration_name> 	# Генерация миграции
yarn typeorm:migration:run 							# Запуск всех миграций
yarn typeorm:migration:revert						# Отмена последней миграции
```
