<template>
  <v-card
    class="card mx-auto"
    color="blue-grey lighten-5">
    <v-data-table
      :headers="headers"
      :items="examList"
      hide-actions
      class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.finalScore }}%</td>
        <td class="text-xs-left">{{ props.item.category }}</td>
        <td>
          <v-btn
            @click="review()"
            color="orange darken-3"
            flat>
            Review
          </v-btn>
        </td>
        <td>
          <v-btn
            @click="rerun()"
            color="orange darken-3"
            flat>
            Rerun
          </v-btn>
        </td>
        <td>
          <v-btn
            @click="resume()"
            color="orange darken-3"
            flat>
            Resume
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <div class="hero-body">
      <div class="column is-three-quarters" style="margin-top=-20rem;">
        <h1>My favourite topics</h1>
        <div ref="chart" class="chart"></div>
        <h1>My success in each topic</h1>
        <div ref="secondChart" class="chart"></div>
      </div>
    </div>
  </v-card>
</template>

<script>
import AmCharts from 'amcharts3';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import Api from '@/services/Api';

export default {
  name: 'profile',
  data() {
    return {
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Score', value: 'score' },
        { text: 'Topic', value: 'topic' }
      ],
      categories: [
        { name: 'GIT', id: 1 },
        { name: 'JavaScript', id: 2 },
        { name: 'SQL', id: 3 },
        { name: 'WEB', id: 4 }
      ],
      examList: []
    };
  },
  created() {
    Api.get(`/profile/${this.$store.state.user.id}`)
      .then(res => {
        let flag = 0;
        this.examList = res.data;
        this.examList.forEach(test => {
          this.categories.forEach((el, i) => {
            if (this.categories[i].id === test.topic_fk) flag = i;
          });
          test = Object.assign(test, { category: this.categories[flag].name });
        });
        return this.examList;
      })
      .then(data => {
        this.chart = AmCharts.makeChart(this.$refs.chart, {
          type: 'pie',
          theme: 'light',
          dataProvider: this.examList,
          valueField: 'finalScore',
          titleField: 'category',
          balloon: { fixedPositon: true },
          startDuration: 1
        });
        this.chart = AmCharts.makeChart(this.$refs.secondChart, {
          type: 'serial',
          theme: 'light',
          dataProvider: this.examList,
          valueField: 'attempts',
          categoryField: 'category',
          graphs: [{
            lineColor: '#00BFA5',
            fillAlphas: 0.9,
            lineAlpha: 0.2,
            type: 'column',
            valueField: 'finalScore'
          }],
          balloon: { fixedPositon: true },
          startDuration: 1
        });
      });
  }
};
</script>

<style scoped>
.card {
  width: 80%;
  margin-bottom: 100px;
}
.chart {
  width: 100%;
  height: 400px;
  justify-content: center;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.column h1 {
  margin-top: 50px;
  font-size: 25px;
  display: flex;
  justify-content: center;
}

.chart /deep/ .amcharts-chart-div a{
  display: none !important;
}
.v-btn {
  font-weight: normal;
  text-transform: none !important;
}
</style>
