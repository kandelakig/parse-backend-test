parse-backend-test
==================

## Configuration

add `conf.js` file with content:
```javascript
var params = {
  applicationID: <APPLICATION ID FROM YOUR PARSE ACCOUNT>,
  javascriptKey: <JAVASCRIPT KEY FROM YOUR PARSE ACCOUNT>
}
```

```cd``` into project directory and run
```bash
parse new cloudCode
```

## Test

Open `index.html` in you browser, and from your browser's javascript console run commands:
```javascript
getFullData({gcid: 'a', gcFriends: ['b', 'c'], fFriends: ['234', '111']}).then(log, err)
```
```javascript
getFullDataCloud({gcid: 'a', gcFriends: ['b', 'c'], fFriends: ['234', '111']}, {success: log, error: err})
```
