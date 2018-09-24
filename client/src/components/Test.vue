<template>
  <v-stepper non-linear>
    <v-stepper-header>
      <div
        v-for="(step, index) in steps"
        :key="index">
        <v-stepper-step
          :step="steps[index]"
          editable
          color="orange accent-3">
          Question {{ steps[index] }}
        </v-stepper-step>
      </div>
    </v-stepper-header>

    <v-stepper-items
      v-for="(question, index) in quiz"
      :key="index">
      <v-stepper-content :step="steps[index]">
        <v-card
          class="mb-5"
          color="blue-grey lighten-5"
          height="200px">
          <h2
            v-html="displayQuestion(question.text)"
            id="subtitle">
          </h2>
        </v-card>
        <div
          v-for="(answer, j) in question.answers"
          :key="j">
          <v-checkbox
            :label="answer.text"
            :value="answer.id"
            v-model="checkedAnswers"
            @click="sendIndex(answer)"
            color="orange darken-3">
          </v-checkbox>
        </div>
        <v-btn
          v-if="steps[index] !== 5"
          @click="next"
          color="orange accent-3">
          Continue
        </v-btn>
        <v-btn
          v-if="steps[index] === 5"
          @click="submit"
          color="green accent-3">
          Submit
        </v-btn>
        <v-btn
          @click="dialog = true"
          flat>
          Cancel
        </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="290">
          <v-card>
            <v-card-text>
              Are you sure you want to quit exam?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="dialog = false"
                color="orange darken-3"
                flat>
                No
              </v-btn>
              <v-btn
                @click="navigateTo('topics')"
                color="orange darken-3"
                flat>
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Api from '@/services/Api';
let quiz;
export default {
  name: 'test',
  data() {
    return {
      dialog: false,
      steps: [1, 2, 3, 4, 5],
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
    displayQuestion(question) {
      const str = '???';
      question = question.replace(str, '<v-chip> ____ </v-chip>');
      return question;
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    next() {
      this.steps[this.questionIndex] = this.index;
      this.questionIndex++;
      this.index = 0;
    },
    submit() {
      let response1 = 'Results: <br>';
      let response2 = 0;
      document.getElementById('columnId').style.display = 'none';
      document.getElementById('result').style.display = 'block';
      const uri = '/topic/submit';
      Api.post(uri, this.arrayToSend)
        .then(response => {
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
        console.log(res.data);
        this.quiz = res.data;
        this.quiz.forEach((element, i) => {
          this.arrayToSend.push({ questId: element.id, answers: [] });
        });
      });
  }
};
</script>
<style scoped>
h2 {
  font-weight: normal;
}
</style>
