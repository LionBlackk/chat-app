import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import EventEmitter from "eventemitter3";
const app = express.default();
const EE = new EventEmitter();
app.use(express.json({ limit: "64mb" }));
app.use(express.urlencoded({ limit: "64mb", extended: true }));
app.set("trust proxy", 1);
app.post("/", (_req, res) => {
  res.send({ uptime: process.uptime() });
});

app.post("/trigger/conversation/new", (req, res) => {
  //email
  const { id } = req.query;
  EE.emit("conversationNew", {
    id,
    data: req.body,
  });
  res.json({
    status: true,
  });
});

app.post("/trigger/conversation/update", (req, res) => {
  const { id } = req.query;
  EE.emit("conversationUpdate", {
    id,
    data: req.body,
  });
  res.json({
    status: true,
  });
});

app.post("/trigger/conversation/remove", (req, res) => {
  const { id } = req.query;
  EE.emit("conversationRemove", {
    id,
    data: req.body,
  });
  res.json({
    status: true,
  });
});

app.post("/trigger/messages/new", (req, res) => {
  const { id } = req.query;
  EE.emit("messageNew", {
    id,
    data: req.body,
  });
  res.json({
    status: true,
  });
});

app.post("/trigger/message/update", (req, res) => {
  const { id } = req.query;
  EE.emit("messageUpdate", {
    id,
    data: req.body,
  });
  res.json({
    status: true,
  });
});

const server = http.createServer(app);

const io = new socketio.Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
let conversations: any = [];
let connections: any = [];

function getSocketIdByEmail(email: string) {
  let socketId: any;
  conversations.find((conversation: any) => {
    return conversation.users.find((user: any) => {
      if (user.email === email) {
        socketId = user.socketId;
      }
    });
  });
  return socketId;
}
function getEmailBySocketId(socketId: string) {
  let email: any;
  conversations.find((conversation: any) => {
    return conversation.users.find((user: any) => {
      if (user.socketId === socketId) {
        email = user.email;
      }
    });
  });
  return email;
}

function getUsersByConversationId(conversationId: string) {
  let conversation = conversations.find((conversation: any) => {
    if (conversation.conversationId === conversationId) {
      return conversation;
    }
  });
  return conversation.users;
}

io.on("connection", (socket) => {
  if (socket.id) {
    connections.push(socket.id);
  }
  // const email = getEmailBySocketId(socket.id);
  // socket.emit("member_added", email);

  socket.on("connectionUser", (email) => {
    // connections.forEach((currentItem: any) => {
    //   if (currentItem === socket.id) {
    //     console.log("socketid" + socket.id + "you joined");
    //   }
    // });
    // const connectedMembers = connections.map((socketId: string) => {
    //   return getEmailBySocketId(socketId);
    // });
    connections.forEach((currentItem: string) => {
      io.to(currentItem).emit("member_added", email);
    });
    // Gửi danh sách các thành viên đang kết nối cho người mới đăng nhập
    const connectedMembers = connections.map((socketId: string) => {
      return getEmailBySocketId(socketId);
    });
    socket.emit("connected_members", connectedMembers);
  });

  socket.on("conversations", (data: any) => {
    let obj = conversations.find((o: any, i: number) => {
      if (o.conversationId === data.conversationId) {
        conversations[i] = {
          conversationId: data.conversationId,
          users: [
            ...conversations[i].users,
            {
              socketId: socket.id,
              email: data.email,
            },
          ],
        };
        return conversations[i];
      }
    });
    if (obj === undefined) {
      conversations.push({
        conversationId: data.conversationId,
        users: [
          {
            socketId: socket.id,
            email: data.email,
          },
        ],
      });
    }
  });

  socket.on("startCall", ({ roomID, callerID, targetEmail }) => {
    // Here you would find the socket ID of the user you wish to call
    let targetSocketId = getSocketIdByEmail(targetEmail);
    if (targetSocketId) {
      // Notify the target user about the incoming call
      io.to(targetSocketId).emit("callUser", {
        roomID,
        callerID,
        targetEmail,
      });
    }
  });

  EE.on("conversationNew", (data: any) => {
    let socketId = getSocketIdByEmail(data.id);
    //newConversation
    socket.to(socketId).emit("conversationNew", data.data);
  });

  EE.on("conversationUpdate", (data: any) => {
    let socketId = getSocketIdByEmail(data.id);
    socket.to(socketId).emit("conversationUpdate", data.data);
  });

  EE.on("conversationRemove", (data: any) => {
    let socketId = getSocketIdByEmail(data.id);
    socket.to(socketId).emit("conversationRemove", data.data);
  });

  EE.on("messageNew", (data: any) => {
    let users = getUsersByConversationId(data.id);
    users.forEach((user: any) => {
      socket.to(user.socketId).emit("messageNew", data.data);
    });
  });

  EE.on("messageUpdate", (data: any) => {
    let users = getUsersByConversationId(data.id);
    users.forEach((user: any) => {
      socket.to(user.socketId).emit("messageUpdate", data.data);
    });
  });

  socket.on("disconnect", () => {
    // console.log("disconnect:" + socket.id);
    // console.log(connections.length);
    // connections.forEach((currentItem: any) => {
    //   console.log(currentItem);
    // });
    const email = getEmailBySocketId(socket.id);
    const index = connections.indexOf(socket.id);
    if (index > -1) {
      connections.splice(index, 1);
    }

    if (email) {
      socket.emit("member_removed", email);
      connections.forEach((currentItem: string) => {
        socket.to(currentItem).emit("member_removed", email);
      });
    }
  });
});

server.listen(3001, () => {
  console.log("Running at localhost:3001");
});
