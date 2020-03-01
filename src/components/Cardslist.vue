<template>
  <v-container>
    <v-card class="mx-auto" max-width="210" v-for="(card, n) in cards" :key="n">
      <v-card-text>
        <div>{{ card.id }}</div>
        <p class="display-1 text--primary">{{ card.first_name }} {{ card.last_name }}</p>

        <div class="text--primary">
          {{ card.email }}.
          <br />
          {{ card.gender }}
          <br />
          {{ card.birthdate }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Cardslist",
  data() {
    return {
      age: []
    };
  },

  methods: {},
  computed: {
    ...mapGetters(["cards"])
  },

  created() {
    this.$store.dispatch("getcards");
    this.$store.commit("newDay");
  }
};
</script>
<style scoped>
.v-application .mx-auto {
  margin-bottom: 10px;
}
</style>
