<template>
  <v-dialog max-width="600" ref="popUP">
    <template v-slot:activator="{ on }">
      <v-btn color="red lighten-2" dark v-on="on">Add new card</v-btn>
    </template>
    <Formulario />
  </v-dialog>
</template>
<script >
import Formulario from "../components/Formulario";
export default {
  name: "PopUp",
  components: {
    Formulario
  }
};
</script>