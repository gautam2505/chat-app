
<script>
import io from "socket.io-client";

export default {
  name: "ChatRoom",
  data() {
    return {
      // socket: io(),
      message: "",
      users: [],
      username: "",
      userExist: false,
      messages: [
        // {
        //   id: 1,
        //   text: "Hello world",
        //   user: 'Gautam'
        // },
      ],
    };
  },
  methods: {
    sendMessage() {
      // this.socket.emit("message", this.message);
      // console.log("new connection...");
      const message = {id: Math.random(), text: this.message, user: this.username};
      this.messages.push(message);
      this.socketInstance.emit('message', message)
      this.message = "";
    },
    joinChat() {
      this.users.push(this.username);
      this.userExist = true;
      // this.username = "";
      this.socketInstance = io("http://localhost:3000");
      
      this.socketInstance.on(
        'message:received', (data) => {
          this.messages.push(data);
        }
      )
    },
  },
  //   created() {
  //       socket = io();
  //   }
};
</script>

<template>
  <div>
    <div>
      <div v-if="!userExist" class="name-container">
        <input type="text" class="user-name" v-model="username" />
        <button @click="joinChat">Join Chat</button>
      </div>
    </div>
    <div v-if="userExist ">
      <div v-for="message in messages" v-bind:key="message.id">
      <b>
        {{message.user}}
      </b>
      : {{ message.text }}
    </div>
    </div>
    <form v-if="userExist" @click.prevent="sendMessage">
      <!-- Hit enter to send message -->
      <textarea
        v-on:keyup.enter="sendMessage"
        type="text"
        v-model="message"
        placeholder="Message..."
      />
      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
</style>