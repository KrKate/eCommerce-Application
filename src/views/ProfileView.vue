<template>
  <main>
    <div id="pokedex">
      <div id="left">
        <div id="logo"></div>
        <div id="bg_curve1_left"></div>
        <div id="bg_curve2_left"></div>
        <div id="curve1_left">
          <div id="buttonGlass">
            <div id="reflect"></div>
          </div>
          <div id="miniButtonGlass1"></div>
          <div id="miniButtonGlass2"></div>
          <div id="miniButtonGlass3"></div>
        </div>
        <div id="curve2_left">
          <div id="junction">
            <div id="junction1"></div>
            <div id="junction2"></div>
          </div>
        </div>
        <div id="screen">
          <div id="topPicture">
            <div id="buttontopPicture1"></div>
            <div id="buttontopPicture2"></div>
          </div>
          <div id="picture">
            <label>
              Salutation
              <select
                class="user-main-info"
                :class="isInfoMode ? '' : 'edit-mode'"
                :disabled="isInfoMode"
              >
                <option
                  v-for="item in salutation"
                  v-bind:value="item"
                  v-bind:key="item"
                  :selected="item.toString() === userInfo.salutation"
                >
                  {{ item }}
                </option>
              </select>
            </label>
            <label v-for="[item, value] in leftFields" v-bind:key="item">
              {{ value }}
              <input
                class="user-main-info"
                :class="isInfoMode ? '' : 'edit-mode'"
                :value="userInfo[item]"
                :disabled="isInfoMode"
              />
            </label>
          </div>
          <div id="buttonbottomPicture"></div>
          <div id="speakers">
            <div class="sp"></div>
            <div class="sp"></div>
            <div class="sp"></div>
            <div class="sp"></div>
          </div>
        </div>
        <div
          id="bigbluebutton"
          :class="isInfoMode ? '' : 'clicked'"
          @click="isInfoMode = !isInfoMode"
        >
          {{ isInfoMode ? `EDIT\nOFF` : `EDIT\nON` }}
        </div>
        <div id="barbutton1"></div>
        <div id="barbutton2"></div>
        <div id="cross">
          <div id="leftcross">
            <div id="leftT"></div>
          </div>
          <div id="topcross">
            <div id="upT"></div>
          </div>
          <div id="rightcross">
            <div id="rightT"></div>
          </div>
          <div id="midcross">
            <div id="midCircle"></div>
          </div>
          <div id="botcross">
            <div id="downT"></div>
          </div>
        </div>
      </div>
      <div id="right">
        <div id="stats">
          <div class="shipping-address" v-if="isShowShippingAdresses">
            <div v-for="addressShip in userInfo.shippingAddressIds" :key="addressShip">
              <hr />
              <p v-if="addressShip === userInfo.defaultShippingAddressId">
                This is your default shipping address
              </p>
              <p>Contact details</p>
              <label>
                Salutation
                <select
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :disabled="isInfoMode"
                >
                  <option
                    v-for="item in salutation"
                    v-bind:value="item"
                    v-bind:key="item"
                    :selected="
                      item ===
                      userInfo.addresses.find((value) => value.id === addressShip).salutation
                    "
                  >
                    {{ item }}
                  </option>
                </select>
              </label>
              <label v-for="[item, value] in contactDetails" v-bind:key="item">
                {{ value }}
                <input
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :value="userInfo.addresses.find((value) => value.id === addressShip)[item]"
                  :disabled="isInfoMode"
                />
              </label>
              <p>Address details</p>
              <label>
                Country
                <select
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :disabled="isInfoMode"
                >
                  <option
                    v-for="item in countries"
                    v-bind:value="item"
                    v-bind:key="item"
                    :selected="
                      item ===
                      countries[
                        countryCodes[
                          userInfo.addresses.find((value) => value.id === addressShip).country
                        ]
                      ]
                    "
                  >
                    {{ item }}
                  </option>
                </select>
              </label>
              <label v-for="[item, value] in addressDetails" v-bind:key="item">
                {{ value }}
                <input
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :value="userInfo.addresses.find((value) => value.id === addressShip)[item]"
                  :disabled="isInfoMode"
                />
              </label>
            </div>
          </div>
          <div class="billing-address" v-if="!isShowShippingAdresses">
            <div v-for="addressBil in userInfo.billingAddressIds" :key="addressBil">
              <hr />
              <p v-if="addressBil === userInfo.defaultBillingAddressId">
                This is your default billing address
              </p>
              <p>Contact details</p>
              <label>
                Salutation
                <select
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :disabled="isInfoMode"
                >
                  <option
                    v-for="item in salutation"
                    v-bind:value="item"
                    v-bind:key="item"
                    :selected="
                      item ===
                      userInfo.addresses.find((value) => value.id === addressBil).salutation
                    "
                  >
                    {{ item }}
                  </option>
                </select>
              </label>
              <label v-for="[item, value] in contactDetails" v-bind:key="item">
                {{ value }}
                <input
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :value="userInfo.addresses.find((value) => value.id === addressBil)[item]"
                  :disabled="isInfoMode"
                />
              </label>
              <p>Address details</p>
              <label>
                Country
                <select
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :disabled="isInfoMode"
                >
                  <option
                    v-for="item in countries"
                    v-bind:value="item"
                    v-bind:key="item"
                    :selected="
                      item ===
                      countries[
                        countryCodes[
                          userInfo.addresses.find((value) => value.id === addressBil).country
                        ]
                      ]
                    "
                  >
                    {{ item }}
                  </option>
                </select>
              </label>
              <label v-for="[item, value] in addressDetails" v-bind:key="item">
                {{ value }}
                <input
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :value="userInfo.addresses.find((value) => value.id === addressBil)[item]"
                  :disabled="isInfoMode"
                />
              </label>
            </div>
          </div>
        </div>
        <div id="miniButtonGlass4"></div>
        <div id="miniButtonGlass5"></div>
        <div id="barbutton3"></div>
        <div id="barbutton4"></div>
        <div
          id="yellowBox1"
          @click="isShowShippingAdresses = false"
          :class="isShowShippingAdresses ? '' : 'clickedYB'"
        >
          Billing address
        </div>
        <div
          id="yellowBox2"
          @click="isShowShippingAdresses = true"
          :class="!isShowShippingAdresses ? '' : 'clickedYB'"
        >
          Shipping address
        </div>
        <div id="bg_curve1_right"></div>
        <div id="bg_curve2_right"></div>
        <div id="curve1_right"></div>
        <div id="curve2_right"></div>
      </div>
    </div>
  </main>
</template>

<script>
import { useUserStore } from '@/stores/authorization'
import {
  addressDetails,
  contactDetails,
  Countries,
  CountryCodes,
  Salutations,
  userProfileLeftSideFields
} from '@/global/constatnts'
export default {
  name: 'ProfileView',
  data() {
    return {
      store: useUserStore(),
      userInfo: {},
      isInfoMode: true,
      salutation: Salutations,
      countries: Countries,
      countryCodes: CountryCodes,
      leftFields: userProfileLeftSideFields,
      contactDetails: contactDetails,
      addressDetails: addressDetails,
      isShowShippingAdresses: true
    }
  },
  async beforeMount() {
    this.store.isLoading = true
    this.userInfo = await this.store.getMyCustomerDetails()
    console.log(this.userInfo)
    this.store.isLoading = false
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';
@import url('https://fonts.googleapis.com/css2?family=Orbitron&display=swap');
* {
  margin: 0;
  padding: 0;
}
main {
  padding-top: 160px;
}

@media all {
  div#pokedex {
    width: 750px;
    margin: 50px auto 0 auto;
  }

  div#left {
    width: 400px;
    height: 500px;
    float: left;
    position: relative;
    z-index: 1;
  }

  div#right {
    width: 350px;
    height: 500px;
    float: left;
    position: relative;
  }

  /* //// LEFT PART //// */

  div#curve1_left {
    width: 201px;
    height: 85px;
    background-color: #8b0000;
    float: left;
    padding: 15px 0 0 15px;

    position: absolute;
    top: 0;
    left: 0;

    box-shadow: -10px 9px #5e0000;
    -webkit-box-shadow: -10px 9px #5e0000;
    -moz-box-shadow: -10px 9px #5e0000;
    -o-box-shadow: -10px 9px #5e0000;

    border-bottom-right-radius: 85px 60px;
    -webkit-border-bottom-right-radius: 85px 60px;
    -moz-border-bottom-right-radius: 85px 60px;
    -o-border-bottom-right-radius: 85px 60px;

    border-top-left-radius: 30px;
    -webkit-border-top-left-radius: 30px;
    -moz-border-top-left-radius: 30px;
    -o-border-top-left-radius: 30px;
  }

  div#bg_curve1_left {
    width: 400px;
    height: 80px;
    background-color: #8b0000;

    border-top-left-radius: 30px;
    -webkit-border-top-left-radius: 30px;
    -moz-border-top-left-radius: 30px;
    -o-border-top-left-radius: 30px;
  }

  div#curve2_left {
    width: 216px;
    height: 451px;
    background-color: #c00d0d;
    float: right;

    position: absolute;
    bottom: 0;
    right: 0;

    border-top-left-radius: 85px 60px;
    -webkit-border-top-left-radius: 85px 60px;
    -moz-border-top-left-radius: 85px 60px;
    -o-border-top-left-radius: 85px 60px;
  }

  div#bg_curve2_left {
    width: 400px;
    height: 420px;
    background-color: #c00d0d;

    box-shadow: -10px 9px #5e0000;
    -webkit-box-shadow: -10px 9px #5e0000;
    -moz-box-shadow: -10px 9px #5e0000;
    -o-box-shadow: -10px 9px #5e0000;

    border-bottom-left-radius: 30px;
    -webkit-border-bottom-left-radius: 30px;
    -moz-border-bottom-left-radius: 30px;
    -o-border-bottom-left-radius: 30px;
  }

  div#buttonGlass {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    border: 5px solid #fff;
    float: left;

    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;

    background: radial-gradient(#05fbfb, #29abe3);
    background: -webkit-radial-gradient(#05fbfb, #29abe3);
    background: -moz-radial-gradient(#05fbfb, #29abe3);
    background: -o-radial-gradient(#05fbfb, #29abe3);

    border-radius: 35px;
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    -o-border-radius: 35px;
  }

  div#reflect {
    width: 30px;
    height: 18px;
    margin: 3px 0 0 15px;
    background: #fff;
    opacity: 0.6;

    border-radius: 15px 9px;
    -webkit-border-radius: 15px 9px;
    -moz-border-radius: 15px 9px;
    -o-border-radius: 15px 9px;
  }

  div#miniButtonGlass1 {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;

    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;

    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -o-border-radius: 20px;

    background: radial-gradient(#fb7b7b, #fb0505);
    background: -webkit-radial-gradient(#fb7b7b, #fb0505);
    background: -moz-radial-gradient(#fb7b7b, #fb0505);
    background: -o-radial-gradient(#fb7b7b, #fb0505);
  }

  div#miniButtonGlass2 {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;

    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;

    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -o-border-radius: 20px;

    background: radial-gradient(#fbfb9b, #fbfb05);
    background: -webkit-radial-gradient(#fbfb9b, #fbfb05);
    background: -moz-radial-gradient(#fbfb9b, #fbfb05);
    background: -o-radial-gradient(#fbfb9b, #fbfb05);
  }

  div#miniButtonGlass3 {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;

    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;

    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -o-border-radius: 20px;

    background: radial-gradient(#b0fb7b, #50fb05);
    background: -webkit-radial-gradient(#b0fb7b, #50fb05);
    background: -moz-radial-gradient(#b0fb7b, #50fb05);
    background: -o-radial-gradient(#b0fb7b, #50fb05);
  }

  div#junction {
    width: 60px;
    height: 451px;
    float: right;

    background: linear-gradient(left, #8b0000 0%, #c00d0d 50%, #8b0000 100%);
    background: -webkit-linear-gradient(left, #8b0000 0%, #c00d0d 50%, #8b0000 100%);
    background: -moz-linear-gradient(left, #8b0000 0%, #c00d0d 50%, #8b0000 100%);
    background: -o-linear-gradient(left, #8b0000 0%, #c00d0d 50%, #8b0000 100%);
  }

  div#junction1 {
    height: 40px;
    background-color: #5e0000;
    opacity: 0.3;
    margin-top: 50px;
    margin-bottom: 262px;

    border-top: 2px solid #330000;
    border-bottom: 2px solid #330000;
  }

  div#junction2 {
    height: 40px;
    background-color: #5e0000;
    opacity: 0.3;

    border-top: 2px solid #330000;
    border-bottom: 2px solid #330000;
  }

  div#screen {
    height: 245px;
    width: 300px;
    padding: 0 20px;
    background-color: #b0b0b0;
    float: left;

    position: absolute;
    top: 130px;
    left: 19px;

    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;
  }

  div#screen:after {
    content: '';
    border-top: 40px solid #b0b0b0;
    border-left: 40px solid #c00d0d;
    height: 0;

    position: absolute;
    bottom: 0;
    left: 0;
  }

  div#picture {
    height: 175px;
    width: 254px;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 9px;
    background-color: #fff;
    border: 3px solid #494949;
    clear: both;
    font-family: 'Orbitron', sans-serif;
    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;

    label {
      display: flex;
      font-size: 0.6rem;
      align-items: center;
      justify-content: space-between;
      margin-top: 3px;
    }

    .user-main-info {
      font-family: 'Orbitron', sans-serif;
      font-weight: 700;
      width: 60%;
      background-color: transparent;
      border: none;
      font-size: 0.6rem;
      display: flex;
      padding: 0 10px;

      &.edit-mode {
        background-color: $app-gray;
      }
    }
  }

  div#picture img {
    display: block;
    margin: 0 auto;
  }

  div#topPicture {
    margin: 6px auto;
    width: 40px;
  }

  div#buttontopPicture1,
  div#buttontopPicture2 {
    height: 8px;
    width: 8px;
    background-color: #c00d0d;
    border: 1px solid #000;
    float: left;

    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;
  }

  div#buttontopPicture1 {
    margin-right: 20px;
  }

  div#buttonbottomPicture {
    height: 26px;
    width: 26px;
    background-color: #c00d0d;
    margin-left: 35px;
    float: left;

    border-radius: 30px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    -o-border-radius: 30px;

    box-shadow: -2px 1px #5e0000;
    -webkit-box-shadow: -2px 1px #5e0000;
    -moz-box-shadow: -2px 1px #5e0000;
    -o-box-shadow: -2px 1px #5e0000;

    background: linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -webkit-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -moz-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -o-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
  }

  div#speakers {
    float: right;
    width: 75px;
    height: 25px;
    margin-right: 20px;
  }

  div.sp {
    height: 3px;
    margin-bottom: 5px;
    background-color: #494949;

    border-radius: 30px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    -o-border-radius: 30px;
  }

  div#bigbluebutton {
    display: flex;
    user-select: none;
    height: 50px;
    width: 50px;
    font-size: 0.8rem;
    background-color: $app-black;
    cursor: pointer;
    text-align: center;
    font-family: 'Orbitron', sans-serif;
    color: $app-black;
    font-weight: 700;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 395px;
    left: 30px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -o-border-radius: 100px;

    background: linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -webkit-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -moz-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -o-linear-gradient(top, #307bfb 0%, #0530e5 80%);

    box-shadow: -3px 2px #001c91;
    -webkit-box-shadow: -3px 2px #001c91;
    -moz-box-shadow: -3px 2px #001c91;
    -o-box-shadow: -3px 2px #001c91;

    &.clicked {
      background: linear-gradient(top, #2eb203 0%, #114802 80%);
      background: -webkit-linear-gradient(top, #2eb203 0%, #114802 80%);
      background: -moz-linear-gradient(top, #2eb203 0%, #114802 80%);
      background: -o-linear-gradient(top, #2eb203 0%, #114802 80%);

      box-shadow: -3px 2px #052300;
      -webkit-box-shadow: -3px 2px #052300;
      -moz-box-shadow: -3px 2px #052300;
      -o-box-shadow: -3px 2px #052300;
    }

    &:hover {
      transform: scale(1.2);
    }
  }

  div#barbutton1 {
    height: 13px;
    width: 50px;

    position: absolute;
    top: 405px;
    left: 100px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -o-border-radius: 100px;

    background: linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -webkit-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -moz-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -o-linear-gradient(top, #50fb05 0%, #057b05 100%);

    box-shadow: -1px 2px #004200;
    -webkit-box-shadow: -1px 2px #004200;
    -moz-box-shadow: -1px 2px #004200;
    -o-box-shadow: -1px 2px #004200;
  }

  div#barbutton2 {
    height: 13px;
    width: 50px;

    position: absolute;
    top: 405px;
    left: 165px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -o-border-radius: 100px;

    background: linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -webkit-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -moz-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -o-linear-gradient(top, #fb6505 0%, #bb0505 100%);

    box-shadow: -1px 2px #7b0000;
    -webkit-box-shadow: -1px 2px #7b0000;
    -moz-box-shadow: -1px 2px #7b0000;
    -o-box-shadow: -1px 2px #7b0000;
  }

  div#cross {
    width: 90px;
    height: 90px;

    position: absolute;
    top: 394px;
    left: 230px;
  }

  div#topcross {
    width: 30px;
    height: 30px;
    background-color: #222;

    position: absolute;
    top: 0;
    left: 30px;

    box-shadow: -3px 2px #010101;
    -webkit-box-shadow: -3px 2px #010101;
    -moz-box-shadow: -3px 2px #010101;
    -o-box-shadow: -3px 2px #010101;

    border-top-left-radius: 5px;
    -webkit-border-top-left-radius: 5px;
    -moz-border-top-left-radius: 5px;
    -o-border-top-left-radius: 5px;

    border-top-right-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-top-right-radius: 5px;
    -o-border-top-right-radius: 5px;
  }

  div#leftcross {
    width: 30px;
    height: 30px;
    background-color: #222;
    z-index: 1;

    position: absolute;
    left: 0;
    top: 30px;

    box-shadow: -3px 2px #010101;
    -webkit-box-shadow: -3px 2px #010101;
    -moz-box-shadow: -3px 2px #010101;
    -o-box-shadow: -3px 2px #010101;

    border-top-left-radius: 5px;
    -webkit-border-top-left-radius: 5px;
    -moz-border-top-left-radius: 5px;
    -o-border-top-left-radius: 5px;

    border-bottom-left-radius: 5px;
    -webkit-border-bottom-left-radius: 5px;
    -moz-border-bottom-left-radius: 5px;
    -o-border-bottom-left-radius: 5px;
  }

  div#midcross {
    width: 30px;
    height: 30px;
    background-color: #222;

    position: absolute;
    top: 30px;
    left: 30px;

    box-shadow: -3px 2px #010101;
    -webkit-box-shadow: -3px 2px #010101;
    -moz-box-shadow: -3px 2px #010101;
    -o-box-shadow: -3px 2px #010101;
  }

  div#rightcross {
    width: 30px;
    height: 30px;
    background-color: #222;

    position: absolute;
    top: 30px;
    right: 0;

    box-shadow: -3px 2px #010101;
    -webkit-box-shadow: -3px 2px #010101;
    -moz-box-shadow: -3px 2px #010101;
    -o-box-shadow: -3px 2px #010101;

    border-top-right-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-top-right-radius: 5px;
    -o-border-top-right-radius: 5px;

    border-bottom-right-radius: 5px;
    -webkit-border-bottom-right-radius: 5px;
    -moz-border-bottom-right-radius: 5px;
    -o-border-bottom-right-radius: 5px;
  }

  div#botcross {
    width: 30px;
    height: 30px;
    background-color: #222;

    position: absolute;
    bottom: 0;
    left: 30px;

    box-shadow: -3px 2px #010101;
    -webkit-box-shadow: -3px 2px #010101;
    -moz-box-shadow: -3px 2px #010101;
    -o-box-shadow: -3px 2px #010101;

    border-bottom-left-radius: 5px;
    -webkit-border-bottom-left-radius: 5px;
    -moz-border-bottom-left-radius: 5px;
    -o-border-bottom-left-radius: 5px;

    border-bottom-right-radius: 5px;
    -webkit-border-bottom-right-radius: 5px;
    -moz-border-bottom-right-radius: 5px;
    -o-border-bottom-right-radius: 5px;
  }

  div#upT {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #111;

    position: absolute;
    top: 5px;
    left: 4px;
  }

  div#downT {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #111;

    position: absolute;
    bottom: 5px;
    left: 4px;
  }

  div#leftT {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 10px solid #111;
    border-bottom: 10px solid transparent;

    position: absolute;
    top: 5px;
    left: 4px;
  }

  div#rightT {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid #111;
    border-bottom: 10px solid transparent;

    position: absolute;
    top: 5px;
    right: 5px;
  }

  div#midCircle {
    width: 20px;
    height: 20px;

    position: absolute;
    top: 5px;
    left: 4px;

    border-radius: 30px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    -o-border-radius: 30px;

    background: radial-gradient(#111, #222);
    background: -webkit-radial-gradient(#111, #222);
    background: -moz-radial-gradient(#111, #222);
    background: -o-radial-gradient(#111, #222);
  }

  /* //// RIGHT PART //// */

  div#curve1_right {
    width: 166px;
    height: 451px;
    background-color: #c00d0d;
    float: right;

    position: absolute;
    bottom: 0;
    left: 0;

    border-top-right-radius: 85px 60px;
    -webkit-border-right-left-radius: 85px 60px;
    -moz-border-right-left-radius: 85px 60px;
    -o-border-right-left-radius: 85px 60px;
  }

  div#bg_curve1_right {
    width: 350px;
    height: 80px;
    background-color: #fff;

    border-top-right-radius: 30px;
    -webkit-border-top-right-radius: 30px;
    -moz-border-top-right-radius: 30px;
    -o-border-top-right-radius: 30px;
  }

  div#curve2_right {
    width: 216px;
    height: 100px;
    background-color: #fff;
    float: left;

    position: absolute;
    top: 0;
    right: 0;

    border-bottom-left-radius: 85px 60px;
    -webkit-border-bottom-left-radius: 85px 60px;
    -moz-border-bottom-left-radius: 85px 60px;
    -o-border-bottom-left-radius: 85px 60px;
  }

  div#bg_curve2_right {
    width: 349px;
    height: 420px;
    background-color: #c00d0d;

    border-bottom-right-radius: 30px;
    -webkit-border-bottom-right-radius: 30px;
    -moz-border-bottom-right-radius: 30px;
    -o-border-bottom-right-radius: 30px;

    box-shadow: -10px 9px #5e0000;
    -webkit-box-shadow: -10px 9px #5e0000;
    -moz-box-shadow: -10px 9px #5e0000;
    -o-box-shadow: -10px 9px #5e0000;
  }

  div#stats {
    height: 230px;
    width: 300px;
    padding: 10px;
    background-color: #30da0c;
    z-index: 1;
    font-size: 13px;
    color: darkred;
    font-family: 'Orbitron', sans-serif;
    overflow: scroll;
    overflow-x: hidden;
    scrollbar-color: #30da0c #714826;
    scrollbar-width: none;
    position: absolute;
    top: 130px;
    left: 25px;

    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;

    box-shadow: 0 0 20px #003300 inset;
    -webkit-box-shadow: 0 0 20px #003300 inset;
    -moz-box-shadow: 0 0 20px #003300 inset;
    -o-box-shadow: 0 0 20px #003300 inset;

    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 9em;
      box-shadow: inset 1px 1px 10px darkred;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: darkred;
    }

    &::-webkit-scrollbar-button:vertical:start:decrement {
      visibility: hidden;
    }

    &::-webkit-scrollbar-button:vertical:end:increment {
      visibility: hidden;
    }

    p {
      text-align: center;
      font-weight: 700;
      text-decoration: underline;
      margin: 10px 0;
    }

    label {
      display: flex;
      font-size: 0.6rem;
      align-items: center;
      justify-content: space-between;
      margin-top: 3px;
    }

    .user-main-info {
      font-family: 'Orbitron', sans-serif;
      font-weight: 700;
      width: 60%;
      color: darkred;
      background-color: transparent;
      border: none;
      font-size: 0.6rem;
      display: flex;
      padding: 0 10px;

      &.edit-mode {
        background-color: $app-gray;
      }
    }
  }

  div#blueButtons1 {
    z-index: 1;

    position: absolute;
    top: 295px;
    left: 49px;
  }

  div#blueButtons2 {
    z-index: 1;

    position: absolute;
    top: 335px;
    left: 49px;
  }

  div.blueButton {
    height: 35px;
    width: 45px;
    background-color: #003300;
    float: left;
    margin-right: 7px;

    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;

    background: linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -webkit-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -moz-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -o-linear-gradient(top, #307bfb 0%, #0530e5 80%);

    box-shadow: -1px 2px #001c91;
    -webkit-box-shadow: -1px 2px #001c91;
    -moz-box-shadow: -1px 2px #001c91;
    -o-box-shadow: -1px 2px #001c91;
  }

  div#barbutton3 {
    height: 13px;
    width: 50px;
    z-index: 1;

    position: absolute;
    top: 385px;
    left: 210px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -o-border-radius: 100px;

    background: linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -webkit-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -moz-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -o-linear-gradient(top, #50fb05 0%, #057b05 100%);

    box-shadow: -1px 2px #004200;
    -webkit-box-shadow: -1px 2px #004200;
    -moz-box-shadow: -1px 2px #004200;
    -o-box-shadow: -1px 2px #004200;
  }

  div#barbutton4 {
    height: 13px;
    width: 50px;
    z-index: 1;

    position: absolute;
    top: 385px;
    left: 270px;

    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -o-border-radius: 100px;

    background: linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -webkit-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -moz-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -o-linear-gradient(top, #fb6505 0%, #bb0505 100%);

    box-shadow: -1px 2px #7b0000;
    -webkit-box-shadow: -1px 2px #7b0000;
    -moz-box-shadow: -1px 2px #7b0000;
    -o-box-shadow: -1px 2px #7b0000;
  }

  div#miniButtonGlass4 {
    width: 15px;
    height: 15px;
    float: left;
    z-index: 1;

    position: absolute;
    top: 383px;
    left: 25px;

    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;

    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -o-border-radius: 20px;

    background: radial-gradient(#ff9b5b, #fb6505);
    background: -webkit-radial-gradient(#ff9b5b, #fb6505);
    background: -moz-radial-gradient(#ff9b5b, #fb6505);
    background: -o-radial-gradient(#ff9b5b, #fb6505);
  }

  div#miniButtonGlass5 {
    width: 15px;
    height: 15px;
    float: left;
    z-index: 1;

    position: absolute;
    top: 383px;
    left: 51px;

    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;

    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -o-border-radius: 20px;

    background: radial-gradient(#0abd0a, #057b05);
    background: -webkit-radial-gradient(#0abd0a, #057b05);
    background: -moz-radial-gradient(#0abd0a, #057b05);
    background: -o-radial-gradient(#0abd0a, #057b05);
  }

  div#yellowBox1 {
    user-select: none;
    width: 140px;
    height: 70px;
    z-index: 1;
    background-color: #ffff00;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 415px;
    font-size: 0.8rem;
    left: 25px;
    font-family: 'Orbitron', sans-serif;
    color: $app-black;
    font-weight: 700;
    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;

    box-shadow: 0 0 20px #ff6600 inset;
    -webkit-box-shadow: 0 0 20px #ff6600 inset;
    -moz-box-shadow: 0 0 20px #ff6600 inset;
    -o-box-shadow: 0 0 20px #ff6600 inset;

    &.clickedYB,
    &.clickedYB:hover {
      transform: scale(0.9);
    }
  }

  div#yellowBox2 {
    user-select: none;
    width: 140px;
    height: 70px;
    z-index: 1;
    background-color: #ffff00;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    font-size: 0.8rem;
    top: 415px;
    left: 185px;
    font-family: 'Orbitron', sans-serif;
    color: $app-black;
    font-weight: 700;
    border-radius: 15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    -o-border-radius: 15px;

    box-shadow: 0 0 20px #ff6600 inset;
    -webkit-box-shadow: 0 0 20px #ff6600 inset;
    -moz-box-shadow: 0 0 20px #ff6600 inset;
    -o-box-shadow: 0 0 20px #ff6600 inset;
    &.clickedYB,
    &.clickedYB:hover {
      transform: scale(0.9);
    }
  }

  div#yellowBox2:hover,
  div#yellowBox1:hover {
    transform: scale(1.1);
  }
}

hr {
  border: none;
  background-color: darkred;
  color: darkred;
  height: 2px;
  width: 70%;
  margin: 5px auto;
}

@media handheld and (orientation: portrait), (max-width: 768px) {
  div#pokedex {
    width: 400px;
  }

  div#logo {
    width: 281px;
    height: 99px;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/logo.png') no-repeat left
      top;
    z-index: 1;

    position: absolute;
    top: 220px;
    left: 30px;
  }

  div#left {
    width: 400px;
    height: 500px;
    float: left;
    position: relative;
    z-index: 1;
    margin: 0 auto;
  }

  div#curve1_left {
    width: 201px;
    height: 85px;
    background-color: #8b0000;
    float: left;
    padding: 15px 0 0 15px;

    position: absolute;
    top: 0;
    left: 0;

    box-shadow: 0 0 #5e0000;
    -webkit-box-shadow: 0 0 #5e0000;
    -moz-box-shadow: 0 0 #5e0000;
    -o-box-shadow: 0 0 #5e0000;

    border-bottom-right-radius: 85px 60px;
    -webkit-border-bottom-right-radius: 85px 60px;
    -moz-border-bottom-right-radius: 85px 60px;
    -o-border-bottom-right-radius: 85px 60px;

    border-top-left-radius: 30px;
    -webkit-border-top-left-radius: 30px;
    -moz-border-top-left-radius: 30px;
    -o-border-top-left-radius: 30px;
  }

  div#bg_curve1_left {
    width: 400px;
    height: 80px;
    background-color: #8b0000;

    box-shadow: -10px 9px #5e0000;
    -webkit-box-shadow: -10px 9px #5e0000;
    -moz-box-shadow: -10px 9px #5e0000;
    -o-box-shadow: -10px 9px #5e0000;

    border-top-left-radius: 30px;
    -webkit-border-top-left-radius: 30px;
    -moz-border-top-left-radius: 30px;
    -o-border-top-left-radius: 30px;
  }

  div#right,
  div#screen,
  div#bigbluebutton,
  div#barbutton1,
  div#barbutton2,
  div#cross {
    display: none;
  }
}
</style>
