# Review Questions

## What is Node.js?
Node.js is an open  source server environment which can handle API requests to communicate between websites and servers.
It runs asynchronously.
## What is Express?
Express is a web framework for Node.js it has middleware API calls and all kinds of web framework features.
## Mention two parts of Express that you learned about this week.
Routing and middleware support. We've used middleware like cors and body-parser
## What is Middleware?
middleware is generally like pieces of code that sit in the middle of various processes, but in this context, middleware can interrupt http requests to perform some action (like transform elements within an array) and pass along to either the next middleware or let the request get fulfilled. 
## What is a Resource?
In the REST architectural style everything is a resource accessible through a unique URI.
## What can the API return to help clients know if a request was successful?
Usually the success of this process is self evident but an api can return a successful response if necessary.
## How can we partition our application into sub-applications?
You can mount other express apps with .use()
## What is express.json() and why do we need it?
To be able to read data from the request body because otherwise express wouldn't add objects to the body.
