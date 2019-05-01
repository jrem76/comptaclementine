<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">{{ edit ? 'Edit the todo' : 'Create your todo'}}</v-card-title>
        <v-card-text>
          <v-textarea v-model="todoTitle">
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancelEdit" v-if="edit">Cancel</v-btn>
          <v-btn color="primary" @click="updateTodo" v-if="edit">Update</v-btn>          
          <v-btn color="primary" @click="createTodo" v-else>Create</v-btn>
        </v-card-actions>
      </v-card>
      <v-list subheader two-line>
        <v-subheader>Todo list</v-subheader>
        <v-list-tile v-for="(item, index) in list" :key="`${index}-item`">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>
              <v-btn color="error" @click="removeTodo(item.id)">Delete</v-btn>
              <v-btn color="primary" @click="editTodo(item.id)">Show</v-btn>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      edit: false,
      todoTitle: null,
      todoId: null
    }
  },
  methods: {
    ...mapActions('todos', [
      'get',
      'delete',
      'create',
      'update'
    ]),
    removeTodo (id) {
      if (this.todoId === id) {
        this.cancelEdit()
      }

      this.delete({ id })
    },
    createTodo () {
      this.create({
        title: this.todoTitle
      })
    },
    editTodo (id) {
      this.todoId = id
      this.edit = true
      this.todoTitle = this.list.find((item) => item.id === id).title
    },
    cancelEdit (id) {
      this.edit = false
      this.todoTitle = null
      this.todoId = null
    },
    updateTodo () {
      const todoToUpdate = this.list.find((item) => item.id === this.todoId)

      this.update({
        ...todoToUpdate,
        title: this.todoTitle
      })
    }
  },
  computed: {
    ...mapState('todos', [
      'list'
    ])
  },
  mounted () {
    this.get()
  }
}
</script>

