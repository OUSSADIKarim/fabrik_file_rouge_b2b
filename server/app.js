import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"
import csurf from "csurf"
import { companyRouter } from "./routes/companyRoutes.js"
import { erroHandler } from "./middlewares/errorHandler.js"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import { employeeRouter } from "./routes/employeeRoutes.js"
import { authRouter } from "./routes/authRoutes.js"
import { chatRoomRouter } from "./routes/chatRoomRoutes.js"
import { messageRouter } from "./routes/messageRoutes.js"
import http from "http"
import { Server } from "socket.io"
import { postRouter } from "./routes/postRoutes.js"

const app = express()

dotenv.config()

const storage = multer.memoryStorage()
const upload = multer({ storage })

const connect = async () => {
  try {
    await mongoose.connect(process.env.DBURI)
    console.log("connected to DB")
  } catch (error) {
    throw error
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("DB disconnected")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(upload.single("logo"))
app.use(
  cors({
    origin: (origin, callback) => {
      const whiteList = ["http://localhost:5173"]
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        console.log("test")
        callback(new Error("Not allowed by CORS"))
      }
    },
    optionsSuccessStatus: 204,
    credentials: true,
  })
)
app.use(csurf({ cookie: { httpOnly: true } }))

// Socket.io
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  socket.on("join_ChatRoom", (data) => {
    socket.join(data)
  })

  socket.on("send_message", (data) => {
    socket.to(data.chatRoom).emit("receive_message", data)
  })
})

server.listen(8081, () => {
  console.log("socket io server running at http://localhost:8081")
})

app.use("/api/auth", authRouter)
app.use("/api/companies", companyRouter)
app.use("/api/employees", employeeRouter)
app.use("/api/chatRooms", chatRoomRouter)
app.use("/api/messages", messageRouter)
app.use("/api/posts", postRouter)

// swagger

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
}

const specs = swaggerJsdoc(options)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explore: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
)

app.use(erroHandler)

app.listen(process.env.PORT, async () => {
  try {
    await connect()
    console.log(`server connected on http://localhost:${process.env.PORT}`)
  } catch (error) {
    throw error
  }
})
