<template>
  <section class="section">
    <p class="title center">Pick your topic!</p>
    <br>
    <div class="container">
      <div class="columns is-multiline">
        <div v-for="(topic, i) in topics" :key="i" class="column is-half">
          <article class="media notification " style="background-color: #003333">
            <div class="media-content center">
              <div class="content">
                <div @click="setTopicId(topic.id)" class="button is-large">
                  {{ topic.name }}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
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
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  background-color: #003333;
  font-weight: bold;
  color: white;
  opacity: 0.6;
  transition: opacity .55s ease-in-out;
  -moz-transition: opacity .55s ease-in-out;
  -webkit-transition: opacity .55s ease-in-out;
}

.button:hover {
  background-color: orange;
  opacity: 1.0;
  transition: opacity .55s ease-in-out;
  -moz-transition: opacity .55s ease-in-out;
  -webkit-transition: opacity .55s ease-in-out;
}

.title {
  margin-top: 2rem;
  color: #003333;
  padding: 1rem;
  font-size: 3rem;
  font-style: italic;
}

</style>
