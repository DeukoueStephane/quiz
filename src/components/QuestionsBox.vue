<template>
  <div class="question-box-container">
    <b-jumbotron lead="Bootstrap v4 Components for Vue.js 2">
      <template v-slot:lead>
        {{currentQuestion.question}}
      </template>

      <hr class="my-4">

      <b-list-group>
        <b-list-group-item
          v-for="(answer, index) in shuffleAnswers"
          :key="index"
          @click="selected_answer(index)"
          :class="answerClass(index)"
          >
          {{answer}}
        </b-list-group-item>
      </b-list-group>


      <b-button
        variant="primary"
        v-on:click="submit_user_answer"
        :disabled="selected_index === null || answered"
        >
        Submit
      </b-button>
      <b-button @click="next" variant="success" href="#">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
  import _ from 'lodash'
  /* we have to use props here to be able to use the attributes currentQuestion
  and the method next because the are coming from other view. */
  export default {
    props: {
      currentQuestion: Object,
      next: Function,
      increment: Function
    },
    data(){
      return{
        selected_index: null,
        correctIndex: null,
        shuffleAnswers: [],
        answered: false
      }
    },
    computed: {//this helps us to create method which are use to update attributes instantly
      answers(){
        let answers = [...this.currentQuestion.incorrect_answers]
        answers.push(this.currentQuestion.correct_answer)
        return answers
      }
    },
    //we use this propertie to shuffle the answer array for every question
    // everytime currentQuestion got updated and we also we use immediate so that
    // it even works when currentQuestion got passed as props
    watch: {
      currentQuestion:{
        immediate: true,
        handler(){
          this.selected_index = null
          this.answered = false
          this.shuffle_answers()
        }
      }
    },
    methods: {
      //first we save the selected answer to the DOM as selected_index
      selected_answer(index){
        this.selected_index = index
      },
      submit_user_answer(){
        let isCorrect = false

        if(this.selected_index === this.correctIndex){
          isCorrect = true
        }
        this.answered = true
        this.increment(isCorrect)
      },
      shuffle_answers(){
        let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
        this.shuffleAnswers = _.shuffle(answers)
        this.correctIndex = this.shuffleAnswers.indexOf(this.currentQuestion.correct_answer)
      },
      answerClass(index){
        let answerClass = ''
        if(!this.answered && this.selected_index === index){
          answerClass = 'selected'
        }
        else if (this.answered && this.correctIndex ===  index) {
          answerClass = 'correct-answer'
        }
        else if (this.answered && this.selected_index === index && this.correctIndex !==  index) {
          answerClass = 'wrong-answer'
        }

        return answerClass
      }
    }/*,
    mounted(){
      this.shuffle_answers()
    }*/
  }
</script>

<style scoped>
  .list-group{
    margin-bottom: 20px;
  }
  .list-group-item {
    margin: 0 15px 0 15px;
    cursor: pointer;
  }
  .list-group-item:hover {
    background: #e9ecef;
  }
  .btn {
    margin: 0 20px 0 20px;
  }

  .selected{
    background: lightblue;
  }
  .correct-answer {
    background: lightgreen;
  }
  .wrong-answer {
    background: #E84C4C;
  }
</style>
