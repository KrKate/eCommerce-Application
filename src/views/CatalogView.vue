<template>
  <main>
    <h1>Choose your pokemon!</h1>
    <div class="setting-bar">
      <form class="search-form">
        <input
          ref="search"
          class="search-input"
          type="text"
          placeholder="Enter your search query"
          @input.prevent="debounce(sort)"
        />
        <select class="sort-options" @change.prevent="changeSorting" ref="sorting">
          <option value="" selected disabled>sort by...</option>
          <option value="asc">Name ASC</option>
          <option value="desc">Name DESC</option>
          <option value="prasc">Price ASC</option>
          <option value="prdesc">Price DESC</option>
        </select>
      </form>
      <button class="category-btn" @click="toggleSelect">Category</button>
      <div class="breadcrumbs">
        <button @click="clearFilters">All pokemons</button>
        <p>&DoubleLongRightArrow;</p>
        <select ref="selectedCategoryType" @change.prevent="changeParenCategory">
          <option value="" selected disabled>Type</option>
          <option v-for="cat in getParentCategory" :value="cat.id" :key="cat.id">
            {{ cat.name['en-US'] }}
          </option>
        </select>
        <p>&DoubleLongRightArrow;</p>
        <select @change.prevent="changeChildCategory" ref="selectedCategoryGen">
          <option value="" selected disabled>Generation</option>
          <option
            v-for="catChild in getChildCategory(parentCategories)"
            :value="catChild.id"
            :key="catChild.id"
          >
            {{ catChild.name['en-US'] }}
          </option>
        </select>
      </div>
    </div>
    <div class="select" :class="{ show: showSelect }">
      <fieldset>
        <legend>Select size:</legend>
        <div>
          <label
            >all<input checked name="drone" @change.prevent="sort" type="radio" value="" ref="all"
          /></label>
        </div>
        <div>
          <label
            >small<input name="drone" @change.prevent="sort" type="radio" value="small" ref="small"
          /></label>
        </div>
        <div>
          <label
            >big<input name="drone" @change.prevent="sort" type="radio" value="small" ref="big"
          /></label>
        </div>
        <div>
          <label
            >middle<input
              name="drone"
              @change.prevent="sort"
              type="radio"
              value="small"
              ref="middle"
          /></label>
        </div>
      </fieldset>
      <div class="price-range">
        <span class="leftRange">{{ minPrice }}</span>
        <input
          id="minRange"
          type="range"
          min="0"
          max="1200"
          step="10"
          @change="sort"
          @input="changeRangeValue($event)"
          :value="minPrice"
        />
        <input
          id="maxRange"
          type="range"
          min="0"
          max="1200"
          step="10"
          @change="sort"
          @input="changeRangeValue($event)"
          :value="maxPrice"
        />
        <span class="rightRange">{{ maxPrice }}</span>
      </div>
      <label>Categories</label>
      <div class="item" v-for="item in getParentCategory" :key="item.id">
        <input
          type="checkbox"
          @change="checkCategory($event)"
          :id="item.id"
          :value="item.name['en-US']"
        />
        <label :for="item.externalId">{{ item.name['en-US'] }}</label>
        <ul>
          <li v-for="sub in getChildCategory(item.id)" :key="sub.id">
            <input
              type="checkbox"
              @change="checkCategory($event)"
              :id="sub.id"
              :value="sub.name['en-US']"
            />
            <label :for="sub.externalId">{{ sub.name['en-US'] }}</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="cards-container">
      <div class="product-card" v-for="cart in filteredProducts" :key="cart.id">
        <h3 class="product-title">{{ cart.name['en-US'] }}</h3>
        <img :src="getImageUrl(cart)" alt="Product Image" class="product-image" />
        <div class="prices">
          <div class="product-price" :class="{ 'crossed-out': getDiscount(cart) !== ' ' }">
            {{ getPriceValue(cart) }}
          </div>
          <div class="product-discount">{{ getDiscount(cart) }}</div>
        </div>
        <RouterLink class="info-button" :to="{ name: 'product', params: { id: cart.id } }"
          >More info</RouterLink
        >
      </div>
      <div class="pagination-box">
        <p class="title">{{ response.total }} products found</p>
        <div class="pagination-buttons">
          <button :disabled="currentPage === 0" @click="previousPage">previous</button>
          Page <span>{{ currentPage + 1 }}</span> of
          <span>{{ Math.ceil(response.total / response.limit) }}</span
          ><button
            @click="nextPage"
            :disabled="currentPage >= Math.ceil(response.total / response.limit) - 1"
          >
            next
          </button>
          Show products on page
          <input
            ref="limit"
            @change.prevent="changeLimit"
            type="number"
            min="1"
            max="100"
            :value="limit"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/authorization'
import type { Category, ProductProjections, ProductResponse } from '@/stores/types'
import type HTMLSelectElement from 'happy-dom/lib/nodes/html-select-element/HTMLSelectElement'

export default {
  data() {
    return {
      store: useUserStore(),
      products: [] as ProductProjections[],
      currentPage: 0,
      offset: 0,
      limit: 30,
      parentCategories: '',
      categories: [] as Category[],
      response: {} as ProductResponse,
      filteredProducts: [] as ProductProjections[],
      filteredCategory: [] as string[],
      timerID: -1,
      showSelect: false,
      minPrice: 0,
      maxPrice: 1200
    }
  },
  async mounted() {
    this.store.isLoading = true
    if (!this.store.token) {
      await this.store.readCookie()
    }
    this.response = await this.store.getSortedProducts(this.limit.toString())
    this.products = this.response.results as ProductProjections[]
    this.filteredProducts = [...this.products]
    this.categories = await this.store.getCategories()
    Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve
            })
        )
    ).then(() => {
      this.store.isLoading = false
    })
  },
  methods: {
    getChildCategory(id: string) {
      return this.categories
        .filter((value) => value.ancestors.length > 0)
        .filter((value) => value.ancestors[0].id === id)
    },
    changeParenCategory() {
      this.parentCategories = (this.$refs.selectedCategoryType as HTMLSelectElement).value
      this.filteredCategory = [this.parentCategories]
      this.sort()
    },
    changeChildCategory() {
      this.filteredCategory = [(this.$refs.selectedCategoryGen as HTMLSelectElement).value]
      this.sort()
    },
    checkCategory(ev: Event) {
      const target = ev.target as HTMLInputElement
      if (target.checked) {
        this.filteredCategory.push(target.id)
      } else {
        this.filteredCategory = this.filteredCategory.filter((value) => value !== target.id)
      }
      this.sort()
    },
    changeRangeValue(ev: Event) {
      const target = ev.target as HTMLInputElement
      const val = parseInt(target.value, 10)
      if (target.id === 'minRange') {
        if (val < this.maxPrice) this.minPrice = val
      } else {
        if (val > this.minPrice) this.maxPrice = val
      }
    },
    clearFilters() {
      ;(this.$refs.selectedCategoryType as HTMLSelectElement).value = ''
      ;(this.$refs.selectedCategoryGen as HTMLSelectElement).value = ''
      ;(this.$refs.all as HTMLInputElement).checked = true
      this.minPrice = 0
      this.maxPrice = 1200
      this.filteredCategory = []
      this.sort()
    },
    getImageUrl(cart: ProductProjections) {
      if (cart.masterVariant.images.length > 0) {
        return cart.masterVariant.images[0].url
      } else {
        return '#'
      }
    },
    previousPage() {
      this.currentPage = this.currentPage - 1
      this.sort()
    },
    changeSorting() {
      this.currentPage = 0
      this.offset = 0
      this.sort()
    },
    nextPage() {
      this.currentPage = this.currentPage + 1
      this.sort()
    },
    changeLimit() {
      this.currentPage = 0
      this.offset = 0
      this.limit = parseInt((this.$refs.limit as HTMLInputElement).value, 10)
      this.sort()
    },
    async sort() {
      this.store.isLoading = true
      let cat = ``
      let sort = ``
      let search = ``
      if (this.filteredCategory.length) {
        this.filteredCategory.forEach((value) => {
          cat += `"${value}",`
        })
        cat = `&filter.query=categories.id: ${cat.slice(0, -1)}`
      }
      if ((this.$refs.small as HTMLInputElement).checked)
        cat += `&filter.query=variants.attributes.Size:"small"`
      if ((this.$refs.big as HTMLInputElement).checked)
        cat += `&filter.query=variants.attributes.Size:"big"`
      if ((this.$refs.middle as HTMLInputElement).checked)
        cat += `&filter.query=variants.attributes.Size:"middle"`
      if ((this.$refs.search as HTMLInputElement).value) {
        search = `&text.en-us="${(this.$refs.search as HTMLInputElement).value}"&fuzzy=true`
      }
      cat += `&filter=variants.price.centAmount:range (${this.minPrice * 100} to ${
        this.maxPrice * 100
      })`
      if ((this.$refs.sorting as HTMLSelectElement).value) {
        if ((this.$refs.sorting as HTMLSelectElement).value.includes('pr')) {
          sort = `&sort=price ${(this.$refs.sorting as HTMLSelectElement).value.replace('pr', '')}`
        } else {
          sort = `&sort=name.en-us ${(this.$refs.sorting as HTMLSelectElement).value}`
        }
      }
      this.response = await this.store.getSortedProducts(
        this.limit.toString(),
        (this.limit * this.currentPage).toString(),
        `${sort}${cat}${search}`
      )
      this.products = this.response.results as ProductProjections[]
      this.filteredProducts = this.products
      this.store.isLoading = false
    },
    getPriceValue(cart: ProductProjections) {
      if (cart.masterVariant.prices.length > 0) {
        const price = parseInt(cart.masterVariant.prices[0].value.centAmount / 100, 10)
        return `€ ${price}`
      } else {
        return 'free'
      }
    },
    getDiscount(cart: ProductProjections) {
      const discounted = cart?.masterVariant?.prices[0]?.discounted?.value?.centAmount
      return discounted ? `€ ${discounted / 100}` : ' '
    },
    toggleSelect() {
      this.showSelect = !this.showSelect
    },
    debounce(func: Function) {
      clearTimeout(this.timerID)
      this.timerID = setTimeout(() => func(), 500)
    }
  },
  computed: {
    getParentCategory() {
      return this.categories.filter((value) => value.ancestors.length === 0)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';

h1 {
  @include pokemon-text($app-yellow, $app-dark-blue);
  margin: 0 auto;
  font-size: 3rem;
  @media screen and (max-width: 760px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 560px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 390px) {
    font-size: 1.5rem;
  }
}

main {
  display: flex;
  margin: auto;
  padding-top: 200px;
  font-size: 2rem;
  font-weight: 700;
  font-style: italic;
  flex-direction: column;
  overflow-x: hidden;
  .slider-target,
  .slider-target * {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    touch-action: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .slider-target {
    position: relative;
  }
  .slider-base,
  .slider-connects {
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 1;
  }
  .slider-connects {
    overflow: hidden;
    z-index: 0;
  }
  .slider-connect,
  .slider-origin {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    -ms-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform-style: preserve-3d;
    transform-style: flat;
    width: 100%;
    will-change: transform;
    z-index: 1;
  }
  .slider-txt-dir-rtl.slider-horizontal .slider-origin {
    left: 0;
    right: auto;
  }
  .slider-vertical .slider-origin {
    top: -100%;
    width: 0;
  }
  .slider-horizontal .slider-origin {
    height: 0;
  }
  .slider-handle {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
  }
  .slider-touch-area {
    height: 100%;
    width: 100%;
  }
  .slider-state-tap .slider-connect,
  .slider-state-tap .slider-origin {
    transition: transform 0.3s;
  }
  .slider-state-drag * {
    cursor: inherit !important;
  }
  .slider-tooltip-drag .slider-tooltip,
  .slider-tooltip-focus .slider-tooltip {
    display: none !important;
  }
  .slider-tooltip-drag .slider-active .slider-tooltip,
  .slider-tooltip-drag.slider-state-drag .slider-tooltip:not(.slider-tooltip-hidden),
  .slider-tooltip-focus.slider-focused .slider-tooltip:not(.slider-tooltip-hidden) {
    display: block !important;
  }
  .slider-horizontal {
    height: var(--slider-height, 6px);
  }
  .slider-horizontal .slider-handle {
    height: var(--slider-handle-height, 16px);
    right: calc(var(--slider-handle-width, 16px) / 2 * -1);
    top: calc((var(--slider-handle-height, 16px) - var(--slider-height, 6px)) / 2 * -1 + -1px);
    width: var(--slider-handle-width, 16px);
  }
  .slider-vertical {
    height: var(--slider-vertical-height, 300px);
    width: var(--slider-height, 6px);
  }
  .slider-vertical .slider-handle {
    bottom: calc(var(--slider-handle-width, 16px) / 2 * -1);
    height: var(--slider-handle-width, 16px);
    right: calc((var(--slider-handle-height, 16px) - var(--slider-height, 6px)) / 2 * -1 + -1px);
    width: var(--slider-handle-height, 16px);
  }
  .slider-txt-dir-rtl.slider-horizontal .slider-handle {
    left: calc(var(--slider-handle-width, 16px) / 2 * -1);
    right: auto;
  }
  .slider-base {
    background-color: var(--slider-bg, #d1d5db);
  }
  .slider-base,
  .slider-connects {
    border-radius: var(--slider-radius, 9999px);
  }
  .slider-connect {
    background: var(--slider-connect-bg, #10b981);
    cursor: pointer;
  }
  .slider-draggable {
    cursor: ew-resize;
  }
  .slider-vertical .slider-draggable {
    cursor: ns-resize;
  }
  .slider-handle {
    background: var(--slider-handle-bg, #fff);
    border: var(--slider-handle-border, 0);
    border-radius: var(--slider-handle-radius, 9999px);
    box-shadow: var(--slider-handle-shadow, 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32));
    cursor: -webkit-grab;
    cursor: grab;
    height: var(--slider-handle-height, 16px);
    width: var(--slider-handle-width, 16px);
  }
  .slider-handle:focus {
    box-shadow:
      0 0 0 var(--slider-handle-ring-width, 3px)
        var(--slider-handle-ring-color, rgba(16, 185, 129, 0.188)),
      var(--slider-handle-shadow, 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32));
    outline: none;
  }
  .slider-active {
    box-shadow: var(--slider-handle-shadow-active, 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.42));
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  [disabled] .slider-connect {
    background: var(--slider-connect-bg-disabled, #9ca3af);
  }
  [disabled] .slider-handle,
  [disabled].slider-handle,
  [disabled].slider-target {
    cursor: not-allowed;
  }
  [disabled] .slider-tooltip {
    background: var(--slider-tooltip-bg-disabled, #9ca3af);
    border-color: var(--slider-tooltip-bg-disabled, #9ca3af);
  }
  .slider-tooltip {
    background: var(--slider-tooltip-bg, #10b981);
    border: 1px solid var(--slider-tooltip-bg, #10b981);
    border-radius: var(--slider-tooltip-radius, 5px);
    color: var(--slider-tooltip-color, #fff);
    display: block;
    font-size: var(--slider-tooltip-font-size, 0.875rem);
    font-weight: var(--slider-tooltip-font-weight, 600);
    line-height: var(--slider-tooltip-line-height, 1.25rem);
    min-width: var(--slider-tooltip-min-width, 20px);
    padding: var(--slider-tooltip-py, 2px) var(--slider-tooltip-px, 6px);
    position: absolute;
    text-align: center;
    white-space: nowrap;
  }
  .slider-horizontal .slider-tooltip-top {
    bottom: calc(
      var(--slider-handle-height, 16px) + var(--slider-tooltip-arrow-size, 5px) +
        var(--slider-tooltip-distance, 3px)
    );
    left: 50%;
    transform: translate(-50%);
  }
  .slider-horizontal .slider-tooltip-top:before {
    border: var(--slider-tooltip-arrow-size, 5px) solid transparent;
    border-top-color: inherit;
    bottom: calc(var(--slider-tooltip-arrow-size, 5px) * -2);
    content: '';
    height: 0;
    left: 50%;
    position: absolute;
    transform: translate(-50%);
    width: 0;
  }
  .slider-horizontal .slider-tooltip-bottom {
    left: 50%;
    top: calc(
      var(--slider-handle-height, 16px) + var(--slider-tooltip-arrow-size, 5px) +
        var(--slider-tooltip-distance, 3px)
    );
    transform: translate(-50%);
  }
  .slider-horizontal .slider-tooltip-bottom:before {
    border: var(--slider-tooltip-arrow-size, 5px) solid transparent;
    border-bottom-color: inherit;
    content: '';
    height: 0;
    left: 50%;
    position: absolute;
    top: calc(var(--slider-tooltip-arrow-size, 5px) * -2);
    transform: translate(-50%);
    width: 0;
  }
  .slider-vertical .slider-tooltip-left {
    right: calc(
      var(--slider-handle-height, 16px) + var(--slider-tooltip-arrow-size, 5px) +
        var(--slider-tooltip-distance, 3px)
    );
    top: 50%;
    transform: translateY(-50%);
  }
  .slider-vertical .slider-tooltip-left:before {
    border: var(--slider-tooltip-arrow-size, 5px) solid transparent;
    border-left-color: inherit;
    content: '';
    height: 0;
    position: absolute;
    right: calc(var(--slider-tooltip-arrow-size, 5px) * -2);
    top: 50%;
    transform: translateY(-50%);
    width: 0;
  }
  .slider-vertical .slider-tooltip-right {
    left: calc(
      var(--slider-handle-height, 16px) + var(--slider-tooltip-arrow-size, 5px) +
        var(--slider-tooltip-distance, 3px)
    );
    top: 50%;
    transform: translateY(-50%);
  }
  .slider-vertical .slider-tooltip-right:before {
    border: var(--slider-tooltip-arrow-size, 5px) solid transparent;
    border-right-color: inherit;
    content: '';
    height: 0;
    left: calc(var(--slider-tooltip-arrow-size, 5px) * -2);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
  }
  .slider-horizontal .slider-origin > .slider-tooltip {
    left: auto;
    transform: translate(50%);
  }
  .slider-horizontal .slider-origin > .slider-tooltip-top {
    bottom: calc(
      var(--slider-tooltip-arrow-size, 5px) +
        (var(--slider-handle-height, 16px) - var(--slider-height, 6px)) / 2 +
        var(--slider-tooltip-distance, 3px) + 1px
    );
  }
  .slider-horizontal .slider-origin > .slider-tooltip-bottom {
    top: calc(
      var(--slider-tooltip-arrow-size, 5px) +
        (var(--slider-handle-height, 16px) - var(--slider-height, 6px)) / 2 +
        var(--slider-tooltip-distance, 3px) + var(--slider-height, 6px) - 1px
    );
  }
  .slider-vertical .slider-origin > .slider-tooltip {
    top: auto;
    transform: translateY(
      calc((var(--slider-tooltip-line-height, 1.25rem) - var(--slider-tooltip-py, 2px)) * -1 + 1px)
    );
  }
  .slider-vertical .slider-origin > .slider-tooltip-left {
    right: calc(
      var(--slider-tooltip-arrow-size, 5px) + var(--slider-height, 6px) +
        (var(--slider-handle-height, 16px) - var(--slider-height, 6px)) / 2 +
        var(--slider-tooltip-distance, 3px) - 1px
    );
  }
  .slider-vertical .slider-origin > .slider-tooltip-right {
    left: calc(
      var(--slider-tooltip-arrow-size, 5px) + var(--slider-height, 6px) +
        (var(--slider-handle-height, 16px) - var(--slider-height, 6px)) / 2 +
        var(--slider-tooltip-distance, 3px) - var(--slider-height, 6px) + 1px
    );
  }
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: 50px 20px 20px 20px;
  gap: 50px;
  align-content: center;
  align-items: center;
  justify-content: center;

  .pagination-box {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 0.8rem;
    }

    .pagination-buttons {
      display: flex;
      flex-direction: row;
      font-size: 0.6rem;
      gap: 5px;
      align-items: center;

      button {
        border-radius: 7px;
        max-width: 100px;
        padding: 5px 10px;
        border: none;
        outline: none;
      }

      input {
        max-width: 40px;
        border: none;
        text-align: center;
      }
    }
  }
}

.product-card {
  max-height: 500px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  border: 2px solid #cccccc;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.3s linear;
  &:hover {
    background-color: #e2e1e1;
    transform: perspective(800px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
    .product-image {
      transform: translate3d(0%, -15%, 500px);
      scale: 1.3 1.6;
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
}

.product-image {
  object-fit: cover;
  padding: 10px;
  transition: all 0.3s linear;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 10px;
}
.prices {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.product-price {
  font-size: 1.2rem;
}

.product-discount {
  font-size: 1.2rem;
  color: $app-red;
  font-weight: 700;
}

.crossed-out {
  position: relative;
}

.crossed-out::before,
.crossed-out::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1.5px;
  background-color: $app-red;
}

.crossed-out::before {
  transform: rotate(-35deg);
}
.crossed-out::after {
  transform: rotate(35deg);
}

.info-button {
  height: 30px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  margin-top: auto;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-decoration: none;
}

.info-button:before {
  content: '';
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.info-button:active {
  color: #000;
}

.info-button:active:after {
  background: transparent;
}

.info-button:hover:before {
  opacity: 1;
}

.info-button:after {
  z-index: -1;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #0075be;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.search-form {
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #cccccc;
  width: 50%;
  margin: 15px 10px 0 0;
}

.search-button {
  border-radius: 0 7px 7px 0;
  color: black;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}
.search-input,
.sort-options {
  border-radius: 7px;
  width: 50%;
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.sort-options {
  max-width: 100px;
  border: 1px solid gray;
}

.setting-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 10px;

  .breadcrumbs {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;

    button,
    select {
      background: transparent;
      border: none;
      color: $app-dark-blue;
      font-size: 0.8rem;

      &:hover {
        scale: 1.2;
      }
    }

    p {
      margin: 0 20px;
    }
  }
}

.select {
  display: none;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  border: 2px solid #cccccc;
  border-radius: 10px;
  padding: 15px;
  font-size: 1rem;
  position: absolute;
  right: 2%;
  top: 340px;
  z-index: 10;
  background-color: #fbfafa;

  ul {
    list-style: none;
  }

  label {
    margin-bottom: 10px;
    font-weight: 700;
  }

  .item {
    label {
      font-weight: 400;
    }
  }

  fieldset {
    margin-bottom: 20px;

    legend {
      font-weight: 700;
    }
    label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      font-weight: 400;
    }
  }

  .price-range {
    display: flex;
    position: relative;
    min-height: 20px;
    justify-content: center;
    align-items: center;

    .leftRange {
      display: flex;
      position: absolute;
      left: 0;
    }

    .rightRange {
      display: flex;
      position: absolute;
      right: 0;
    }

    input {
      position: absolute;
      display: flex;
      width: 70%;
      height: 1px;
      pointer-events: none;
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      pointer-events: all;
      width: 5px;
      height: 5px;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0 0 0 1px #c6c6c6;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 760px) {
    top: 280px;
  }
  @media screen and (max-width: 710px) {
    top: 330px;
    right: 12%;
  }
  @media screen and (max-width: 560px) {
    top: 320px;
    right: 9.5%;
  }
  @media screen and (max-width: 470px) {
    top: 320px;
    right: 8%;
  }
  @media screen and (max-width: 450px) {
    top: 320px;
    right: 7%;
  }
  @media screen and (max-width: 344px) {
    top: 365px;
    right: 13%;
  }
}

.show {
  display: flex;
}
.category-btn {
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #cccccc;
  margin-top: 15px;
}

label {
  margin-left: 10px;
}
</style>
