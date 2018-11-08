<script>

    export default {
        data() {
            return {

            };
        },
        watch: {
        },
        methods: {

            // 格式化时间
            formatDate(params) {
                return this.Utils.formatDate(new Date(params), "yyyy-MM-dd hh:mm:ss");
            },

            // 获取当地时间
            getLocalDate(time) {
                return this.Utils.getLocalDate(time);
            },

            // message 信息提示
            msgSuccess(message) {
                this.$message.success({
                    message: message
                });
            },

            msgError(message) {
                this.$message.error({
                    message: message
                });
            },

            msgWarning(message) {
                this.$message.warning({
                    message: message
                });
            },

            msgInfo(message) {
                this.$message.info({
                    message: message
                });
            },

            // 表单验证未通过
            validWarning() {
                this.msgWarning("请检查您的输入");
            },

            // 请求失败
            sysError(error) {
                switch (error.response && error.response.status) {
                    case 500:
                        this.msgError('系统错误, 请稍候再试');
                        break;
                    case 504:
                        this.msgError(error.response ? `请求失败:${error.response.statusText}` : `请求失败,请稍候再试`);
                        break;
                    case 404:
                        this.msgError('未找到该请求,请稍候再试');
                        break;
                    case 401:
                        this.Utils.removeCookies("__token__");
                        this.msgError('登录已失效, 请重新登录');
                        this.$router.replace({
                            path: "/login",
                            query: {
                                redirect: this.$router.currentRoute.fullPath
                            }
                        });
                        break;
                    default:
                        this.msgError(error.response ? `请求失败:${error.response.message}` : `请求错误, 请稍候再试` + error);
                }

                // this.msgError("系统错误: " + err);
            },

            // 请求返回后的回调处理
            handleRes(res, show, message = '操作成功') {
                if (res.result.code === 0 || res.result.code == "SUCCESS") {
                    if (show) {
                        this.msgSuccess(message);
                    }
                    return true;
                } else {
                    if (show) {
                        this.msgError(res.result.msg);
                    }
                    return false;
                }
            }
        },
        created() {
        },
    };
</script>

<style>
</style>
