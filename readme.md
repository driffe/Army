# This is Project in army
### Studying Next.js 

### Setup development environment
------------
Installing Next.js in terminal  
**npx create-next-app@latest --experimental-ap**

Then open package.json, change the version of "next"  

    "dependencies": {
        "next": "13.2.4",
        "react": "18.2.0",
        "react-dom": "18.2.0"
    }  

Use **npm install** for installing package.json

### Undestanding the contents
------------
#### page.js
+ main page
+ using React grammar
+ run main page with **npm run dev**

#### layout.js
+ containing page.js
    + ex: head or upper menu

#### gobals.css
+ styling all pages

#### page.module.css
+ styling specfic page(s)

#### node_modules
+ store all installed libraries

#### public
+ store files except src 
    + ex: img, font