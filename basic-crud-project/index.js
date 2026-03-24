const express = require("express");
const mongoose = require("mongoose");

const app = express();
PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/basic-crud-project")
  .then(() => {
    console.log("MongoDB connected!!!");
  })
  .catch((error) => console.log("MongoDB error ::", error));

const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Profiles = mongoose.model("profiles", profileSchema);

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to profile server",
  });
});

app.get("/profile", async (req, res) => {
  const profiles = await Profiles.find({});
  if (!profiles) {
    return res.status(400).json({
      message: "no profiles found",
    });
  }

  return res.status(200).json({
    profiles,
    message: "profiles fetched successfully",
  });
});

app.post("/profile", async (req, res) => {
  const { name, email, dob } = req.body;
  const newProfile = await Profiles.create({ name, email, dob });
  if (!newProfile) {
    return res.status(400).json({
      message: "error while creating user",
    });
  }

  return res.status(201).json({
    message: "user created successfully!!!",
  });
});

app.patch("/profile/:id", async (req, res) => {
  await Profiles.findByIdAndUpdate(req.params.id, {
    email: "testuser@gmail.com",
  });

  return res.status(200).json({
    message: "user updated successfully",
  });
});

app.delete("/profile/:id", async (req, res) => {
  await Profiles.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("user deleted successfully");
    })
    .catch((error) => {
      console.log("MongoDB error ::", error);
    });
  return res.status(200).json({
    message: "user deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
