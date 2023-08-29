<template>
  <main>
    <div class="cards-container">
    <div class="product-card">
    <h3 class="product-title">Mewtwo</h3>
    <img src="../../src/assets/images/mewtwo.png" alt="Product Image" class="product-image">
    <div class="product-description">Its DNA is almost the same as Mew’s. However, its size and disposition are vastly different.</div>
    <div class="product-price">500$</div>
  </div>
  </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  margin: auto;
  padding-top: 200px;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  flex-direction: column;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
}
.product-card {
  max-height: 500px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  border: 2px solid #cccccc;
  padding: 10px;
}

.product-image {
  object-fit: cover;
  margin-bottom: 10px;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  background-color: black;
  color: white;
  text-align: center;
}

.product-description {
  margin-bottom: 5px;
  font-size: 1rem;
  text-align: justify;
}

.product-price {
  font-size: 1.2rem;
  text-align: center;
}
</style>
