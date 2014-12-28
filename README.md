# visibly.js

> A shim for the Page Visibility API

visibly lets you easily establish whether a page currently being viewed in the browser is visible to the user or has been hidden by them switching to another tab. 

The visibly polyfill wraps around the Page Visibility API defined by the W3C. Native support for the API can be found in all [modern](http://caniuse.com/pagevisibility) browsers based on data from caniuse.com.

# Demo

See the [demo](https://cdn.rawgit.com/addyosmani/visibly.js/master/demo.html) for a quick preview of the shim in action.

## Why care about page visibility?

Creating user experiences around page visibility detection allows one to improve performance by opting to do things such as stopping data-streams/AJAX requests from being pulled should they decide to switch tabs. Data-flow can then be resumed when a user tabs back with very little visible cost to the experience. 

Creative uses such as pausing video streams until a user returns, changing content depending on their tab behaviour or even saving interim versions of content being written in the browser (such as with GMail) are also possibly use-cases.


##Usage examples

###Polyfilled methods based on the official specifications

```js
// visibilityChange()
visibly.visibilitychange(function(state){
	console.log('The current visibility state is:' + state);
});

// hidden()
if(visibly.hidden()){
	console.log('the current page is hidden')
}

// visibilityState()
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

`visibly.isSupported()` will return `true` if browser supports the Page Visibility API natively.

```js
if(visibly.isSupported()) {
    console.log('page visibly natively supported');
}
```

## Compatibility & Size

visibly is approx. 2K (minified) and has been tested with all Chrome release channels (36+), Opera stable, Safari 7.1, Firefox stable & nightlies, Internet Explorer 8.0, 9.0 and 10PP2.

## Alternatives

An alternative to the visibly polyfill is visibility.js. This solution offers a similar set of features but for an additional 1.5KB you are also able to get time-related features should you need them. For more on this solution see: https://github.com/ai/visibilityjs
