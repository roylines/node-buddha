# buddha

_buddha_ is a [node](http://nodejs.org) interface into zendesk.

[![Build Status](https://secure.travis-ci.org/roylines/node-buddha.png)](http://travis-ci.org/roylines/node-buddha)

## Installation

    npm install buddha

## Usage
```js
var buddha = require('../lib/buddha.js');

buddha.setCredentials('helpdesk.zendesk.com', 'agentemail', 'password');

buddha.getTickets('12345678', 1, function(error, data) {
  console.log(data);
});
```

## Methods

### setCredentials

Set authentication details for subsequent calls.
All communication uses https.

For the [zendesk example](http://www.zendesk.com/support/api/rest-introduction) this would be:

```js

buddha.setCredentials('helpdesk.zendesk.com', 'agentemail', 'password');

```

### resetCredentials

Remove the current credentials meaning all subsequent calls will fail.

```js

buddha.resetCredentials();

```

### setOnBehalfOf

Used to perform actions on behalf of another user.

```js

buddha.setOnBehalfOf('joe.enduser@theendusers.com');

```

### getUsers

Get a list of users.

```js

buddha.getUsers(function(e, d) {
  ...
});

```

### getTickets

Get a page of tickets for a view:

```js

buddha.getTickets(1234567, 1, function(e, d) {
  ...
});

```

### getTicketCount

Get a count of all tickets in a view:

```js

buddha.getTicketCount(1234567, function(e, d) {
  ...
});

```
