# visibly.js - a polyfill for the Page Visibility API

visibly lets you easily establish whether a page currently being viewed in the browser is visible to the user or has been hidden by them switching to another tab. Creating user experiences around page visibility detection allows you to improve performance by doing things like stopping data-streams/AJAX requests from being pulled while they aren't in the current tab. You can also do things like pause videos until the user returns and so on.

This polyfill wraps around the Page Visibility API defined by the W3C. Native support for the API can be found in Google Chrome 13+ and IE10PP, however if the feature is not natively supported this polyfill will provide the same functionality using the window/document focus and blur variations supported by the user's browser.


##Usage examples

### Performing an action when the page is visible or hidden

`visibly.onVisible(callback)` allows you to trigger a callback when a page switches from a hidden state to a visible state. Similarly `visibly.onHidden(callback)` performs the converse.

Here is an example where both the document title will be altered based on the page state and a message will be logged to the browser's console based on the same.

```js
visibly.onVisible(function () {
    console.log('page is visible');
});

visibly.onHidden(function () {
    console.log('page is hidden');
});

visibly.onVisible(function (){
	document.title = 'visible';
})

visibly.onHidden(function (){
	document.title = 'hidden';
})
```

## Other features

`visibly.isSupported()` will return `true` if browser supports the Page Visibility API natively. This currently will only test for valid support in Google Chrome/Chromium and IE10, however should other browsers implement the API using their own prefix, it's trivial to modify visibly to support these options in the future.

```js
if( visibly.isSupported() ) {
    console.log('page visibly natively supported');
}
```

## Coming soon

I intend on adding Jasmine tests to the repo once I've stabilised how I would like the internal visibly API to be structured. It's very close to final at the moment, however there is some further optimization that can be done.
