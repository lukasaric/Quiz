<template>
  <v-stepper v-model="step" non-linear>
    <v-stepper-header>
      <template v-for="n in steps">
        <v-stepper-step
          :complete="step > n"
          :key="`${n}-step`"
          :step="n"
          editable
          color="orange accent-3">
          Question {{ n }}
        </v-stepper-step>
        <v-divider v-if="n !== steps" :key="n"></v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items v-for="(question, index) in quiz" :key="index">
      <v-stepper-content :step="stepArray[index]">
        <v-card class="mb-5" color="blue-grey lighten-5" height="200px">
          <h2 v-html="displayQuestion(question.text)" id="subtitle"></h2>
        </v-card>
        <div
          v-for="(answer, j) in question.answers"
          :key="j">
          <v-checkbox
            :label="answer.text"
            :value="answer"
            v-model="checkedAnswers"
            color="orange darken-3">
          </v-checkbox>
        </div>
        <v-btn
          v-if="stepArray[index] !== 5"
          @click="next(index)"
          color="orange accent-3">
          Continue
        </v-btn>
        <v-btn
          v-if="stepArray[index] === 5"
          @click="submit"
          color="green accent-3">
          Submit
        </v-btn>
        <v-btn
          @click="dialog = true"
          flat>
          Cancel
        </v-btn>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-text>Are you sure you want to quit exam?</v-card-text>
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
import TestService from '@/services/TestService';
let quiz;
export default {
  name: 'test',
  data() {
    return {
      dialog: false,
      step: 1,
      steps: 5,
      stepArray: [1, 2, 3, 4, 5],
      quiz,
      questionIndex: 0,
      questionStage: false,
      checkedAnswers: [],
      arrayToSend: [],
      answerIndex: 0
    };
  },
  methods: {
    displayQuestion(question) {
      const str = '???';
      for (let i = 0; i < question.length; i++) {
        question = question.replace(str, `<v-chip> ___ </v-chip>`);
      }
      return question;
    },
    navigateTo(route) {
      this.arrayToSend = [];
      this.$router.push({ name: route });
    },
    next(index) {
      for (let i = 0; i < this.checkedAnswers.length; i++) {
        this.answerIndex = i;
        this.arrayToSend[index].answers
          .push({ answText: this.checkedAnswers[i].text, answerId: this.checkedAnswers[i].id, index: this.answerIndex });
      }
      this.checkedAnswers = [];
      TestService.continue(this.arrayToSend)
        .then(response => {

        });
      index++;
      if (index === this.steps) {
        this.step = index;
      } else {
        this.step = index + 1;
      }
    },
    submit() {
      let response1 = 'Results: <br>';
      let response2 = 0;
      document.getElementById('columnId').style.display = 'none';
      document.getElementById('result').style.display = 'block';
      TestService.submit(this.arrayToSend)
        .then(response => {
          response.data.forEach(element => {
            response1 += String(element.result) + '<br>';
            response2 += element.result;
          });
          document.getElementById('result').innerHTML = response1 + '<br>' + 'Final result: ' + (response2 * 20) + '%';
        });
    }
  },
  created() {
    Api.get(`topic/${this.$store.state.topicId}`)
      .then(res => {
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
