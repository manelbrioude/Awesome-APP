<template>
  <div class="home">
    <v-content>
      <h1 class="text-center">List Of Cards</h1>
      <div class="button">
        <PopUp />
      </div>
      <Cardslist />
    </v-content>
  </div>
</template>

<script>
import Cardslist from "../components/Cardslist";
import PopUp from "../components/PopUp";

export default {
  name: "Home",
  components: {
    Cardslist,
    PopUp
  },
  data() {
    return {};
  },
  created() {
    window.addEventListener("scroll", this.handleScroll());
  },
  methods: {
    Morecards() {
      this.$store.dispatch("getmorecards");
    },
    handleScroll() {
      const padding = 1;
      window.onscroll = () => {
        if (
          window.innerHeight + window.scrollY + padding >=
          document.body.offsetHeight
        ) {
          this.Morecards();
        }
      };
    }
  }
};
</script>
<style scoped>
</style>
