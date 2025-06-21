const jsonServer = require("json-server-relationship");
const auth = require("json-server-auth");
const jwt = require("jsonwebtoken");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const port = process.env.PORT || 4000;

// /!\ Bind the router db to the app
app.db = router.db;

// Middleware
const middlewares = jsonServer.defaults();
app.use(middlewares);
app.use(jsonServer.bodyParser);

// Permission rules
const rules = auth.rewriter({
  users: 600,
});
app.use(rules);

// Custom /me endpoint
app.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];
  const decoded = jwt.decode(token);

  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  const user = app.db.get("users").find({ id: Number(decoded.sub) }).value();
  if (!user) return res.status(404).json({ error: "User not found" });

  // Important: Never expose sensitive data like passwords in API responses
  // Only return non-sensitive user fields
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    address2: user.address2,
    zip: user.zip,
    city: user.city,
    country: user.country,
    phone: user.phone,
    terms: user.terms,
    marketing: user.marketing,
  });
});

// Auth and JSON server router
app.use(auth);
app.use(router);

// Start server
app.listen(port, () => {
  console.log("Server is ready for requests on port " + port);
});

module.exports = app;