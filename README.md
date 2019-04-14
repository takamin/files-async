# files-async

This module creates a file list with reading a directory recursively.
It can also callback each filename one by one.
And the callback can be async.

## INSTALL

`npm install --save files-async`

## API

See [filesAsync](./lib/files-async.js).
This is the only one function that this module exports.

## USAGE

Without a callback, the return value is an array of filename.

```javascript
const filesAsync = require("files-async");
(async ()=>{
    const list = await filesAsync(dir);
}());
```

You can receive a filename with a callback.
And the return value of the callback is pushed into the list that the method
will return.

```javascript
const filesAsync = require("files-async");
const fs = require("fs");
(async ()=>{
    const list = await filesAsync(dir,
        pathname => fs.readFileSync(pathname));
}());
```

The callback can return a Promise object.

```javascript
const filesAsync = require("files-async");
const fs = require("promise-fs");
(async ()=>{
    const list = await filesAsync(dir,
        pathname => fs.readFile(pathname));
}());
```

And also it can be async.

```javascript
const filesAsync = require("files-async");
const fs = require("promise-fs");
(async ()=>{
    const list = await filesAsync(dir,
        async pathname => ({
            pathname,
            data: await fs.readFile(pathname),
        })
    );
}());
```

## LICENSE

Copyright (c) 2019 Koji Takami

This software is released under the [MIT License](./LICENSE)
