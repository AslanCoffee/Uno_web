<template>
  <div>
    <router-view />
  </div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&display=swap');

li {
  list-style: none;
}

a,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: inherit;
  font-size: inherit;
}

img {
  vertical-align: top;
}

html,
body {
  height: 100%;
  font-family: 'Montserrat Alternates', sans-serif;
}

html {
  /* по умолчанию */
  /* font-size: 16px;  */
}

button {
  cursor: pointer;
}

body {
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  overflow-x: hidden;
  color: #EEE;
}

.validation-error {
  display: flex;
  position: absolute;
  transform: translate(35px, -20px);
  justify-content: center;
}

#app {
  font-family: 'Montserrat Alternates', sans-serif;
  color: #EEE;
}

[class*="__container"] {
  max-width: 1200px;
  margin: 0px auto;
  padding: 0px 15px;
}
</style>
