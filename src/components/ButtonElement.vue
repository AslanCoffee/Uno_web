<template>
  <div>
    <button class="button" :class="classButton" @click="click">
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    courseId: {
      type: Number,
      required: false,
    },
    classButton: {
      type: String,
      default: "",
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
button {
  display: inline-flex;
  border: none;
  padding: 13px 60px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  color: #ffffff;
  transition: all 0.3s ease 0s;
  font-size: 18px;
  font-family: "Montserrat Alternates", sans-serif;
}

.button_white:hover {
  background-color: #a09396;
}
.button_white {
  color: #373334;
}

.button_black {
  background-color: #373334;
}
</style>
