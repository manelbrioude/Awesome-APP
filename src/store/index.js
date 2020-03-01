import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    menu: "",
    cards: [],
    cardsCreated: [],
    cardsloaded: 0,
    newDate: {
      newYear: 0,
      newMonth: 0,
      newDay: 0
    }
  },
  mutations: {
    clearCards: state => {
      state.cards = [];
    },
    cardsloaded: state => {
      state.cardsloaded = state.cardsloaded + 10;
      console.log("cuants cartas:", state.cardsloaded);
    },
    fillcards: (state, payload) => {
      state.cards.push(payload);
    },

    getAge: (state, payload) => {
      var birthdate = payload.birthdate.split("-");
      var birthYear = birthdate[0];
      var birthMonth = birthdate[1];
      var birthDay = birthdate[2];
      var Age = state.newDate.newYear - birthYear;
      if (
        state.newDate.newMonth < birthMonth ||
        (state.newDate.newMonth == birthMonth &&
          state.newDate.newDay < birthDay)
      ) {
        Age = Age - 1;
      }
      var cardid = payload.id;
      state.cards[cardid - 1].birthdate =
        payload.birthdate + " " + "Age: " + Age;
    },
    newDay: state => {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      var day = today.getDay();
      state.newDate.newYear = year;
      state.newDate.newMonth = month;
      state.newDate.newDay = day;
    }
  },
  actions: {
    getcards({ state, commit }) {
      axios
        .get("Data.json")
        .then(function(res) {
          var newcards = res.data.slice(
            state.cardsloaded,
            state.cardsloaded + 10
          );
          for (var n = 0; n < newcards.length; n++) {
            var newcard = newcards[n];
            console.log(newcard.birthdate);
            commit("fillcards", newcard);
            commit("getAge", newcard);
          }
          commit("cardsloaded");
        })

        .catch(function(error) {
          console.log("Error: ", error);
        });
    },
    getmorecards({ state, commit }) {
      if (state.cardsloaded < 100) {
        axios
          .get("Data.json")
          .then(function(res) {
            var newcards = res.data.slice(
              state.cardsloaded,
              state.cardsloaded + 10
            );

            for (var n = 0; n < newcards.length; n++) {
              var newcard = newcards[n];
              commit("fillcards", newcard);
              commit("getAge", newcard);
            }
            commit("cardsloaded");
          })

          .catch(function(err) {
            console.log("Error: ", err);
          });
      }
    },
    addNewCard({ state }, payload) {
      if (state.cards.length == 0) {
        payload.id = state.cards.length;
        console.log(payload);
        state.cardsCreated.push(payload);
      }
    }
  },

  getters: {
    cards: state => state.cards
  }
});
