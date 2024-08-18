/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/views/**/*.ejs", // Inclui todos os arquivos .ejs dentro de views e subpastas
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('flowbite/plugin'),
  ],
}

