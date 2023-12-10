# Army-Money-tracker
### Site
[Demo](https://army-money-tracker.vercel.app/)

## About the Project

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
* ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* Next.js
```sh
  npx create-next-app@latest
```
Check **No** except Tailwind CSS
If you didn't see Tailwind CSS select, follow this instruction.

* Tailwind Css
```sh
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
```
Add the paths to all of your template files in your tailwind.config.js file.
```sh
  module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
   
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
```
Add the @tailwind directives for each of Tailwind’s layers to your globals.css file.
```sh
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
```
You can run your build process with
```sh
  npm run dev
```
And stop your build process with ***Ctrl C***.
* React-icons
```sh
  npm install react-icons --save
```
Example
```sh
  import { FaBeer } from 'react-icons/fa';
  
  class Question extends React.Component {
    render() {
      return <h3> Lets go for a <FaBeer />? </h3>
    }
  }
```
