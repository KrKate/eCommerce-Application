<template>
  <div class="registration-page">
    <form>
      <div class="registration-item">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>

      <div class="registration-item">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
      </div>

      <div class="registration-item">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required>
      </div>

      <div class="registration-item">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required>
      </div>

      <div class="registration-item">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" required>
      </div>

      <div class="registration-item">
        <label for="street">Street:</label>
        <input type="text" id="street" name="street" required>
      </div>

      <div class="registration-item">
        <label for="city">City:</label>
        <input type="text" id="city" name="city" required>
      </div>

      <div class="registration-item">
        <label for="postalCode">Postal Code:</label>
        <input type="text" id="postalCode" name="postalCode" required>
      </div>

      <div class="registration-item">
        <label for="country">Country:</label>
        <input type="text" id="country" name="country" required>
      </div>


      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
@import '@/assets/styles/colors';
.registration-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

form {
  display: flex;
  margin: auto;
  font-size: 1rem;
  font-weight: 700;
  font-style: italic;
  flex-direction: column;
  align-items: left;
  gap: 10px;
  background-color: $app-gray;
  z-index: 100;
  border-radius: 20px;
  margin: 150px auto 0 auto;
  padding: 15px 30px;
  max-height: fit-content;
  min-height: 50vh;
  max-width: 800px;
}


label {
  display: block;
  margin-bottom: 5px;
  padding-right: 10px;
  flex-shrink: 0;
}

input {
  padding: 5px;
  border-radius: 8px;
  font-size: 1rem;
  flex-grow: 1;

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
}

.registration-item {
  display: flex;
}

button {
  width: 100%;
  padding: 10px;
  background-color: $app-red;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 2s ease;
  &:hover {
    font-weight: 700;
    &:active {
      transform: translateY(-1px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
