<template>
  <v-card
    class="card mx-auto"
    color="blue-grey lighten-5">
    <v-data-table
      :items="list"
      hide-actions
      class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">Score: {{ props.item.finalScore }}</td>
        <td class="text-xs-right">Topic: {{ props.item.category }}</td>
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
      list: [],
      tests: [{ category: 'git', attempts: 0, score: 0, color: '#66B2FF' },
        { category: 'javascript', attempts: 0, score: 0, color: '#F6F616' },
        { category: 'sql', attempts: 0, score: 0, color: '#04D76D' },
        { category: 'web', attempts: 0, score: 0, color: '#990000' }]
    };
  },
  created() {
    Api.get('/profile')
      .then(data => {
        this.list = data.data;
        this.list.forEach(test => {
          switch (test.topic_fk) {
            case 1:
              this.tests[0].attempts++;
              this.tests[0].score += test.finalScore;
              test.category = 'GIT';
              break;
            case 2:
              this.tests[1].attempts++;
              this.tests[1].score += test.finalScore;
              test.category = 'JS';
              break;
            case 3:
              this.tests[2].attempts++;
              this.tests[2].score += test.finalScore;
              test.category = 'SQL';
              break;
            case 4:
              this.tests[3].attempts++;
              this.tests[3].score += test.finalScore;
              test.category = 'WEB';
              break;
          }
        });
        this.tests.forEach(test => {
          if (test.attempts === 0) {
            test.score = 0;
          } else {
            test.score = test.score / test.attempts;
          }
        });
        return this.tests;
      })
      .then(data => {
        this.chart = AmCharts.makeChart(this.$refs.chart, {
          type: 'pie',
          theme: 'light',
          dataProvider: this.tests,
          valueField: 'attempts',
          titleField: 'category',
          balloon: { fixedPositon: true },
          startDuration: 1
        });
        this.chart = AmCharts.makeChart(this.$refs.secondChart, {
          type: 'serial',
          theme: 'light',
          dataProvider: this.tests,
          valueField: 'score',
          categoryField: 'category',
          graphs: [{
            fillColorsField: 'color',
            fillAlphas: 0.9,
            lineAlpha: 0.2,
            type: 'column',
            valueField: 'score'
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
</style>
