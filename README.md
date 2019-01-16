# easy2log
Simple colored logger with better performance using fs.appendFile.


* Install
```
$ npm i easy2log
```

* Usage

```javascript
const easy2log = require('easy2log');

log.info('logtext-info','test');
log.warn('logtext-warn','test');
log.info('logtext-error','test');

/*
[info] 2019-01-16 14:00:23 [test] logtext-info
[warn] 2019-01-16 14:00:23 [test] logtext-warn
[error] 2019-01-16 14:00:23 [test] logtext-error
*/

log.save() 
//save log immediately




```