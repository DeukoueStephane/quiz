<!-- Main view template -->
<template>
  <div id="app">
    <!-- first component Header from Header.vue-->
    <Header
      :correctAnswers="numberOfCorrectAnswers"
      :numberOfQuestion="numberOfQuestion"
    />
    <!-- end of first component -->

    <!-- second component The QuestionsBox from QuestionsBox.vue-->
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <!-- v-if: we wait first until the questions are ready before rendering
               and that is the case when question.length != 0.

               v-bind:currentQuestion: we use it as attribut to pass the current
               question to the QuestionsBox component and display it.

               v-bind:next: we use it as attribut to pass the increment
               method to the next button in QuestionsBox component. -->
          <QuestionsBox
            v-if="questions.length"
            :currentQuestion="questions[index]"
            :next="increment"
            :increment="go_to_the_next_question"
          />
        </b-col>
      </b-row>
    </b-container>
    <!-- end second component -->
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionsBox from './components/QuestionsBox.vue'

//here we start building our app
export default {
  name: 'app',
  components: {
    Header,
    QuestionsBox
  },
  data(){
    return {
      questions: [],
      index: 0,
      numberOfCorrectAnswers: 0,
      numberOfQuestion: 0
    }
  },
  methods:{
    increment() {
      this.index++
    },
    go_to_the_next_question(isCorrect){
      if(isCorrect){
        this.numberOfCorrectAnswers++;
      }
      this.numberOfQuestion++
    }
  },
  mounted: function () {
    //we use the metod fetch to get all the question from the API
    fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple', {
      method: 'get'
    }).then((response) => {//then save the server response as json file
      return response.json();
    }).then((jsonData) => {/*and then push the question array we defined in data with the data json data*/
      this.questions = jsonData.results
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
