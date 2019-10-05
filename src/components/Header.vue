<template>
  <div class="">
    <b-nav tabs>
      <b-nav-item disabled>Fancy Quiz App</b-nav-item>
      <b-nav-item disabled>Total: {{correctAnswers}} / {{numberOfQuestion}}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
  export default {
    props: ['correctAnswers','numberOfQuestion']
  }
</script>
