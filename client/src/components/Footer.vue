<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong class="has-text-white">devRhapsody</strong> by
        <strong class="has-text-white">Team Rozga</strong>
        <br>
        <i class="fa fa-copyright"></i>
        <small>Copyright. All rights reserved.</small>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
};
</script>

<style scoped>
.footer {
  background-color: #003333;
  padding: 1rem;
  margin-top: 4rem;
}

.footer p {
  color: white;
}

.footer p small {
  color: gray;
}

.fa {
  color: gray;
}
</style>
