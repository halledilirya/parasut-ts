### `TEST AMAÇLI OLUŞTURULMUŞTUR`

# Parasut-TS

Parasut API için TypeScript kütüphanesi

## Kurulum

`npm install parasut-ts`

## Kullanım

```typescript
import Parasut from "parasut-ts";

const parasut = new Parasut({
  client_id: "client_id",
  client_secret: "client_secret",
  redirect_uri: "redirect_uri",
  email: "email",
  password: "password",
  base_url: "https://api.parasut.com",
  firm_id: "firm_id",
});

// ...
const response = await parasut.sales.getContacts();
console.log(response);
// ...
```

```javascript
const Parasut = require("parasut-ts").default;
// veya
const { default: Parasut } = require("parasut-ts");

const parasut = new Parasut({
  client_id: "client_id",
  client_secret: "client_secret",
  redirect_uri: "redirect_uri",
  email: "email",
  password: "password",
  base_url: "https://api.parasut.com",
  firm_id: "firm_id",
});

// ...
const response = await parasut.sales.getContacts();
console.log(response);
// ...
```
