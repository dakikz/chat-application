# chat-application

Kodify Chat Application Test

Started the project on Sunday 13/3/2022 @ 15:30
Finished the project on Wednesday 16/3/2022 @ 16:40

Total hours spent approximately: 10 hours

## To run the project:

In terminal, go to client folder: cd client
npm start

Open another terminal and go to server folder: cd server
npm start

Open localhost:3000 in two different tabs/windows and log in to the app using 2 different usernames

## Implementation

- Users send and receive messages in green and grey bubbles, accordingly
- The application was build with React.JS and socket.io. I have chosen to use socket.io as I thought it will help me finish the project faster and more efficiently. Clearly, I had some implications and limitations that caused my project to become overcomplicated for no reason. If I had the chance to redo the project, I would create the websockets from scratch.
- Fully responsive
- Video background

## Commands:

/oops - Removes the messages for the person who type it / The other person receives the message '/oops'

## Features:

- (smile) and (wink) converts into a smiley and winking face
- /countdown 5 google.com , starts a visible countdown with redirection to the relevant URL
- Clicking on the message bubble, it shows sender's name and time the message was sent
- When a new message arrives, it slides in, and the messages above slide up
- When scrolling up, a scroll down button appears on the bottom right of the chat window
- Custom scrollbar
