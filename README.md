This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [mY Github](https://github.com/M-ower/CMPS460.Ghaith).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.(DONE)

Module 3 - Event Registration App
Description

For Module 3, I built an Event Registration application using React Native. The app lets the user enter their name, choose how many guests they want to bring, and register for the Mobile Development Workshop.

I used React Native components, props, state, TextInput, buttons, conditional rendering, and styling for this project.

What the App Does
Lets the user enter their name
Shows the event name and type
Lets the user add a guest
Lets the user remove a guest
Keeps the guest number from going below 1
Lets the user register
Shows a registration confirmation after registering
Shows the user's name, event, and number of guests
Components

I used two functional components in the application.

App

The App component is the main part of the application. It contains the registration form, guest buttons, register button, and the registration information.

EventInfo

The EventInfo component is used to show the event information. I used props to pass the event name and event type into this component.

<EventInfo
  name="Mobile Development Workshop"
  type="React Native Event"
/>

The name and type values are the props being passed to the component.

State

I used useState to keep track of information that changes in the app.

I have three pieces of state:

name keeps track of the name entered by the user.
guests keeps track of the number of guests.
registered keeps track of whether the user registered.
const [name, setName] = useState('');
const [guests, setGuests] = useState(1);
const [registered, setRegistered] = useState(false);
TextInput

I used a TextInput so the user can enter their name.

<TextInput
  placeholder="Enter your name"
  value={name}
  onChangeText={setName}
/>
Buttons

The app has three buttons.

- Guest removes a guest.
+ Guest adds a guest.
Register registers the user.

The guest count starts at 1 and cannot go below 1.

Conditional Rendering

I used conditional rendering to show the registration message.

The Registration Complete! message does not show when the app first opens. It appears after the user enters their name and presses the Register button.

{registered && (
  <View>
    <Text>Registration Complete!</Text>
  </View>
)}
Styling

I used StyleSheet from React Native to style the application. I added styling for the title, event information, text input, buttons, and registration confirmation.

How to Run the App
Step 1: Start Metro

Metro is the JavaScript build tool used by React Native.

From the root of the project, I can start Metro with:

npm start
Step 2: Build and Run the Android App

After Metro is running, open another terminal in the project folder and run:
npm run android

I also used this command to build and run my application:

npx react-native run-android

The application was tested using the Android Emulator with my Pixel 10 virtual device.

Step 3: Make Changes

The main file for the application is App.tsx.

When changes are made and saved, React Native can update the application using Fast Refresh. This makes it easier to see changes without having to completely restart the application every time.

Testing

I tested the application on the Android Emulator.

I tested the following:

Entering my name
Adding guests
Removing guests
Making sure the guest count does not go below 1
Registering for the event
Checking that the registration confirmation appears
Checking that the name, event, and guest number are displayed correctly
What I Learned

In this module, I learned more about how React Native applications use components, props, and state. I also practiced using useState, TextInput, buttons, conditional rendering, and React Native styling.

The EventInfo component helped me understand how props can be used to pass information from one component to another. The state allowed the application to respond to the user's actions and update the screen.