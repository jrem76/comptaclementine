export const state = () => ({
  list: [],
  todo: {}
})

export const mutations = {
  set (state, params) {
    const todoElt = state.list.find(item => item.id === params.id)
    const indexOf = state.list.indexOf(todoElt)

    state.list = [
      ...state.list.slice(0, indexOf),
      params.todo,
      ...state.list.slice(indexOf + 1)
    ]
  },
  add (state, value) {
    state.list.unshift(value)
  },
  remove (state, todo) {
    state.list = state.list.filter(t => todo.id !== t.id)
  },
  setTodo (state, form) {
    state.todo = form
  },
  setList (state, list) {
    state.list = list
  }
}

export const actions = {
  async get ({ commit }) {
    await this.$axios.get(`/todos`)
      .then((res) => {
        if (res.status === 200) {
          commit('setList', res.data.filter((item) => !item.completed))
        }
      })
  },
  async show ({ commit }, params) {
    await this.$axios.get(`/todos/${params.todo_id}`)
      .then((res) => {
        if (res.status === 200) {
          commit('setTodo', res.data)
        }
      })
  },
  create ({ commit, state }, params) {
    const newTodo = {
      title: params.title,
      userId: 3,
      completed: false
    }

    // api returns always 201 as id even if todos has been created manually
    const id = Math.max.apply(Math, state.list.map(item => item.id))

    return this.$axios.post(`/todos`, newTodo).then((res) => {
      commit('add', {
        id: id + 1,
        ...newTodo
      })
    })
  },
  update ({ commit }, params) {
    return this.$axios.put(`/todos/${params.id}`, { todo: params }).catch((error) => console.info(error))
      .finally(() => (
        commit('set', { id: params.id, todo: params })
      ))
  },
  delete ({ commit }, params) {
    return this.$axios.delete(`/todos/${params.id}`).then(() => (
      commit('remove', { id: params.id })
    ))
  }
}
