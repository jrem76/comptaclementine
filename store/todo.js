import merge from 'lodash.merge'

export const state = () => ({
  list: [],
  todo: {}
})

export const mutations = {
  set (state, todo) {
    state.list = todo
  },
  add (state, value) {
    merge(state.list, value)
  },
  remove (state, { todo }) {
    state.list.filter(c => todo.id !== c.id)
  },
  setTodo (state, form) {
    state.todo = form
  }
}

export const actions = {
  async get ({ commit }) {
    await this.$axios.get(`/todos`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  async show ({ commit }, params) {
    await this.$axios.get(`/todos/${params.todo_id}`)
      .then((res) => {
        if (res.status === 200) {
          commit('mergetodos', res.data)
        }
      })
  },
  async set ({ commit }, todos) {
    await commit('set', todos)
  },
  async add ({ commit }, todo) {
    await commit('add', todo)
  },
  create ({ commit }, params) {
    return this.$axios.post(`/todos/add`, { todo: params })
  },
  update ({ commit }, params) {
    return this.$axios.put(`/todos/${params.id}`, { todo: params })
  },
  delete ({ commit }, params) {
    return this.$axios.delete(`/todos/${params.id}`)
  }
}
