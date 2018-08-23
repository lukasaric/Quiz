<template>
  <div class="hero-body">
    <div class="columns">
      <div id="result" class="column has-text-white " style="display: none">
      </div>
    </div>
    <div id="columnId" class="columns" >
      <div class="column has-text-white">
        <div v-for="(question, index) in quiz" :key="index">
          <div v-show="index === questionIndex">
            <h2 id="subtitle">{{ question.text }}</h2>
            <!-- Responses: display a li for each possible response with a checkbox button -->
            <ul>
              <li v-for="(answer, j) in question.answers" :key="j">
                <label>
                  <input :value="answer.id" v-model="checkedAnswers" @click="sendIndex(answer)" type="checkbox"> {{ answer.text }}
                </label>
              </li>
            </ul>
            <a v-if="questionIndex !== 4" @click="next" class="button is-pulled-right">
              Next
            </a>
            <a v-if="questionIndex === 4" @click="submit" class="button is-pulled-right">
              Submit
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api';
let quiz;
export default {
  name: 'test',
  data() {
    return {
      quiz,
      questionIndex: 0,
      questionStage: false,
      checkedAnswers: [],
      checkedAnswer: '',
      arrayToSend: [],
      index: 0
    };
  },
  methods: {
    next() {
      // console.log(this.arrayToSend);
      this.questionIndex++;
      this.index = 0;
    },
    submit() {
      // console.log(this.arrayToSend);
      let response1 = 'Results: <br>';
      let response2 = 0;
      document.getElementById('columnId').style.display = 'none';
      document.getElementById('result').style.display = 'block';
      const uri = '/topic/submit';
      // this.axios.post(uri, this.arrayToSend).then((response)
      Api.post(uri, this.arrayToSend).then(response => {
        response.data.forEach(element => {
          response1 += String(element.result) + '<br>';
          response2 += element.result;
        });
        document.getElementById('result').innerHTML = response1 + '<br>' + 'Final result: ' + (response2 * 20) + '%';
      });
    },
    sendIndex(answ) {
      this.arrayToSend[this.questionIndex].answers.push({ answerId: answ.id, index: this.index });
      this.index++;
    }
  },
  created() {
    Api.get(`topic/${this.$store.state.topicId}`)
      .then(res => {
        this.quiz = res.data;
        // console.log(this.quiz);
        this.quiz.forEach((element, i) => {
          this.arrayToSend.push({ questId: element.id, answers: [] });
        });
      });
  }
};
</script>
<style scoped>
  .hero-body {
  display: flex;
  align-items: center;
  justify-content: center;
  }

  .column {
    background-color: #003333;
    padding: 1rem 2rem 1rem;
  }

  .column h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  }

  .column li {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  }

  .button {
    margin-top: 1rem;
    margin-right: 0.5rem;
  }

  #result {
    border-radius: 15px;
    background-color:#003333;
    max-width: 480px;
    margin: auto;
    margin-top: 9rem;
    text-align: center;
    font-size: 2.25rem;
  }
</style>
