<template>
  <v-app>
    <Navbar />

    <v-content>
      <!-- <HelloWorld /> -->
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>
