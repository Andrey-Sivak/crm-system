export default {
    install(Vue) {
        Vue.prototype.$message = function (html) {
            window.M.toast({ html });
        };

        Vue.prototype.$error = function (text) {
            window.M.toast({
                html: `[Error]: ${text}`,
            });
        }
    }
}