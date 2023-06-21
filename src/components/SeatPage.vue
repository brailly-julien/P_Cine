<template>
  <div class="page-sieges">
    <h1>Choisissez votre siège</h1> 
    <div class="button-row">
    <button v-on:click="chooseSeat('11B')">11B</button>
    <button v-on:click="chooseSeat('13B')">13B</button>
    <button v-on:click="chooseSeat('15B')">15B</button>
    </div>
    <div class="button-row">
    <button v-on:click="chooseSeat('12C')">12C</button>
    <button v-on:click="chooseSeat('14C')">14C</button>
    <button v-on:click="chooseSeat('16C')">16C</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeatPage',
  
  methods: {
    chooseSeat(seat) {
      localStorage.setItem('chosenSeat', seat);
      this.$router.push('/pageacceuil');
    },
  }
}
</script>

<style src="../styles/SeatPage.css" lang="css"></style>
