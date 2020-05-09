![ReactBareForms](images/rbf_logo3.png?raw=true "React Bare Forms")

React library to build forms & let you switch in & out Bootstrap 4 styling.

Docs are [here](https://joegasewicz.github.io/react-bare-forms/) 
#### Install
```
npm install react-bare-forms
```

#### Usage
```typescript jsx
import * as ReactBareForms from "react-bare-forms";


    <ReactBareForms.Form state={this.state} formKey="myForm1">
    
        <ReactBareForms._field
            name="message"
            hint="Must be at least 5 characters long"
            label="Your Name"
            validators={[ReactBareForms.isFieldEmpty(5)]}
        ></ReactBareForms._field>
        
        <ReactBareForms.Submit>Submit</Submit>
    </ReactBareForms.Form>
```

#### Text Input _field
```typescript jsx
<TextInputField
    value={this.state.password}
    name="username"
    hint="Enter your username"
    labelText="Username"
    validators={[isFieldEmpty(5)]}
/>
```
#### Email Input _field
```typescript jsx
<EmailField
    name="email"
    value={this.state.email}
    hint="Your email"
    labelText="Please enter your email"
    validators={[isEmailValid()]}
/>
```
#### Password Input _field
```typescript jsx
<PasswordField
    name="password"
    value={this.state.password}
    labelText="Pasword"
    validators={[isFieldEmpty(5)]}
/>

<PasswordField
    name="confirmPassword"
    value={this.state.confirmPassword}
    hint="Password must match"
    labelText="Confirm Password"
    validators={[isFieldEmpty(5), areFieldsEqual("password")]}
/>
```
#### TextArea Input _field
```typescript jsx
<TextAreaField
    name="about"
    value={this.state.about}
    hint="Your email"
    labelText="Must be at least 20 characters"
    validators={[isFieldEmpty(20)]}
/>
```
#### Checkbox Input _field
```typescript jsx
<CheckBoxField
    name="terms"
    checked={this.state.terms}
    hint="Click to agree"
    labelText="Agree to terms & conditions"
/>
```

#### Radio Buttons

```typescript jsx
<RadioGroup name="group1">
    <RadioField
        name="radio1"
        checked={this.state.radio1}
        hint="Click to agree"
        labelText="Agree to terms & conditions"
    />

    <RadioField
        name="radio2"
        checked={this.state.radio2}
        hint="Click to agree"
        labelText="Agree to terms & conditions"
    />

    <RadioField
        name="radio3"
        checked={this.state.radio3}
        hint="Click to agree"
        labelText="Agree to terms & conditions"
    />
</RadioGroup>
```

#### Bootstrap 4
Bootstrap 4 doesn't come with React Bare Forms so that you can obtain the smallest bundle size possible!

There are several ways to include Bootstrap 4. the simplist (but not the best) is to import it directly from the cdn in your index.html file. For example
```html
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
``` 

But a much better way is to use Sass, so them we can choose which Bootstrap 4 Sass components we want our our React app to use.

```
    npm install bootstrap
```

Then install the loaders
```
npm install style-loader css-loader sass-loader --save-dev

# In your webpack.config.js:

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
