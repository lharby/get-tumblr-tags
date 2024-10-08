# Get Tumblr tags from an account
Retrieve tumblr posts and tags

#### Prerequisites 
- `nvm`
- `node`

Tested wtih node v18^

#### Running the app 

From the root exec `npx http-server`

There is an env.example.js file. Use this to populate your variables (you will need a Tumblr API Key) and then save the file as env.js in the root (everything is in the root).

You have to comment/uncomment code in the `index.html` file if you want to pass in your own tumblr account that the API should call. Otherwise it will use the default set in the `env.js` file. 

Once the app is running it will send get requests to the API, cycle through the individual posts, extract the tags and at the end of the cycle create a new unique set based on the unique filtered tags. Whilst this is processing there is a 'Loading...' text on screen. Depending on the number of posts on the blog this could take some time. You can monitor network requests in the browser console. 