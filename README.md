# progress-request
Get urls data with displaying progress bar on the command line

# usage
## callback mode
```
var progressRequest = require('progress-request');

progressRequest("https://www.google.com" , function(e, r){
  if(e){
    console.error(e);
  }
  console.log(r);
});
```

## promise mode
```
var progressRequest = require('progress-request');

progressRequest("https://www.google.com").then(function(r) {
  console.log(r);
}).catch(function() {
  console.error(e);
})
```
