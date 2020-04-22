![ReactBareForms](images/rbf_logo.png?raw=true "React Bare Forms")

React library to build forms with Bootstrap 4 styling.
#### Install
```
npm install react-bare-forms
```

#### Usage
```typescript jsx
    // todo
```


#### Bootstrap 4
Bootstrap 4 doesn't come with React Bare Forms so that you can obtain the smallest bundle size possible!

There are several ways to include Bootstrap 4 but here we are going to use sass:

```
    npm install bootstrap
```

Then install the loaders
```
npm install style-loader css-loader sass-loader --save-dev

# Then in your webpack.config.js:

    {
             test: /\.scss$/,
             use: [
                 "style-loader", // creates style nodes from JS strings
                 "css-loader", // translates CSS into CommonJS
                 "sass-loader" // compiles Sass to CSS, using Node Sass by default
             ]
    }
```
If you want to keep bundle sizes to a minimum, React Bare Forms only requires the following bootstrap 4 components:
- Forms
- Buttons
- Alerts

You can import them like this:
```scss
// - mystyles.scss
// Required
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

// Optional
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/alert";
@import "~bootstrap/scss/buttons";
```
And finally import your sass into your React application:

```jsx
import "./mystyles.scss";
```

Licence MIT
