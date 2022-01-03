# ChatRoom with GraphQL
Finish Basic Requirements and Some Advance features
## Installation

### In frontend/ `yarn install`

### In backend/ `yarn install`

### In backend/ `cp .env.defaults .env`
fill in MONG_URL in .env

## To Run

In the project directory, you can run:
### `yarn server`

### `yarn start` in another terminal

#### Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Advance features
1. Clear messages: 
When the clear button is clicked. All messages will be cleared in bothside of the chatbox.
2. Unseen messages:
When you're chatting with A and there's new incoming message to B's chatbox, the number of unseen messages will show on the badge of the tab control panel. 
If you switch to B'x chatbox, the badge will disappear and the unseen messages will appear below the unseen message divider.
Then, if you focus on the input row, unseen messages will merge with all messages. 
These feature is implemented in frontend, so it won't preserve if you refresh the page.

