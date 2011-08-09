# visibly.js - a polyfill for the Page Visibility API

visibly lets you easily establish whether a page currently being viewed in the browser is visible to the user or has been hidden by them switching to another tab. 

Creating user experiences around page visibility detection allows one to improve performance by opting to do things such as stopping data-streams/AJAX requests from being pulled should they decide to switch tabs. Data-flow can then be resumed when a user tabs back with very little visible cost to the experience. Creative uses such as pausing video streams until a user returns, changing content depending on their tab behaviour or even saving interim versions of content being written in the browser (such as with GMail) are also possibly use-cases.

The visibly polyfill wraps around the Page Visibility API defined by the W3C. Native support for the API can be found in Google Chrome 13+ and IE10PP, however if the feature is not natively supported this polyfill will provide the same functionality using the window/document focus and blur variations supported by the user's browser. My intention is to update the polyfill as per necessary as more browsers adopt the standard.


##Usage examples

###Polyfilled methods based on the official specifications

```js
//visibilityChange()
visibly.visibilitychange(function(state){
	console.log('The current visibility state is:' + state);
});

//hidden()
if(visibly.hidden()){
	console.log('the current page is hidden')
}

//visibilityState()
console.log('The current visibility state is:' + visibly.visibilityState());
```

### Performing an action when the page is visible or hidden

`visibly.onVisible(callback)` allows you to trigger a callback when a page switches from a hidden state to a visible state. Similarly `visibly.onHidden(callback)` performs the converse.

The following is an example where both the document title will be altered based on the page state and a message will be logged to the browser's console based on the same.

```js
visibly.onVisible(function () {
    console.log('page is visible');
});

visibly.onHidden(function () {
    console.log('page is hidden');
});

visibly.onVisible(function (){
	document.title = 'visible';
});

visibly.onHidden(function (){
	document.title = 'hidden';
});
```

## Other features

`visibly.isSupported()` will return `true` if browser supports the Page Visibility API natively. This currently will only test for valid support in Google Chrome/Chromium and IE10, however should other browsers implement the API using their own prefix, it's trivial to modify visibly to support these options in the future.

```js
if( visibly.isSupported() ) {
    console.log('page visibly natively supported');
}
```

## Compatibility & Size

visibly is approx. 2021 bytes (minified) and has been tested with Google Chrome 12, 13 (beta), 14 (nightly), Opera 9.5, Firefox 5.0, Firefox 4.0, Internet Explorer 8.0, 9.0 and 10PP2. I don't currently have the ability to test IE7 accurately, however I'll make a note regarding compatibility once it's been established.  

## Coming soon

I intend on adding Jasmine tests to the repo once I've stabilised how I would like the internal visibly API to be structured. It's very close to final at the moment, however there is some further optimization that can be done.

## Alternatives

An alternative to the visibly polyfill is visibility.js. This solution offers a similar set of features but for an additional 1.5KB you are also able to get time-related features should you need them. For more on this solution see: https://github.com/evilmartians/visibility.js
