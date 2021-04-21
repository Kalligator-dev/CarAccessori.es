<template>
  <div id="personal-info">
    <section>
      <transition name="rotate-form" mode="out-in">
        <form v-if="!card">
          <h2>Card Details</h2>
          <div id="card-details">
            <div class="form-input">
              <label for="full-name">Full Name *</label>
              <input
                v-model.trim="credit.name"
                @blur="validateInput('name', credit.name)"
                type="text"
                name="card-name"
                id="card-name"
                placeholder="Full Name"
                pattern="/^([\w]{2,})+\s+([\w\s]{2,})+$/i"
                maxlength="60"
                minlength="5"
                required
              />
            </div>
            <div class="form-input">
              <label for="card-num">Card Number *</label>
              <input
                v-model.trim="credit.number"
                @blur="validateInput('num', credit.number)"
                type="number"
                name="card-number"
                id="card-number"
                placeholder="Card Number"
                max="9999999999999999"
                pattern="[0-9]{16}"
                required
              />
            </div>
            <div class="form-row">
              <div class="form-input">
                <label for="card-cvc">CVC *</label>
                <input
                  v-model.trim="credit.cvc"
                  @blur="validateInput('cvc', credit.cvc)"
                  type="number"
                  name="card-cvc"
                  id="card-cvc"
                  placeholder="CVC"
                  max="999"
                  pattern="[0-9]{3}"
                  required
                />
              </div>
              <div class="form-input">
                <label for="card-num">Exp. Date *</label>
                <div class="form-row">
                  <input
                    v-model.trim="credit.expM"
                    @blur="validateInput('mon', credit.expM)"
                    class="half"
                    type="number"
                    name="card-month"
                    id="card-month"
                    placeholder="MM"
                    min="1"
                    max="12"
                    required
                  />
                  <input
                    v-model.trim="credit.expY"
                    @blur="validateInput('yr', credit.expY, credit.expM)"
                    class="half"
                    type="number"
                    name="card-year"
                    id="card-year"
                    placeholder="YY"
                    max="99"
                    min="21"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            class="half"
            :class="{ deact: !checkCard() }"
            @click.prevent="addCard"
          >
            Add Card
          </button>
          <div
            class="errs"
            v-if="invalid.yr || invalid.mon || invalid.name || invalid.num"
          >
            <p v-if="invalid.yr">
              This Card is expired. Re-check Exp Date or enter a valid card.
            </p>
            <p v-if="invalid.mon">
              Enter a valid month from 1 - 12.
            </p>
            <p v-if="invalid.name">
              Please enter a valid full name.
            </p>
            <p v-if="invalid.num">
              Card Number must be exactly 14 digits.
            </p>
            <p v-if="invalid.cvc">
              CVC must be exactly 3 digits.
            </p>
          </div>
        </form>
        <form class="form-back" v-else>
          <h5>Card added successfully</h5>
          <button class="half" @click.prevent="removeCard">
            Change card
          </button>
        </form>
      </transition>
      <transition name="rotate-form" mode="out-in">
        <form v-if="!address">
          <h2>ِAddress</h2>
          <div id="address-details">
            <div class="form-input">
              <label for="address-1">Address 1 *</label>
              <input
                v-model="addressDetails.add1"
                type="text"
                name="address-1"
                id="address-1"
                placeholder="Address 1"
                maxlength="50"
                required
              />
            </div>
            <div class="form-input">
              <label for="address-2">Address 2</label>
              <input
                v-model="addressDetails.add2"
                type="text"
                name="address-2"
                id="address-2"
                placeholder="Address 2"
                maxlength="40"
              />
            </div>
            <div class="form-row">
              <div class="form-input">
                <label for="country">Country *</label>
                <input
                  v-model="addressDetails.country"
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  minlength="2"
                  maxlength="20"
                  required
                />
              </div>
              <div class="form-input">
                <label for="zip-code">Zip Code *</label>
                <input
                  v-model="addressDetails.zip"
                  type="number"
                  name="zip-code"
                  id="zip-code"
                  placeholder="zip"
                  min="100"
                  required
                />
              </div>
            </div>
          </div>
          <button
            class="half"
            :class="{ deact: !checkAddress() }"
            @click.prevent="addAddress"
          >
            Add Address
          </button>
        </form>
        <form class="form-back" v-else>
          <h5>Address added successfully</h5>
          <button class="half" @click.prevent="removeAddress">
            Change Address
          </button>
        </form>
      </transition>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credit: {
        name: "",
        number: "",
        expM: "",
        expY: "",
        cvc: "",
      },
      addressDetails: {
        add1: "",
        add2: "",
        zip: "",
        country: "",
        city: "",
        number: "",
      },
      date: {
        year: null,
        month: null,
      },
      invalid: {},
    };
  },
  computed: {
    address() {
      return this.$store.getters["cart/address"];
    },
    card() {
      return this.$store.getters["cart/card"];
    },
  },
  methods: {
    addCard() {
      if (this.checkCard()) this.$store.dispatch("cart/setCard", this.credit);
    },
    removeCard() {
      this.$store.dispatch("cart/setCard", null);
    },
    addAddress() {
      if (this.checkAddress())
        this.$store.dispatch("cart/setAddress", this.addressDetails);
    },
    removeAddress() {
      this.$store.dispatch("cart/setAddress", null);
    },
    validateInput(label, val, secVal = null) {
      if (label == "name") {
        let regEx = new RegExp(/^([\w]{2,})+\s+([\w\s]{2,})+$/i);
        this.invalid.name = !regEx.test(val);
      }
      if (label == "num")
        val.length == 16
          ? (this.invalid[label] = false)
          : (this.invalid[label] = true);
      if (label == "cvc")
        val.length == 3
          ? (this.invalid[label] = false)
          : (this.invalid[label] = true);
      if (label == "mon") {
        +val > 0 && +val < 13
          ? (this.invalid[label] = false)
          : (this.invalid[label] = true);
        if (this.credit.expY) this.validateInput("yr", this.credit.expY, val);
      }
      if (label == "yr") {
        if (+val < this.date.year) this.invalid[label] = true;
        if (+val > this.date.year) this.invalid[label] = false;
        if (+val == this.date.year) {
          +secVal - 1 > this.date.month
            ? (this.invalid[label] = false)
            : (this.invalid[label] = true);
        }
      }
    },
    checkCard() {
      return (
        this.invalid.name !== undefined &&
        this.invalid.num !== undefined &&
        this.invalid.mon !== undefined &&
        this.invalid.yr !== undefined &&
        this.invalid.cvc !== undefined &&
        !this.invalid.name &&
        !this.invalid.num &&
        !this.invalid.mon &&
        !this.invalid.yr &&
        !this.invalid.cvc
      );
    },
    checkAddress() {
      let add1 = this.addressDetails.add1.length >= 5 ? true : false;
      let zip = this.addressDetails.zip.length >= 5 ? true : false;
      let country = this.addressDetails.country.length >= 5 ? true : false;
      return add1 && zip && country;
    },
  },
  created() {
    const date = new Date();
    this.date.year = date.getFullYear() - 2000;
    this.date.month = date.getMonth();
  },
};
</script>

<style scoped>
#personal-info {
  display: inline-block;
  position: relative;
  width: 65%;
  height: 100%;
}
section {
  margin: 1rem;
  padding: 1rem;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
form {
  width: calc(50% - 1rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  height: 90%;
  box-shadow: 0 0 3px 1px #c5d0d180;
  padding: 1rem 0;
}
.form-back {
  background: var(--col-0-t);
}
.form-input {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
}
.form-row {
  display: flex;
  justify-content: space-between;
}
.form-row .form-input {
  width: calc(50% - 1rem);
}
.half {
  width: calc(50% - 0.5rem);
  padding: 0.5rem 0.25rem;
  text-align: center;
}
button.half {
  margin-top: 1rem;
}
label {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: var(--col-6);
  opacity: 0.75;
}
input {
  width: 100%;
  border: none;
  background: var(--col-0);
  padding: 0.5rem 1rem;
  color: var(--col-6);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.errs {
  padding: 1rem;
  min-height: 10%;
  text-align: center;
  color: red;
}

h2 {
  text-align: center;
  padding: 1rem 0.25rem;
  color: var(--col-6);
  /* opacity: 0.4; */
}

.rotate-form-enter-from,
.rotate-form-leave-to {
  transform: rotateY(90deg);
}
.rotate-form-enter-active,
.rotate-form-leave-active {
  transition: all 300ms ease-in-out;
}
button {
  border: none;
  padding: 0.5rem 2rem;
  background: var(--col-6);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
}
button:hover {
  background: var(--col-5);
  color: var(--col-6);
}
.deact {
  background: #e4e4e4;
  color: #000;
  cursor: default;
}
.deact:hover {
  background: #e4e4e4;
  color: #000;
  cursor: default;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 850px) {
  #personal-info {
    padding-bottom: 2rem;
  }
  section {
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  }
  form {
    height: 100%;
    width: calc(70% - 2rem);
    margin-bottom: 1.5rem;
  }
  .form-back {
    min-height: 100%;
  }
}

@media (max-width: 740px) {
  #personal-info {
    width: 100%;
    height: 60vh;
    padding-right: 2rem;
  }
}
@media (max-width: 500px) {
  form {
    width: 100%;
  }
  .form-input {
    padding: 0.25rem 0.25rem;
  }
  .form-row .form-input {
    width: 50%;
  }
  .half {
    width: calc(50% - 0.15rem);
  }
}
</style>
