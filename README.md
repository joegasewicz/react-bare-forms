![ReactBareForms](images/rbf_logo3.png?raw=true "React Bare Forms")

React library to build forms & let you switch in & out Bootstrap 4 styling.

Docs are [here](https://joegasewicz.github.io/react-bare-forms/) 
## Install
```
npm install react-bare-forms
```

## Usage
A basic form example with a text input field & submit button. Also, note how imported `isFieldEmpty` function 
from `react-bare-forms`. This is a validator & can be used to validate a single or group (such as radio buttons) field(s).
There are different validators available but there is also a custom validator factor function to make is super easy tro create your own validator functions.
```typescript jsx
import {Form, isFieldEmpty, SubmitButton, TextInputField} from "react-bare-forms";

<Form
    state={this.state}
    context={this}
    bare={false}
    autoComplete="off"
    callback={() => console.log("Form submitted!")}>

    <TextInputField
        value={this.state.age}
        name="age"
        hint="Enter your age"
        labelText="Age"
        validators={[isFieldEmpty(2)]} />
               
    <SubmitButton>Submit Form</SubmitButton>
</Form>
```
## File Ref
RBF's provides a function that returns a React ref to access your file object. To use, simply assign the returned ref from
the `createFileRef` function to a variable & pass this variable to `FileField`'s ref prop. For example:
````typescript jsx
 import {createFileRef, FileField, isFile} from "react-bare-forms";

 const myFileRef = createFileRef();
 
 <FileField
     ref={myFileRef}
     hint="Must be a file"
     labelText="Upload your file"
     name="myFileTest"
     validators={[isFile()]}
 />
````
## Consumer

## Validators

## Form Fields

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
