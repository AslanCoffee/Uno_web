<template>
  <div class="form-input">
    <label>{{ label }}</label>
    <input
      class="form-input__input"
      :readonly="readonly"
      :disabled="disabled"
      :class="inputClass"
      :value="value"
      @input="input"
      :type="type"
      :placeholder="placeholderInput"
    />
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholderInput: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.form-input {
  display: flex;
  flex-direction: column;
}
.form-input__input {
  width: 100%;
  font-family: "Montserrat Alternates", sans-serif;
  width: 400px;
  padding: 17px 25px;
  font-size: 20px;
  font-weight: 400;
  line-height: 19px;
  color: #212529;
  background-color: #fff;
  border-radius: 100px;
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

::placeholder {
  text-align: center;
  color: #858282;
  font-size: 20px;
  font-weight: 400;
}

.form-input__input:focus {
  color: #212529;
  outline: none;
  box-shadow: 4px 4px 45px 0px rgba(34, 60, 80, 0.2);
}
</style>
