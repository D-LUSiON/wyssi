if (!String.hasOwnProperty('findSubstrWord')) {
    String.prototype.findSubstrWord = function (value) {
        if (value === '')
            return true;
        else {
            if (value.indexOf(' ') > -1) {
                value = value.split(' ');
                var val_tmp = [];
                for (var i = 0, max = value.length; i < max; i++)
                    if (value[i] !== '')
                        val_tmp.push(value[i]);
                value = val_tmp;
            }
            if (value instanceof Array)
                value = value.join('|');

            return new RegExp('(^(' + value + '))|(\\s{1,}(' + value + '))', 'gi').test(this);
        }
    };
}

String.prototype.ucfirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.lcfirst = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
};
String.prototype.minify = function () {
    return this.replace(/(\s{2,}|\n)/gi, '');
};

function parseQuery(q) {
    q = q.split('&');
    var obj = {};
    for (var i = 0; i < q.length; i++) {
        q[i] = q[i].split('=');
        obj[q[i][0]] = q[i][1];
    }
    return obj;
}
;

window.getCookies = function (cookie_name) {
    var cookies = document.cookie,
            ret = {};
    cookies = cookies.replace(/;\s/gi, ';').split(';');
    $.each(cookies, function (i, val) {
        ret[val.split('=')[0]] = val.split('=')[1];
    });
    return cookie_name ? ret[cookie_name] : ret;
};