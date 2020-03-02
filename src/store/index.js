import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    menu: "",
    firstsCardsAlreadyCreated: false,
    cards: [],
    cardsCreated: [],
    cardsLoaded: 0,
    numberOfNewCards: 0,
    cardCreated: false,
    newDate: {
      newYear: 0,
      newMonth: 0,
      newDay: 0
    }
  },
  mutations: {
    AlreadyCardsCreated: state => {
      state.firstsCardsAlreadyCreated = true;
    },
    newCard: state => {
      state.numberOfNewCards++;
    },
    clearCards: state => {
      state.cards = [];
    },
    cardsLoaded: state => {
      state.cardsLoaded = state.cardsLoaded + 10 - state.numberOfNewCards;
      console.log("cuants cartas:", state.cardsLoaded);
    },
    fillCards: (state, payload) => {
      state.cards.push(payload);
    },
    fillNewCards: (state, payload) => {
      state.cardsCreated.push(payload);
    },
    changeId: state => {
      for (var n = 0; n < state.cards.length; n++) {
        state.cards[n].id = state.cards[n].id + 1;
      }
    },

    newDay: state => {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      var day = today.getDay();
      state.newDate.newYear = year;
      state.newDate.newMonth = month;
      state.newDate.newDay = day;
    },
    changeCardCreated: state => {
      state.cardCreated = !state.cardCreated;
    }
  },
  actions: {
    getcards({ state, commit, dispatch }) {
      if (state.firstsCardsAlreadyCreated == false) {
        commit("AlreadyCardsCreated");

        axios
          .get("Data.json")
          .then(function(res) {
            var newcards = res.data.slice(
              state.cardsLoaded,
              state.cardsLoaded + 10
            );
            for (var n = 0; n < newcards.length; n++) {
              var newcard = newcards[n];
              console.log(newcard.birthdate);

              dispatch("getAge", newcard);
            }
            commit("cardsLoaded");
          })

          .catch(function(error) {
            console.log("Error: ", error);
          });
      }
    },
    getmorecards({ state, commit, dispatch }) {
      if (state.cardsLoaded < 100) {
        axios
          .get("Data.json")
          .then(function(res) {
            var newcards = res.data.slice(
              state.cardsLoaded,
              state.cardsLoaded + 10
            );

            for (var n = 0; n < newcards.length; n++) {
              var newcard = newcards[n];

              dispatch("getAge", newcard);
            }
            commit("cardsLoaded");
          })

          .catch(function(err) {
            console.log("Error: ", err);
          });
      }
    },
    addNewCard({ commit, dispatch }, payload) {
      commit("newCard");
      commit("changeId");
      commit("changeCardCreated");
      dispatch("getAge", payload);

      // commit("getAge", payload);
    },
    getAge({ state, commit }, payload) {
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
      payload.birthdate = payload.birthdate + " " + "Age: " + Age;

      if (state.cardCreated == false) {
        commit("fillCards", payload);
      } else {
        commit("fillNewCards", payload);
        state.cards.unshift(payload);
        commit("changeCardCreated");
      }
    }
  },

  getters: {
    cards: state => state.cards,
    today: state => state.newDate
  }
});
