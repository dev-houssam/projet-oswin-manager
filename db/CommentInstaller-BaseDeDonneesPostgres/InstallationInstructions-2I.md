# Συγγραφέας
Houssam BACAR
--
Αυτό το αρχείο είναι ένα σενάριο bash που ρυθμίζει και αρχικοποιεί μια βάση δεδομένων PostgreSQL σε ένα κοντέινερ Docker. Εν συντομία!
--
Ακολουθεί μια λεπτομερής εξήγηση του περιεχομένου του:

## Κύρια βήματα

1. Λήψη της εικόνας PostgreSQL
2. Εκκίνηση του κοντέινερ PostgreSQL
3. Δημιουργία φακέλου στο κοντέινερ
4. Αντιγραφή αρχείου SQL στο κοντέινερ
5. Σύνδεση στη βάση δεδομένων

## Подробности команд

```bash
# Загрузка образа PostgreSQL
docker pull postgres

# Запуск контейнера PostgreSQL
docker run --name my-postgres -e POSTGRES_PASSWORD=perfectpassword -p 5432:5432 -d postgres
```
Эта команда создает контейнер с именем "my-postgres", устанавливает пароль, привязывает порт 5432 и запускает контейнер в фоновом режиме[1][2].

```bash
# Создание папки в контейнере
docker exec -it my-postgres bash
mkdir /home/winmanager
exit
```
Эти команды открывают интерактивную оболочку в контейнере, создают папку "winmanager", затем выходят из оболочки[2].

```bash
# Копирование SQL-файла в контейнер
docker cp ./dbwin.sql my-postgres:/home/winmanager/dbwin.sql
```
Эта команда копирует локальный SQL-файл в ранее созданную папку в контейнере[2].

```bash
# Подключение к базе данных
docker exec -it my-postgres psql -U postgres
```
Эта команда открывает интерактивную сессию PostgreSQL в контейнере[2][4].

## Инструкции по инициализации базы данных

Скрипт включает комментарии для создания и инициализации базы данных "winmanager":

```sql
CREATE DATABASE winmanager;
\c winmanager
\i /home/winmanager/dbwin.sql
```

## Настройка сервера Node.js

Скрипт заканчивается инструкциями по настройке сервера Node.js:

```bash
npm init -y
npm install
npm start
```

Наконец, упоминается, что интерфейс администрирования доступен по адресу `localhost:3000/_a`.
