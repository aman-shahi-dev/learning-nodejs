const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8080;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/project-1")
  .then(() => {
    console.log("MongoDB connected!!!");
  })
  .catch((error) => {
    console.log("MongoDB error:", error);
  });

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  const html = `
    <ul>
      ${allUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// REST API
app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});

  // res.setHeader("X-MeraName", "Aman");
  return res.json(allUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    // const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);
    let user = await User.findById(req.params.id);
    // if (userIndex === -1) {
    //   return res.json({ message: "User not found" });
    // }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // users[userIndex] = { ...users[userIndex], ...data };
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   if (err) {
    //     return res.json("Error updating user");
    //   }
    //   return res.json({
    //     status: "user updated successfully ✅",
    //     user: users[userIndex],
    //   });
    // });

    Object.assign(user, req.body);

    await user.save();

    return res.status(200).json({
      user,
      message: "user updated successfully",
    });
    // we can also use findByIdAndUpdate
  })
  .delete(async (req, res) => {
    // const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);

    // if (userIndex === -1) {
    //   return res.json({ message: "User not found" });
    // }

    // users.splice(userIndex, 1);

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   if (err) {
    //     return res.json({ message: "Error deleting user" });
    //   }
    //   return res.json({ status: "user deleted successfully ✅" });
    // });

    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "user deleted!!",
    });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (!body.first_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });

  return res.status(201).json({
    message: "user created successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
