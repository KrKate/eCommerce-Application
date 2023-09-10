<template>
  <main>
    <AmBreadcrumbs :showCurrentCrumb="true" />
    <div class="kate-info">
      <div ref="kate" class="card">
        <div class="shadow"></div>
        <div class="image background"></div>
        <div class="image cutout"></div>
        <div class="content">
          <h3>Ekaterina Kiryanova</h3>
          <img id="photo" src="@/assets/images/d.webp" alt="kate" />
          <h4>Team-lead</h4>
          <p>Sociable, friendly and positive personality who knows how to work in a team, listen to the opinions of others and give constructive criticism.</p>
        </div>
      </div>
    </div>
    <div id="img-container">
      <img src="@/assets/images/r-team.png" alt="r-team" />
      <img id="rs-logo" src="https://rs.school/images/rs_school.svg" alt="r-team" />
    </div>
    <div class="kir-info">
      <div ref="kir" class="card">
        <div class="shadow"></div>
        <div class="image background"></div>
        <div class="image cutout"></div>
        <div class="content">
          <h3>Kirill Demyanenko</h3>
          <img id="photo" src="@/assets/images/e.webp" alt="kate" />
          <h4>Developer</h4>
          <p>Creative, intelligent and goal-oriented person who loves to solve complex problems using computer technology</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap');

main {
  display: flex;
  margin: auto;
  padding-top: 160px;
  font-size: 2rem;
  font-weight: 700;
  flex-wrap: wrap;
  font-style: italic;
  align-items: center;
  justify-content: space-evenly;
  font-family: 'Montserrat', sans-serif;

  nav {
    display: flex;
    font-size: 1rem;
    width: 100%;
    padding-left: 40px;
  }

  #img-container {
    position: relative;

    #rs-logo {
      position: absolute;
      height: 60px;
      border: 3px solid black;
      top: -25px;
      left: -80px;
      rotate: 65deg;
      background-color: white;
      padding: 10px;

      &:hover {
        scale: 1.2;
      }
    }
  }

  .kate-info,
  .kir-info {
    display: flex;
    width: 300px;

    .card {
      position: relative;
      height: 28rem;
      width: 20rem;
      aspect-ratio: 5/7;
      color: #140314;
      perspective: 50rem;
      transition: 1.5s;
      display: flex;
      justify-content: center;

      &::after,
      &::before {
        content: '';
        position: absolute;
        inset: 1.5rem;
        border: #e2c044 0.5rem solid;
        transform: rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0, 0, 2rem);
      }
      &::before {
        z-index: 4;
      }

      &:hover {
        background-color: #e2e1e1;
        transform: perspective(800px) translateY(-5%) rotateX(25deg) translateZ(0);
        box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
        .image {
          transform: translate3d(0%, 30%, 400px);
          scale: 0.9 0.9;
        }
      }

      &:active {
        transform: translateY(2%);
        box-shadow: 2px 10px 10px -5px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 2px 10px 10px -5px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 2px 10px 10px -5px rgba(0, 0, 0, 0.75);
        .product-image {
          transform: translate3d(0%, 0%, 0px);
          scale: none;
        }
      }

      .shadow {
        position: absolute;
        inset: 0;
        background: var(--url);
        background-size: cover;
        background-position: center;
        opacity: 0.8;
        filter: blur(2rem) saturate(0.9);
        box-shadow: 0 -1.5rem 2rem -0.5rem rgba(0, 0, 0, 0.7);
        transform: rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0, 2rem, -2rem);
      }

      .image {
        position: absolute;
        transition: 1s;
        inset: 0;
        background: linear-gradient(to top, rgba(248, 244, 244, 0.5), transparent 40%), var(--url);
        background-size: cover;
        background-position: center;

        &.background {
          transform: rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0, 0, 0rem);
        }
        &.cutout {
          transform: rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0, 0, 4rem)
            scale(0.92);
          z-index: 3;
        }
      }

      .content {
        position: absolute;
        display: flex;
        flex-direction: column;
        inset: 0;
        padding: 2rem;
        transform: rotateX(var(--rotateX)) rotateY(var(--rotateY)) translate3d(0, 0, 6rem);
        z-index: 4;

        h3 {
          display: flex;
          font-size: 1.3rem;
          margin: 0 auto;
          justify-content: center;
          font-weight: 700;
          padding: 5px 0;
        }

        h4 {
          display: flex;
          font-size: 1.1rem;
          margin: 0 auto;
          justify-content: center;
          font-weight: 700;
          font-style: italic;
          padding: 5px 0;
        }

        p {
          display: flex;
          font-size: 0.8rem;
          margin: 0 auto;
          padding: 0 10px;
          text-align: justify;
        }

        #photo {
          display: flex;
          max-width: 150px;
          margin: 0 auto;
        }
      }
    }


    .card.border-left-behind::before {
      border-left: transparent;
    }
    .card.border-right-behind::before {
      border-right: transparent;
    }
    .card.border-bottom-behind::before {
      border-bottom: transparent;
    }
  }
}
</style>
<script lang="ts">
export default {}
</script>
