<template>
  <v-card>
    <v-card-title>
      <h4>Add a new card</h4>
    </v-card-title>
    <v-card-text>
      <v-form class="px-3" ref="form">
        <v-text-field label="Firts Name" v-model="formResults.first_name" :rules="nameRules"></v-text-field>
        <v-text-field label="Last Name" v-model="formResults.last_name" :rules="nameRules"></v-text-field>

        <v-text-field label="Email" v-model="formResults.email" :rules="emailRules"></v-text-field>
        <v-select
          :items="items"
          label="Gender"
          dense
          :rules="genderRules"
          v-model="formResults.gender"
        ></v-select>

        <v-menu
          ref="birthdate"
          v-model="birthdate"
          :close-on-content-click="false"
          :return-value.sync="formResults.birthdate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="formResults.birthdate"
              label="Birthdate"
              readonly
              v-on="on"
              :rules="birthdateRules"
            ></v-text-field>
          </template>
          <v-date-picker v-model="formResults.birthdate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="birthdate = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.birthdate.save(formResults.birthdate)">OK</v-btn>
          </v-date-picker>
        </v-menu>

        <v-btn class="succes mx-0 mt-3" @click="Submit">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Formulario",
  data() {
    return {
      birthdate: "",
      formResults: {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        birthdate: "",
        id: 1
      },
      items: ["Male", "Female"],
      nameRules: [v => (v && v.length >= 3) || "Minum length is 3 characters"],
      emailRules: [
        v =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      genderRules: [v => v.length > 0 || "An option must be selected"],
      birthdateRules: [v => (v && v.length >= 3) || "You need to choose a date"]
    };
  },

  methods: {
    Submit() {
      if (this.$refs.form.validate()) {
        console.log("new card added", this.formResults);
        this.$store.dispatch("addNewCard", this.formResults);
      }
    }
  },
  computed: {
    ...mapGetters(["today"])
  }
};
</script>

<style>
</style>