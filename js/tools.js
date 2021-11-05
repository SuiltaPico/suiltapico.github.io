/**
 * 跳转到处理崩溃的网页并列出原因
 * @param {string} reason 崩溃的原因
 */
function crush(reason){
    location = "/pages/error.html?from="+location+"#"+reason;
}

/**
 * 读取 url 的 `?` 后面某个参数名对应的数据
 * @param {string} name 要查询的参数名
 * @returns {string | undefined} 数据，如果为 `undefined` 则没有这个参数名对应数据
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return undefined;
}

/**
 * `[min,max)`
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function randInRange(min, max) {
    return min+Math.random()*(max-min)
}