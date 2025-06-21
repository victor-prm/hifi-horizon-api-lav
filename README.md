# HiFi Horizon API

## Installation:

```
npm install
```

Run

```
npm start
```

## Endpoints:
To log in:
```
/login              POST
```

---

To sign up:
```
/register           POST
```

---

To get product list:
```
/products           GET
```

---

To get product detail by id:
```
/products/*id*      GET
```

---

To get/add to newsletter list:
```
/newsletter_list    GET / POST
```

---

To get a user by id:
```
/users/*id*         GET / PATCH (JWT SESSION TOKEN REQ.)
```

---

To get user with current session token:
```
/me                 GET (JWT SESSION TOKEN REQ.)
```

Read about `json-server` to learn how to do things like pagination and limitation on https://www.npmjs.com/package/json-server
