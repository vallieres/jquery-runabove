jquery-runabove
==========

jQuery module to access and consume the [RunAbove](https://api.runabove.com) API.

  - Simple to use
  - Well documented
  - CommonJS/AMD support
  - Compatible with jQuery 1.6 and above
  - Only 2KB minified and gzipped!

The RunAbove API Console is available [here](https://api.runabove.com/console).

This was basically a copy-paste of [jquery-ovh](https://github.com/blaryjp/jquery-ovh/) from [@blaryjp](https://github.com/blaryjp). Props to him, not me!

Installation
------------

You can download it with Bower:
```bash
$ bower install jquery-runabove --save
```
And include the script in your html:
```html
<script src="components/jquery-runabove/jquery-runabove.min.js"></script>
```


Configuration
-------------

You can access the library via the `$.ra` scope.
To use it, you need to configure the Application Key (AK) and the Application Secret (AS):

```javascript

// Set the Application Key (AK):
$.runabove.setAppKey('YOUR_APPLICATION_KEY');

// Set the Application Secret (AS):
$.runabove.setAppSecret('YOUR_APPLICATION_SECRET');

// [... other options]

```

#### Options

* **setAppKey**("AK") : Set the Application Key (AK).
* **setAppSecret**("AS") : Set the Application Secret (AS).
* setConsumerKey("CK") : Set the Consumer Key (CK).
* setBaseUrl("URL") : Set the API base URL.
* setAccessRules([{ ... }]) : Set the access rules.

The Application Key (AK) and the Application Secret (AS) is mandatory.

#### Get an Application Key (AK) and an Application Secret (AS)

In order to use the API, you need to create a third party application in RunAbove.
Go to [this link](https://api.runabove.com/createApp/), and follow the steps. It will give you an AK and an AS to use for your application.

You can find more informations [here](https://community.runabove.com/kb/en/instances/how-to-use-runabove-api.html).


Usage
-----

All functions (except 'isLogged') returns a `jqXHR` object (see [jQuery docs](https://api.jquery.com/jQuery.ajax/#jqXHR)).

Note: If you're using jQuery < 1.8, you need to use `.pipe()` in place of `.then()`, for chaining promises.

```javascript
$.runabove.get('/me').then(function (infos) {
    // Success!
    // The param contains all the datas.
}, function (error) {
    // Error!
    // The param contains the traditional jqXHR error.
});

// or

$.runabove.get('/me').done(function (infos) {
    // Success!
    // The param contains all the datas.
});
$.runabove.get('/me').fail(function (error) {
    // Error!
    // The param contains the traditional jqXHR error.
});
```

#### Functions

* **login([urlToRedirect])**
```javascript
$.runabove.login('http://www.example.com/home');
```
Log the user (request a new credential).
It will redirect the user to the RunAbove API login page.
When logged, user will be redirected to the given URL (or current location if omitted).

The token (the "Consumer Key" ("CK")) will be stored into the _localStorage_.

* **logout()**
```javascript
$.runabove.logout();
```
Log out the user (expire current credential).

* **get(url, [settings])**
* **post(url, [settings])**
* **put(url, [settings])**
* **delete(url, [settings])** (aliases: **del**, **remove**)
```javascript
$.runabove.get('/me');
$.runabove.post('/domain/zone/{zoneName}/record', {
    params : {
        zoneName  : 'example.com'    // 'zoneName' will be automatically replaced in the url!
    },
    data : {
        fieldType : 'A',
        target    : '192.168.1.1'
    }
});
$.runabove.put('/me', {
    data : {
        firstname : 'Bobobo-bo',
        name      : 'Bo-bobo'
    }
});
$.runabove.delete('/me/sshKey/{keyName}', {
    params : {
        keyName : 'mypublickey'    // 'keyName' will be automatically replaced in the url!
    }
});
```
The param `settings` is the same than jQuery.ajax() (see doc [here](https://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings)).

Note that the `done` promise returns directly the datas.

* **getSchema(schemaPath)**
```javascript
$.runabove.getSchema('/me');
```
Get specific schema from API (here "/me").

* **getModels(schemaPath, [modelsName])**
```javascript
$.runabove.getModels('/me', 'nichandle.CountryEnum');
```
Get all or a specific Models from API (here "/me", "nichandle.CountryEnum"). If second param is omitted, it returns all the Models.

* **isLogged()**
```javascript
$.runabove.isLogged();
```
Return `true` if user is connected.



Examples
--------

You can find examples in the "examples" folder.

#### 01 - simple app
A simple app with the login process, and a display of your basic account informations.

#### 02 - simple app with RequireJS
Same that the example 01, but by using the RequireJS AMD library.


License
-------

MIT


Note
----

This library is not maintained by RunAbove.
