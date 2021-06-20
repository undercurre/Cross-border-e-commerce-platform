function Result ({ code = 1, msg = '', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

module.exports = {
    Result
}