/**
 * IBM coremetrics 参数配置
 */
(function(){
    function isArray(obj) {   
        return Object.prototype.toString.call(obj) === '[object Array]';    
    }  

    function loadFunction(list) {
        var list = isArray(list) ? list : [];
        for (var i=0; i<list.length; i++) {
            window[list[i]] = window[list[i]] || function(){};
        }
    }

    // coremetrics预定义方法
    loadFunction([
        'cmSetClientID',
        'cmCreatePageviewTag',
        'cmCreateProductviewTag',
        'cmCreateShopAction9Tag',
        'cmCreateOrderTag',
        'cmCreateRegistrationTag',
        'cmCreateElementTag',
        'cmCreateConversionEventTag'
    ]);

    // coremetrics运行环境配置对象
    window["_LVMAMA_COREMETRICS"] = window["_LVMAMA_COREMETRICS"] || {};
    /**
     * 部署环境参数: _LVMAMA_COREMETRICS.CURRENT_ENV
     *
     * 开发: DEVELOPMENT;
     * 生产: PRODUCTION;
     */
    _LVMAMA_COREMETRICS.CURRENT_ENV = 'PRODUCTION';
    _LVMAMA_COREMETRICS.ENV = {
        DEVELOPMENT: [
            '60409730',
            false,
            'testdata.cn.coremetrics.com'
        ],
        PRODUCTION: [
            '90409730',
            true,
            'data.cn.coremetrics.com'
        ]
    };
    _LVMAMA_COREMETRICS.init = function(domain) {
        cmSetClientID.apply(null, _LVMAMA_COREMETRICS.ENV[_LVMAMA_COREMETRICS.CURRENT_ENV].concat("lvmama.com"));
    }
})();
