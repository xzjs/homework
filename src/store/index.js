import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    answers: [],
  },
  mutations: {
    addImg(state, img) {
      state.images.push(img);
    },
    addAnswer(state, answer) {
      state.answers.push(answer);
    }
  },
})
