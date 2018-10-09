<template>
  <v-container grid-list-xl text-xs-center>
    <h1>Topic selection</h1>
    <v-divider class="my-4"></v-divider>
    <v-layout row wrap>
      <v-flex
        v-for="(topic, i) in topics"
        :key="i"
        @click="setTopicId(topic.id)"
        class="card"
        xs2
        sm5
        md3>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
            <v-img :src="topic.imgSrc" height="300px" contain>
            </v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ topic.name }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                @click="setTopicId(topic.id)"
                flat
                color="orange accent-3"
                large >
                Start
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const topics = [{
  route: '/test',
  name: 'SQL',
  imgSrc: 'https://cdn.macworld.co.uk/cmsdata/features/3638150/setup_learn_sql_mac_thumb800.jpg',
  id: 3
}, {
  route: '/test',
  name: 'GIT',
  imgSrc: 'https://student-engineer.net/wp-content/uploads/2018/05/icon_git.png',
  id: 1
}, {
  route: '/test',
  name: 'WEB',
  imgSrc: 'http://www.educoporti.es/wp-content/uploads/2013/10/wwwonline.jpg',
  id: 4
}, {
  route: '/test',
  name: 'JavaScript',
  imgSrc: 'https://searchlite.nl/wp-content/uploads/2016/08/JavaScript.png',
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
