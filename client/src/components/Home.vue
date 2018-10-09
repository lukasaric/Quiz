<template>
  <section>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex class="logo-btn">
          <figure class="image center">
            <img src="../assets/devRhBlack.png">
          </figure>
          <v-divider class="my-4"></v-divider>
          <span class="subheading">
            devRhapsody is educational quiz application for web programming
            technologies and basic programming foundations. This application
            presents you four different topics where you can test your knowledge.
          </span>
          <v-divider class="my-4"></v-divider>
          <h2>Check out your knowledge!</h2>
          <v-btn
            @click="navigateTo()"
            class="mx-0"
            color="orange accent-3"
            large>
            Get started
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout column wrap class="my-5" align-center>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center justify-space-around>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large>fa fa-database</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <h2>SQL</h2>
                </v-card-title>
                <v-card-text>
                  SQL ( Structured Query Language) is a domain-specific language
                  used in programming and designed for managing data held in a
                  relational database management system (RDBMS), or for stream
                  processing in a relational data stream management system (RDSMS).
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large>fas fa-code-branch</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <h2>GIT</h2>
                </v-card-title>
                <v-card-text>
                  Git is a version-control system for tracking changes in computer
                  files and coordinating work on those files among multiple people.
                  It is primarily used for source-code management in software development,
                  but it can be used to keep track of changes in any set of files.
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center justify-space-around>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large>fa fa-globe</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <h2>WEB</h2>
                </v-card-title>
                <v-card-text>
                  The World Wide Web (WWW), also called the Web, is an information
                  space where documents and other web resources are identified by
                  Uniform Resource Locators (URLs), interlinked by hypertext
                  links, and accessible via the Internet.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large>fab fa-js-square</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <h2>JAVASCRIPT</h2>
                </v-card-title>
                <v-card-text>
                  JavaScript often abbreviated as JS, is a high-level, interpreted
                  programming language. It is a language which is also characterized
                  as dynamic, weakly typed, prototype-based and multi-paradigm.
                  Alongside HTML and CSS, JavaScript is one of the three core
                  technologies of the World Wide Web. JavaScript enables interactive
                  web pages and thus is an essential part of web applications.
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  methods: {
    navigateTo() {
      const isLogged = this.$store.getters.isAuthenticated;
      if (!isLogged) this.$router.push({ name: 'login' });
      else this.$router.push({ name: 'topics' });
    }
  }
};
</script>

<style scoped>
img {
  max-width: 400px;
  margin-top: 40px;
}
.v-btn {
  margin-top: 20px;
  font-weight: bold;
  color: black;
}
.v-icon {
  color: #00BFA5;
}
h2 {
  font-size: 25px;
}
</style>
