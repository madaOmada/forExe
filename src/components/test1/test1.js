const url = require('url');
module.exports= function () {
    return url.parse(window.location.href)
}
