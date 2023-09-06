<template>
  <main>
    <div id="pokedex">
      <div id="left">
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
            <div class="message" v-if="isShowUpdateMessage">
              <img src="@/assets/images/messageProfile.jpg" alt="message" />
              <p ref="update-message">{{ statusMessage }}</p>
            </div>
            <template v-if="!isShowUpdateMessage">
              <label>
                Salutation
                <select
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :disabled="isInfoMode"
                  :id="`LS-salutation`"
                  :ref="`LS-salutation`"
                  @change="validate($event)"
                >
                  <option
                    v-for="item in salutation"
                    v-bind:value="item"
                    v-bind:key="item"
                    :selected="item === userInfo.salutation"
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
                  :type="getType(item)"
                  :ref="`LS-${item}`"
                  :id="`LS-${item}`"
                  @change.prevent="validate($event)"
                />
              </label>
            </template>
          </div>
          <div id="buttonbottomPicture"></div>
          <div id="speakers">
            <div class="sp"></div>
            <div class="sp"></div>
            <div class="sp"></div>
            <div class="sp"></div>
          </div>
        </div>
        <div id="bigbluebutton" :class="isInfoMode ? '' : 'clicked'" @click="changeMode">
          {{ isInfoMode ? `EDIT` : `SAVE` }}
        </div>
        <div id="barbutton1"></div>
        <div id="barbutton2" :disabled="isInfoMode" @click="cancelChanges">
          {{ isInfoMode ? '' : 'cancel' }}
        </div>
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
          <div class="shipping-address" v-if="isShowShippingAddresses">
            <p>Here are your shipping addresses</p>
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
                  :id="`SA-salutation-${addressShip}`"
                  :ref="`SA-salutation-${addressShip}`"
                  @change="validate($event)"
                >
                  <option
                    v-for="item in salutation"
                    v-bind:value="item"
                    v-bind:key="item"
                    :selected="
                      item ===
                      (userInfo.addresses.find((value) => value.id === addressShip)?.salutation ||
                        salutation.None)
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
                  :value="userInfo?.addresses?.find((value) => value.id === addressShip)[item]"
                  :disabled="isInfoMode"
                  :id="`SA-${item}-${addressShip}`"
                  :ref="`SA-${item}-${addressShip}`"
                  @change.prevent="validate($event)"
                />
              </label>
              <p>Address details</p>
              <label>
                Country
                <select
                  class="user-main-info"
                  :class="isInfoMode ? '' : 'edit-mode'"
                  :disabled="isInfoMode"
                  :id="`SA-country-${addressShip}`"
                  :ref="`SA-country-${addressShip}`"
                  @change="validate($event)"
                >
                  <option
                    v-for="item in countries"
                    v-bind:value="item"
                    v-bind:key="item"
                    :selected="
                      item ===
                      countries[
                        countryCodes[
                          userInfo?.addresses?.find((value) => value.id === addressShip).country
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
                  :value="userInfo?.addresses.find((value) => value.id === addressShip)[item]"
                  :disabled="isInfoMode"
                  :id="`SA-${item}-${addressShip}`"
                  :ref="`SA-${item}-${addressShip}`"
                  @change.prevent="validate($event)"
                />
              </label>
              <div class="question" v-if="addressShip !== userInfo.defaultShippingAddressId">
                Set as default shipping address?
                <input type="checkbox" :disabled="isInfoMode" />
              </div>
              <div class="question" v-if="addressShip !== userInfo.defaultShippingAddressId">
                Remove address?
                <input type="checkbox" :disabled="isInfoMode" />
              </div>
            </div>
          </div>
          <div class="billing-address" v-if="isShowBillingAddresses">
            <p>Here are your billing addresses</p>
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
                  :id="`BA-salutation-${addressShip}`"
                  :ref="`BA-salutation-${addressShip}`"
                  @change="validate($event)"
                >
                  <option
                    v-for="item in salutation"
                    v-bind:value="item"
                    v-bind:key="item"
                    :selected="
                      item ===
                      userInfo?.addresses.find((value) => value.id === addressBil).salutation
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
                  :value="userInfo?.addresses.find((value) => value.id === addressBil)[item]"
                  :disabled="isInfoMode"
                  :id="`BA-${item}-${addressBil}`"
                  :ref="`BA-${item}-${addressBil}`"
                  @change.prevent="validate($event)"
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
                          userInfo?.addresses.find((value) => value.id === addressBil).country
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
                  :value="userInfo?.addresses.find((value) => value.id === addressBil)[item]"
                  :disabled="isInfoMode"
                  :id="`SA-${item}-${addressBil}`"
                  :ref="`SA-${item}-${addressBil}`"
                  @change.prevent="validate($event)"
                />
              </label>
            </div>
          </div>

          <div class="add-address" v-if="isShowChangeEmailAddresses">
            <label>
              Country
              <select
                class="user-main-info"
                :class="isInfoMode ? '' : 'edit-mode'"
                :disabled="isInfoMode"
                ref="NA-country"
              >
                <option v-for="item in countries" v-bind:value="item" v-bind:key="item">
                  {{ item }}
                </option>
              </select>
            </label>
            <label v-for="[item, value] in addressDetails" v-bind:key="item">
              {{ value }}
              <input
                class="user-main-info"
                :class="isInfoMode ? '' : 'edit-mode'"
                :disabled="isInfoMode"
                :ref="`NA-${item}`"
                @change.prevent="validate($event)"
              />
            </label>
            <label v-for="[item, value] in contactDetails" v-bind:key="item">
              {{ value }}
              <input
                class="user-main-info"
                :class="isInfoMode ? '' : 'edit-mode'"
                :disabled="isInfoMode"
                :ref="`NA-${item}`"
                @change.prevent="validate($event)"
              />
            </label>
            <fieldset :class="isInfoMode ? '' : 'edit-mode'" :disabled="isInfoMode">
              <label>Billing <input ref="setBilling" type="radio" name="addressType" /></label>
              <label>Shipping <input ref="setShipping" type="radio" name="addressType" /></label>
              <label>Both <input ref="setBoth" type="radio" name="addressType" /></label>
            </fieldset>
            <label
              >Set default shipping
              <input type="checkbox" :class="isInfoMode ? '' : 'edit-mode'" :disabled="isInfoMode"
            /></label>
            <label
              >Set default billing
              <input type="checkbox" :class="isInfoMode ? '' : 'edit-mode'" :disabled="isInfoMode"
            /></label>
            <button
              @click="addNewAddress"
              :class="isInfoMode ? '' : 'edit-mode'"
              :disabled="isInfoMode"
            >
              Add address
            </button>
          </div>

          <div class="change-password" v-if="isShowChangePassword">
            <label>
              Current password
              <input
                placeholder="Type current password here"
                :class="isInfoMode ? '' : 'edit-mode'"
                :disabled="isInfoMode"
                type="password"
                ref="currentPassword"
                @input.prevent="validatePassword($event)"
              />
              <img
                v-if="!isInfoMode"
                src="@/assets/icons/eye.png"
                class="password-toggle"
                @click="changePasswordVisibility('currentPassword')"
                alt="show-password"
              />
              <div class="crossed" v-if="isShowPasswordCurrent"></div>
            </label>
            <label>
              New password
              <input
                placeholder="Type new password here"
                :class="isInfoMode ? '' : 'edit-mode'"
                :disabled="isInfoMode"
                type="password"
                ref="newPassword"
                @input.prevent="validatePassword($event)"
              />
              <img
                src="@/assets/icons/eye.png"
                v-if="!isInfoMode"
                class="password-toggle"
                @click="changePasswordVisibility('newPassword')"
                alt="show-password"
              />
              <div class="crossed" v-if="isShowPasswordNew"></div>
            </label>
            <label>
              Confirm new password
              <input
                placeholder="Confirm new password"
                :class="isInfoMode ? '' : 'edit-mode'"
                :disabled="isInfoMode"
                type="password"
                ref="checkPassword"
                @input.prevent="validatePassword($event)"
              />
              <img
                src="@/assets/icons/eye.png"
                v-if="!isInfoMode"
                class="password-toggle"
                @click="changePasswordVisibility('checkPassword')"
                alt="show-password"
              />
              <div class="crossed" v-if="isShowPasswordCheck"></div>
            </label>
            <fieldset :disabled="isInfoMode">
              <label
                >Auto login after changing<input
                  checked
                  name="option"
                  type="radio"
                  @change.prevent="isRelogin = !isRelogin"
              /></label>
              <label
                >Logout after changing<input
                  name="option"
                  type="radio"
                  @change.prevent="isRelogin = !isRelogin"
              /></label>
            </fieldset>
            <button
              @click="changePassword"
              :disabled="!(isCheckPasswordValid && isCurrentPasswordValid && isNewPasswordValid)"
            >
              update
            </button>
          </div>
        </div>
        <div id="miniButtonGlass4"></div>
        <div id="miniButtonGlass5"></div>
        <div id="barbutton3"></div>
        <div id="barbutton4"></div>
        <div
          id="yellowBox1"
          @click="yellowButtonsClick('BA')"
          :class="!isShowBillingAddresses ? '' : 'clickedYB'"
        >
          Billing address
        </div>
        <div
          id="yellowBox2"
          @click="yellowButtonsClick('SA')"
          :class="!isShowShippingAddresses ? '' : 'clickedYB'"
        >
          Shipping address
        </div>
        <div
          id="yellowBox3"
          @click="yellowButtonsClick('email')"
          :class="!isShowChangeEmailAddresses ? '' : 'clickedYB'"
        >
          Add address
        </div>
        <div
          id="yellowBox4"
          @click="yellowButtonsClick('password')"
          :class="!isShowChangePassword ? '' : 'clickedYB'"
        >
          Change password
        </div>
        <div id="bg_curve1_right"></div>
        <div id="bg_curve2_right"></div>
        <div id="curve1_right"></div>
        <div id="curve2_right"></div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/authorization";
import {
  addressDetails,
  contactDetails,
  Countries,
  CountryCodes,
  CountryCodesByCountry,
  CustomerUpdateActions,
  Salutations,
  userProfileLeftSideFields
} from "@/global/constatnts";
import Validator from "@/services/validator";
import type { ActionsDTO, ChangePasswordDTO, CustomerAddress, CustomerInfo, UpdateUserInfoDTO } from "@/stores/types";
import router from "@/router";

const validator = new Validator()
const fieldsForValidation = [
  'firstName',
  'middleName',
  'lastName',
  'title',
  'city',
  'region',
  'state',
  'department'
]
export default {
  name: 'ProfileView',
  data() {
    return {
      store: useUserStore(),
      userInfo: {} as CustomerInfo,
      isInfoMode: true,
      salutation: Salutations,
      countries: Countries,
      countryCodes: CountryCodes,
      leftFields: userProfileLeftSideFields,
      contactDetails: contactDetails,
      addressDetails: addressDetails,
      isShowShippingAddresses: true,
      isShowBillingAddresses: false,
      isShowChangeEmailAddresses: false,
      isShowChangePassword: false,
      invalidFieldIds: [] as string[],
      changedFields: [] as string[],
      isShowUpdateMessage: false,
      statusMessage: '',
      isCurrentPasswordValid: false,
      isNewPasswordValid: false,
      isCheckPasswordValid: false,
      isShowPasswordCurrent: false,
      isShowPasswordNew: false,
      isShowPasswordCheck: false,
      isRelogin: true
    }
  },
  async beforeMount(): void {
    this.store.isLoading = true
    this.userInfo = await this.store.getMyCustomerDetails()
    this.store.isLoading = false
  },
  methods: {
    userProfileLeftSideFields() {
      return userProfileLeftSideFields
    },
    createAddressObject(){
      const newAddress: Omit<CustomerAddress, 'id', 'key', 'externalId'> = {
        additionalAddressInfo: this.$refs['NA-additionalAddressInfo'][0].value,
        additionalStreetInfo: this.$refs['NA-additionalStreetInfo'][0].value,
        apartment: this.$refs['NA-apartment'][0].value,
        building: this.$refs['NA-building'][0].value,
        city: this.$refs['NA-city'][0].value,
        company: this.$refs['NA-company'][0].value,
        country:CountryCodesByCountry[this.$refs['NA-country'][0].value],
        email: this.$refs['NA-email'][0].value,
        fax: this.$refs['NA-fax'][0].value,
        department: this.$refs['NA-department'][0].value,
        firstName: this.$refs['NA-firstName'][0].value,
        lastName: this.$refs['NA-lastName'][0].value,
        pOBox: this.$refs['NA-pOBox'][0].value,
        phone: this.$refs['NA-additionalAddressInfo'][0].value,
        postalCode: this.$refs['NA-postalCode'][0].value,
        region: this.$refs['NA-region'][0].value,
        salutation: this.$refs['NA-additionalAddressInfo'][0].value,
        state: this.$refs['NA-state'][0].value,
        streetName: this.$refs['NA-streetName'][0].value,
        streetNumber: this.$refs['NA-streetNumber'][0].value,
        title: this.$refs['NA-additionalAddressInfo'][0].value
      }
      return newAddress
    },
    async addBilingAddress() {
      const action = { action: CustomerUpdateActions.addBillingAddressId, addressId: this.userInfo.addresses[this.userInfo.addresses.length - 1].id } as ActionsDTO
      this.userInfo = await this.store.updateUserInfo({
          version: this.userInfo.version,
          actions: [action]
        }
      )
    },
    async addShippingAddress(){
      const action = { action: CustomerUpdateActions.addShippingAddressId, addressId: this.userInfo.addresses[this.userInfo.addresses.length - 1].id } as ActionsDTO
      this.userInfo = await this.store.updateUserInfo({
          version: this.userInfo.version,
          actions: [action]
        }
      )
    },
    async addNewAddress() {
      this.store.isLoading = true
      const action = { action: CustomerUpdateActions.addAddress, address: this.createAddressObject() } as ActionsDTO
      this.userInfo = await this.store.updateUserInfo({
          version: this.userInfo.version,
          actions: [action]
        }
      )
      if (this.userInfo.id) {
        this.statusMessage = 'Successfully updated.'
      } else {
        this.statusMessage = 'An error occurred while executing the request. Try later.'
      }
      this.isShowUpdateMessage = true
      if (this.$refs.setBilling.checked) await this.addBilingAddress()
      if (this.$refs.setShipping.checked) await this.addShippingAddress()
      if (this.$refs.setBoth.checked) {
        await this.addShippingAddress()
        await this.addBilingAddress()
      }
      setTimeout(() => (this.isShowUpdateMessage = false), 2000)
      this.store.isLoading = false
    },
    changePasswordVisibility(el: string) {
      const pass = this.$refs[el] as HTMLInputElement
      if (pass) {
        pass.type = pass.type === 'password' ? 'text' : 'password'
        if (pass === this.$refs.currentPassword)
          this.isShowPasswordCurrent = !this.isShowPasswordCurrent
        if (pass === this.$refs.checkPassword) this.isShowPasswordCheck = !this.isShowPasswordCheck
        if (pass === this.$refs.newPassword) this.isShowPasswordNew = !this.isShowPasswordNew
      }
    },
    clearInput(ev: Event) {
      ;(ev.target as HTMLInputElement).value = ''
    },
    separatePrefixes(id: string): [string, CustomerAddress] {
      let addressID = ''
      let address = {} as CustomerAddress
      let clearId = id.replace('LS-', '').replace('SA-', '').replace('BA-', '')
      if (clearId.includes('-')) {
        ;[clearId, addressID] = clearId.split('-')
        address = this.userInfo.addresses.find((value) => value.id === addressID) || address
      }
      return [clearId, address]
    },
    validate(event: Event) {
      if (!event.target) throw new ReferenceError('Element not found!')
      const target = event.target as HTMLInputElement
      let [field, address, isValid, bgColor] = [...this.separatePrefixes(target.id), true, '']
      if (this.userInfo[field] !== target.value || address[field] === target.value) {
        if (fieldsForValidation.includes(field)) {
          isValid = validator.validateOnlyLetters(target.value)
        } else if (['dateOfBirth'].includes(field)) {
          isValid = validator.validateAge(target.value)
        } else if (['companyName', 'company', 'company'].includes(field)) {
          isValid = validator.validateCompanyName(target.value)
        } else if (['email'].includes(field)) {
          validator.validateEmail(target.value)
          isValid = validator.errorsEmail.length === 0
        } else if (['phone', 'mobile', 'fax'].includes(field)) {
          isValid = validator.validatePhoneNumber(target.value)
        } else if (['streetNumber'].includes(field)) {
          isValid = validator.validateOnlyNumbers(target.value)
        } else if (['postalCode'].includes(field)) {
          isValid = validator.validatePostalCode(target.value, Countries.France)
        } else if (['streetName', 'building', 'apartment'].includes(field)) {
          isValid = validator.validateStreet(target.value)
        } else if (['pOBox'].includes(field)) {
          isValid = validator.validatePOBox(target.value)
        }
        bgColor = isValid ? '#00FF007F' : '#FF00007F'
        this.invalidFieldIds = [...this.invalidFieldIds.filter((value) => value !== target.id)]
        if (!this.changedFields.includes(target.id)) this.changedFields.push(target.id)
        if (!isValid && !this.invalidFieldIds.includes(target.id))
          this.invalidFieldIds.push(target.id)
      } else {
        this.changedFields = [...this.changedFields.filter((value) => value !== target.id)]
      }
      target.style.backgroundColor = bgColor
    },
    validatePassword(ev: Event) {
      const checkPass = this.$refs.checkPassword as HTMLInputElement
      const newPass = this.$refs.newPassword as HTMLInputElement
      const currPass = this.$refs.currentPassword as HTMLInputElement
      const el: HTMLInputElement = ev.target as HTMLInputElement
      const value = el.value as string
      if (el === currPass) {
        validator.validatePassword(el.value)
        this.isCurrentPasswordValid = validator.errorsPassword.length === 0
      }
      if (el === newPass) {
        validator.validatePassword(value)
        if (!currPass) throw new ReferenceError('Element not found!')
        this.isNewPasswordValid =
          currPass.value !== newPass.value && validator.errorsPassword.length === 0
      }
      if (el === this.$refs.checkPassword) {
        validator.validatePassword(value)
        this.isCheckPasswordValid = checkPass.value === newPass.value
      }
    },
    getType(field: string) {
      if (['dateOfBirth'].includes(field)) {
        return 'date'
      }
      return 'text'
    },
    yellowButtonsClick(clicked: string) {
      this.isShowChangeEmailAddresses = clicked === 'email'
      this.isShowShippingAddresses = clicked === 'SA'
      this.isShowBillingAddresses = clicked === 'BA'
      this.isShowChangePassword = clicked === 'password'
    },
    cancelChanges() {
      if (!this.isInfoMode) {
        this.changedFields.forEach((value) => {
          if (value.includes('LS-')) {
            if (value.replace('LS-', '') === 'salutation') {
              const val = this.$refs[value] as HTMLSelectElement
              val.style.backgroundColor = ''
              for (let obj of val) {
                obj.selected = obj.value === this.userInfo.salutation
              }
            }
            this.$refs[value][0].value = this.userInfo[value.replace('LS-', '')]
          } else if (value.includes('SA-') || value.includes('BA-')) {
            let [field, address] = this.separatePrefixes(value)
            if (field === 'country') {
              const country = this.$refs[value][0]
              for (let obj of country) {
                obj.selected = obj.value === Countries[CountryCodes[address[field]]]
              }
            }
            ;((this.$refs[value] as HTMLElement[])[0] as HTMLInputElement).value = address[field]
          }
          this.$refs[value][0].style.backgroundColor = ''
        })
      }
    },
    getLeftSideAction(field: keyof ActionsDTO, val: string): ActionsDTO {
      const action = {} as ActionsDTO
      switch (field) {
        case 'salutation':
          action.action = CustomerUpdateActions.setSalutation
          break
        case 'firstName':
          action.action = CustomerUpdateActions.setFirstName
          break
        case 'middleName':
          action.action = CustomerUpdateActions.setMiddleName
          break
        case 'lastName':
          action.action = CustomerUpdateActions.setLastName
          break
        case 'dateOfBirth':
          action.action = CustomerUpdateActions.setDateOfBirth
          break
        case 'companyName':
          action.action = CustomerUpdateActions.setCompanyName
          break
        case 'title':
          action.action = CustomerUpdateActions.setTitle
          break
        case 'email':
          action.action = CustomerUpdateActions.changeEmail
      }
      action[field] =
        ((this.$refs[val] as HTMLElement[])[0] as HTMLOptionElement).value ||
        (this.$refs[val] as HTMLInputElement).value
      return action
    },
    changeMode() {
      if (!this.isInfoMode && this.changedFields.length) {
        if (!this.invalidFieldIds.length) {
          this.acceptChanges()
          this.isInfoMode = !this.isInfoMode
        } else {
          this.statusMessage = 'Check the correctness of the entered data'
          this.isShowUpdateMessage = true
          setTimeout(() => {
            this.isShowUpdateMessage = false
          }, 2000)
        }
      } else {
        this.isInfoMode = !this.isInfoMode
      }
    },
    async relogin() {
      if (
        await this.store.getTokens(
          this.userInfo.email,
          (this.$refs.newPassword as HTMLInputElement).value
        )
      ) {
        if (
          await this.store.login(
            this.userInfo.email,
            (this.$refs.newPassword as HTMLInputElement).value
          )
        ) {
          this.store.isLogin = true
          this.userInfo = await this.store.getMyCustomerDetails()
        }
      }
      ;(this.$refs.newPassword as HTMLInputElement).value = ''
      ;(this.$refs.currentPassword as HTMLInputElement).value = ''
      ;(this.$refs.checkPassword as HTMLInputElement).value = ''
      this.isShowUpdateMessage = true
      setTimeout(() => (this.isShowUpdateMessage = false), 1500)
      this.store.isLoading = false
    },
    async changePassword() {
      this.store.isLoading = true
      const passwordDTO: ChangePasswordDTO = {
        id: this.userInfo.id,
        currentPassword: (this.$refs.currentPassword as HTMLInputElement).value,
        newPassword: (this.$refs.newPassword as HTMLInputElement).value,
        version: this.userInfo.version
      }
      this.store.clearCookie()
      this.store.isLogin = false
      this.userInfo = await this.store.changePassword(passwordDTO)
      if (this.userInfo.id) {
        this.statusMessage = 'Password updated successfully!'
        if (this.isRelogin) {
          await this.relogin()
        } else {
          this.store.isLoading = false
          await this.store.readCookie()
          await router.push('/login')
        }
      } else {
        this.statusMessage = 'Check your old password and try again.'
        this.isShowUpdateMessage = true
        setTimeout(() => (this.isShowUpdateMessage = false), 1500)
        this.store.isLoading = false
      }
    },
    async acceptChanges() {
      this.store.isLoading = true
      const updateInfo: UpdateUserInfoDTO = { version: this.userInfo.version, actions: [] }
      this.changedFields.forEach((val) => {
        if (val.includes('LS-')) {
          const field = val.replace('LS-', '')
          updateInfo.actions.push(this.getLeftSideAction(field, val))
        } else {
          const [field, adreess] = this.separatePrefixes(val)
          console.log(field, adreess)
        }
      })
      this.userInfo = await this.store.updateUserInfo(updateInfo)
      if (this.userInfo.id) {
        this.statusMessage = 'Successfully updated.'
        this.changedFields = []
        this.invalidFieldIds = []
      } else {
        this.statusMessage = 'An error occurred while executing the request. Try later.'
      }
      this.isShowUpdateMessage = true
      setTimeout(() => (this.isShowUpdateMessage = false), 2000)
      this.store.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';
@font-face {
  font-family: 'Orbitron';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(@/assets/fonts/Orbitron.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304,
    U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF,
    U+FFFD;
}
main {
  padding-top: 160px;
}

@media all {
  #pokedex {
    width: 750px;
    margin: 50px auto 0 auto;
  }

  #left {
    @include view(400px, 500px, relative, auto);
    float: left;
    z-index: 1;
  }

  #right {
    @include view(350px, 500px, relative, auto);
    float: left;
  }

  /* //// LEFT PART //// */

  #curve1_left {
    @include view(201px, 85px, absolute, auto);
    @include box-shadow(-10px, 9px, #5e0000);
    background-color: #8b0000;
    float: left;
    padding: 15px 0 0 15px;
    top: 0;
    left: 0;
    @include border-bottom-right-radius(85px, 60px);
    @include border-top-left-radius(30px, 30px);
  }

  #bg_curve1_left {
    width: 400px;
    height: 80px;
    background-color: #8b0000;
    @include border-top-left-radius(30px, 30px);
  }

  #curve2_left {
    width: 216px;
    height: 451px;
    background-color: #c00d0d;
    float: right;
    position: absolute;
    bottom: 0;
    right: 0;
    @include border-top-left-radius(85px, 60px);
  }

  #bg_curve2_left {
    width: 400px;
    height: 420px;
    background-color: #c00d0d;
    @include box-shadow(-10px, 9px, #5e0000);
    @include border-bottom-left-radius(30px, 30px);
  }

  #buttonGlass {
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
    @include border-radius(35px);
  }

  #reflect {
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

  #miniButtonGlass1 {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;
    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;
    @include border-radius(20px);
    background: radial-gradient(#fb7b7b, #fb0505);
    background: -webkit-radial-gradient(#fb7b7b, #fb0505);
    background: -moz-radial-gradient(#fb7b7b, #fb0505);
    background: -o-radial-gradient(#fb7b7b, #fb0505);
  }

  #miniButtonGlass2 {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;
    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;
    @include border-radius(20px);
    background: radial-gradient(#fbfb9b, #fbfb05);
    background: -webkit-radial-gradient(#fbfb9b, #fbfb05);
    background: -moz-radial-gradient(#fbfb9b, #fbfb05);
    background: -o-radial-gradient(#fbfb9b, #fbfb05);
  }

  #miniButtonGlass3 {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;
    box-shadow: 0 0 10px #490000;
    -webkit-box-shadow: 0 0 10px #490000;
    -moz-box-shadow: 0 0 10px #490000;
    -o-box-shadow: 0 0 10px #490000;
    @include border-radius(20px);
    background: radial-gradient(#b0fb7b, #50fb05);
    background: -webkit-radial-gradient(#b0fb7b, #50fb05);
    background: -moz-radial-gradient(#b0fb7b, #50fb05);
    background: -o-radial-gradient(#b0fb7b, #50fb05);
  }

  #junction {
    width: 60px;
    height: 451px;
    float: right;
    @include background-gradient(left, #8b0000, 0%, #c00d0d, 50%, #8b0000, 100%);
  }

  #junction1 {
    height: 40px;
    background-color: #5e0000;
    opacity: 0.3;
    margin-top: 50px;
    margin-bottom: 262px;
    border-top: 2px solid #330000;
    border-bottom: 2px solid #330000;
  }

  #junction2 {
    height: 40px;
    background-color: #5e0000;
    opacity: 0.3;
    border-top: 2px solid #330000;
    border-bottom: 2px solid #330000;
  }

  #screen {
    height: 245px;
    width: 300px;
    padding: 0 20px;
    background-color: #b0b0b0;
    float: left;
    position: absolute;
    top: 130px;
    left: 19px;
    @include border-radius(15px);
  }

  #screen:after {
    content: '';
    border-top: 40px solid #b0b0b0;
    border-left: 40px solid #c00d0d;
    height: 0;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  #picture {
    user-select: none;
    height: 175px;
    width: 254px;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 9px;
    background-color: #fff;
    border: 3px solid #494949;
    clear: both;
    font-family: 'Orbitron', sans-serif;
    @include border-radius(15px);

    .message {
      padding: 20px;
      font-size: 0.8rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: justify;

      p {
        display: flex;
        width: 100%;
      }

      img {
        height: 50px;
        display: flex;
        margin: 10px auto;
      }
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

  #picture img {
    display: block;
    margin: 0 auto;
  }

  #topPicture {
    margin: 6px auto;
    width: 40px;
  }

  #buttontopPicture1,
  #buttontopPicture2 {
    height: 8px;
    width: 8px;
    background-color: #c00d0d;
    border: 1px solid #000;
    float: left;
    @include border-radius(15px);
  }

  #buttontopPicture1 {
    margin-right: 20px;
  }

  #buttonbottomPicture {
    height: 26px;
    width: 26px;
    background-color: #c00d0d;
    margin-left: 35px;
    float: left;
    @include border-radius(30px);
    @include box-shadow(-2px, 1px, #5e0000);
    background: linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -webkit-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -moz-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
    background: -o-linear-gradient(top, #c00d0d 0%, #8b0000 80%);
  }

  #speakers {
    float: right;
    width: 75px;
    height: 25px;
    margin-right: 20px;
  }

  .sp {
    height: 3px;
    margin-bottom: 5px;
    background-color: #494949;
    @include border-radius(30px);
  }

  #bigbluebutton {
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
    @include border-radius(100px);

    background: linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -webkit-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -moz-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -o-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    @include box-shadow(-3px, 2px, #001c91);

    &.clicked {
      background: linear-gradient(top, #2eb203 0%, #114802 80%);
      background: -webkit-linear-gradient(top, #2eb203 0%, #114802 80%);
      background: -moz-linear-gradient(top, #2eb203 0%, #114802 80%);
      background: -o-linear-gradient(top, #2eb203 0%, #114802 80%);
      @include box-shadow(-3px, 2px, #052300);
    }

    &:hover {
      transform: scale(1.2);
    }
  }

  div#barbutton1 {
    display: flex;
    font-size: 0.6rem;
    align-items: center;
    justify-content: center;
    color: $app-white;
    height: 13px;
    width: 50px;
    position: absolute;
    top: 405px;
    left: 100px;
    @include border-radius(100px);
    background: linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -webkit-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -moz-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -o-linear-gradient(top, #50fb05 0%, #057b05 100%);
    @include box-shadow(-1px, 2px, #004200);
  }

  div#barbutton2 {
    display: flex;
    font-size: 0.6rem;
    align-items: center;
    justify-content: center;
    color: $app-white;
    height: 13px;
    width: 50px;
    position: absolute;
    top: 405px;
    left: 165px;
    @include border-radius(100px);
    background: linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -webkit-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -moz-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -o-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    @include box-shadow(-1px, 2px, #7b0000);
  }

  #barbutton1:hover,
  #barbutton2:hover {
    scale: 1.2;
    cursor: pointer;
  }

  #cross {
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
    @include box-shadow(-3px, 2px, #010101);
    @include border-top-left-radius(5px, 5px);
    border-top-right-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-top-right-radius: 5px;
    -o-border-top-right-radius: 5px;
  }

  #leftcross {
    width: 30px;
    height: 30px;
    background-color: #222;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 30px;
    @include box-shadow(-3px, 2px, #010101);
    @include border-top-left-radius(5px, 5px);
    @include border-bottom-left-radius(5px, 5px);
  }

  #midcross {
    width: 30px;
    height: 30px;
    background-color: #222;
    position: absolute;
    top: 30px;
    left: 30px;
    @include box-shadow(-3px, 2px, #010101);
  }

  #rightcross {
    width: 30px;
    height: 30px;
    background-color: #222;
    position: absolute;
    top: 30px;
    right: 0;
    @include box-shadow(-3px, 2px, #010101);
    border-top-right-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-top-right-radius: 5px;
    -o-border-top-right-radius: 5px;
    @include border-bottom-right-radius(5px, 5px);
  }

  #botcross {
    width: 30px;
    height: 30px;
    background-color: #222;
    position: absolute;
    bottom: 0;
    left: 30px;
    @include box-shadow(-3px, 2px, #010101);
    @include border-bottom-left-radius(5px, 5px);
    @include border-bottom-right-radius(5px, 5px);
  }

  #upT {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #111;
    position: absolute;
    top: 5px;
    left: 4px;
  }

  #downT {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #111;
    position: absolute;
    bottom: 5px;
    left: 4px;
  }

  #leftT {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 10px solid #111;
    border-bottom: 10px solid transparent;
    position: absolute;
    top: 5px;
    left: 4px;
  }

  #rightT {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid #111;
    border-bottom: 10px solid transparent;
    position: absolute;
    top: 5px;
    right: 5px;
  }

  #midCircle {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    left: 4px;
    @include border-radius(30px);
    background: radial-gradient(#111, #222);
    background: -webkit-radial-gradient(#111, #222);
    background: -moz-radial-gradient(#111, #222);
    background: -o-radial-gradient(#111, #222);
  }

  /* //// RIGHT PART //// */

  #curve1_right {
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

  #bg_curve1_right {
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
    @include border-bottom-left-radius(85px, 60px);
  }

  #bg_curve2_right {
    width: 349px;
    height: 420px;
    background-color: #c00d0d;
    @include border-bottom-right-radius(30px, 30px);
    @include box-shadow(-10px, 9px, #5e0000);
  }

  #stats {
    user-select: none;
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
    @include border-radius(15px);
    box-shadow: 0 0 20px #003300 inset;
    -webkit-box-shadow: 0 0 20px #003300 inset;
    -moz-box-shadow: 0 0 20px #003300 inset;
    -o-box-shadow: 0 0 20px #003300 inset;

    .question {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin: 5px auto;
    }

    .add-address {
      display: flex;
      flex-direction: column;
      gap: 5px;

      input,
      select {
        display: flex;
        max-width: 50%;
      }

      fieldset {
        margin: 10px auto;
        display: flex;
        width: 80%;
        justify-content: space-evenly;
        input {
          margin: auto 5px;
        }
      }

      button {
        display: flex;
        width: 80%;
        justify-content: center;
        margin: 10px auto;
      }
    }

    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      @include border-radius(9em);
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

    .change-password {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 100%;
      width: 80%;
      margin: 0 auto;
      justify-content: center;

      label {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        gap: 5px;
        position: relative;
      }

      fieldset {
        display: flex;
        flex-direction: column;
        padding: 2px 10px;
        margin: 5px auto;
        width: 100%;

        input {
          display: flex;
          width: auto;
        }
      }

      button {
        text-transform: uppercase;
      }

      button:disabled {
        border: double;
      }

      button:not(:disabled) {
        border: 1px solid $app-red;
        background: $app-red;
        color: $app-white;

        &:hover {
          cursor: pointer;
          scale: 1.1;
        }
      }

      input {
        width: 100%;
        background: transparent;
        padding: 3px 10px;
        border: none;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        font-size: 0.6rem;

        &.edit-mode {
          background-color: $app-gray;
          border: none;
        }
      }

      input:disabled {
        background: transparent;
      }

      button {
        background: transparent;
        padding: 3px 10px;
        border: none;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        font-size: 0.6rem;

        &.edit-mode {
          background-color: $app-gray;
          border: none;
        }
      }

      .crossed {
        position: absolute;
        width: 15px;
        right: 10px;
        top: 30px;
        transform: rotate(-45deg);
        border: 1px solid $app-black;
      }

      .password-toggle {
        height: 15px;
        position: absolute;
        right: 10px;
        z-index: 1;
        top: 22px;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .user-main-info {
      font-family: 'Orbitron', sans-serif;
      font-weight: 700;
      font-size: 0.6rem;
      width: 60%;
      color: darkred;
      background-color: transparent;
      border: none;
      display: flex;
      padding: 0 10px;

      &.edit-mode {
        background-color: $app-gray;
        border: none;
      }
    }
  }

  #blueButtons1 {
    z-index: 1;
    position: absolute;
    top: 295px;
    left: 49px;
  }

  #blueButtons2 {
    z-index: 1;
    position: absolute;
    top: 335px;
    left: 49px;
  }

  .blueButton {
    height: 35px;
    width: 45px;
    background-color: #003300;
    float: left;
    margin-right: 7px;
    @include border-radius(10px);
    background: linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -webkit-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -moz-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    background: -o-linear-gradient(top, #307bfb 0%, #0530e5 80%);
    @include box-shadow(-1px, 2px, #001c91);
  }

  #barbutton3 {
    height: 13px;
    width: 50px;
    z-index: 1;
    position: absolute;
    top: 385px;
    left: 210px;
    @include border-radius(100px);
    background: linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -webkit-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -moz-linear-gradient(top, #50fb05 0%, #057b05 100%);
    background: -o-linear-gradient(top, #50fb05 0%, #057b05 100%);
    @include box-shadow(-1px, 2px, #004200);
  }

  #barbutton4 {
    height: 13px;
    width: 50px;
    z-index: 1;
    position: absolute;
    top: 385px;
    left: 270px;
    @include border-radius(100px);
    background: linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -webkit-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -moz-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    background: -o-linear-gradient(top, #fb6505 0%, #bb0505 100%);
    @include box-shadow(-1px, 2px, #7b0000);
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
    @include border-radius(20px);
    background: radial-gradient(#ff9b5b, #fb6505);
    background: -webkit-radial-gradient(#ff9b5b, #fb6505);
    background: -moz-radial-gradient(#ff9b5b, #fb6505);
    background: -o-radial-gradient(#ff9b5b, #fb6505);
  }

  #miniButtonGlass5 {
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
    @include border-radius(20px);
    background: radial-gradient(#0abd0a, #057b05);
    background: -webkit-radial-gradient(#0abd0a, #057b05);
    background: -moz-radial-gradient(#0abd0a, #057b05);
    background: -o-radial-gradient(#0abd0a, #057b05);
  }

  #yellowBox1 {
    @include yellow-button(415px, 25px);
  }

  #yellowBox2 {
    @include yellow-button(415px, 185px);
  }

  #yellowBox3 {
    @include yellow-button(455px, 25px);
  }

  #yellowBox4 {
    @include yellow-button(455px, 185px);
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
  #pokedex {
    width: 400px;
  }

  #left {
    width: 320px;
    height: 500px;
    position: relative;
    z-index: 1;
    float: initial;
    margin: 0 auto;
  }

  #right {
    width: 320px;
    margin: 0 auto;
    float: initial;
  }

  #curve1_left {
    width: 201px;
    height: 85px;
    background-color: #8b0000;
    float: left;
    padding: 15px 0 0 15px;
    position: absolute;
    top: 0;
    left: 0;
    @include box-shadow(0, 0, #5e0000);
    @include border-bottom-right-radius(85px, 60px);
    border-bottom-right-radius: 85px 60px;
    @include border-top-left-radius(30px, 30px);
  }

  #bg_curve1_left {
    width: 400px;
    height: 80px;
    background-color: #8b0000;
    @include box-shadow(-10px, 9px, #5e0000);
    @include border-top-left-radius(30px, 30px);
  }

  #junction,
  #curve1_right,
  #curve2_right,
  #curve2_left {
    display: none;
  }
  #bg_curve1_left,
  #bg_curve2_left,
  #left,
  #bg_curve2_right {
    width: 320px;
  }

  #stats {
    left: 8px;
  }

  #barbutton3 {
    left: 180px;
  }
  #barbutton4 {
    left: 240px;
  }
  #yellowBox1,
  #yellowBox3 {
    left: 5px;
  }

  #yellowBox4,
  #yellowBox2 {
    left: 165px;
  }

  #screen {
    left: 8px;
  }
  #cross {
    top: 400px;
    left: 215px;
  }
}
</style>
