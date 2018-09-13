<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex
        v-for="(topic, i) in topics"
        :key="i"
        @click="setTopicId(topic.id)"
        class="card"
        xs2
        sm5
        md3>
        <v-card dark color="blue-grey darken-3">
          <v-card-text>{{ topic.name }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const topics = [{
  route: '/test',
  name: 'SQL',
  id: 3
}, {
  route: '/test',
  name: 'GIT',
  id: 1
}, {
  route: '/test',
  name: 'WEB',
  id: 4
}, {
  route: '/test',
  name: 'JS',
  id: 2
}];

export default {
  name: 'topics',
  data() {
    return {
      topics
    };
  },
  methods: {
    setTopicId(id) {
      // alert(id);
      this.$store.dispatch('setTopicId', id);
      this.$router.push('/test');
    }
  }
};
</script>

<style scoped>
.card:hover {
  cursor: pointer;
}
</style>
