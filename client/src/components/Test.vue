<template>
  <div>
    <v-layout v-if="isFinished === true" align-center justify-center>
      <v-flex class="resultContainer" xs12 sm8 md4>
        <v-card class="resultCard">
          <div id="result">
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="navigateTo('topics')"
              color="orange darken-3"
              flat>
              Return to topics
            </v-btn>
            <v-btn
              color="orange darken-3"
              flat>
              Review exam
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-stepper v-else v-model="step" non-linear>
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
  </div>
</template>

<script>
import Api from '@/services/Api';
import ExamService from '@/services/ExamService';
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
      answerIndex: 0,
      examId: 0,
      isFinished: false
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
          .push({
            answText: this.checkedAnswers[i].text,
            answerId: this.checkedAnswers[i].id,
            index: this.answerIndex
          });
      }
      const objectToSend = { examArray: this.arrayToSend, examId: this.examId };
      this.checkedAnswers = [];
      ExamService.continue(objectToSend)
        .then(response => {
          console.log(response);
        });
      index++;
      if (index === this.steps) {
        this.step = index;
      } else {
        this.step = index + 1;
      }
    },
    submit() {
      this.isFinished = true;
      let examScore = 'Results: <br>';
      let examValues = 0;
      const objectToSend = { examArray: this.arrayToSend, examId: this.examId };
      ExamService.submit(objectToSend)
        .then(response => {
          response.data.forEach((element, i) => {
            examScore += `Question ${i + 1}: ${String(element.result)} <br>`;
            examValues += element.result;
          });
          const finalResult = `Final result: ${examValues * 20} %`;
          document.getElementById('result').innerHTML = `${examScore} <br> ${finalResult}`;
        });
    }
  },
  created() {
    Api.get(`topic/${this.$store.state.topicId}`)
      .then(res => {
        this.quiz = res.data.test;
        this.examId = res.data.examId;
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
#result {
  margin: auto;
  margin-bottom: 3rem;
  text-align: center;
  font-size: 2rem;
}
.resultContainer {
  max-width:600px;
}
.resultCard {

}
</style>
