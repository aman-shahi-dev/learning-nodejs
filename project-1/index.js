const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    },
  );
});

// ROUTES
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  console.log(req.headers);
  res.setHeader("X-MeraName", "Aman");
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.json({ message: "User not found" });
    }

    const data = req.body;
    users[userIndex] = { ...users[userIndex], ...data };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      if (err) {
        return res.json("Error updating user");
      }
      return res.json({
        status: "user updated successfully ✅",
        user: users[userIndex],
      });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.json({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      if (err) {
        return res.json({ message: "Error deleting user" });
      }
      return res.json({ status: "user deleted successfully ✅" });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.email ||
    !body.gender ||
    !body.job_title ||
    !body.last_name
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res.json("error creating user");
    }
    return res.status(201).json({ status: "success ✅", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
