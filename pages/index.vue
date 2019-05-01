<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to the todo-list</v-card-title>
        <v-card-text>
          <v-input name="title"></v-input>  

          Todo-message
          <v-textarea>

          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/todos/add">Add a todo</v-btn>
          <v-btn color="primary" flat nuxt to="/todos/">Get all todos</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
