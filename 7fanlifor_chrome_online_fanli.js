(function() {

    window.onload = function() {
        var v = "4.3.5";
        var loginUrl = "http://www.7fanli.com/seven/auth/isLogin"; //登陆状态
        // var getAuctionDetailUrl = "https://pub.alimama.com/items/search.json?toPage=1&perPagesize=40&q=http://item.taobao.com/item.htm"; //查询商品返利信息
        var getShopDetailUrl = "https://api.tk.7fanli.com/getShopCode"; //查询店铺返利信息
        var getTaokeApi = "https://api.tk.7fanli.com/getTkdata";
        var loginLocUrl = "https://7fanli.com/fanliht/login.html"; //登陆入口
        var selectUserUrl = "https://7fanli.com:8443/Seven/al/selectUser.do"; //查询用户信息
        // var getTaskItemIdUrl = "https://api.tk.7fanli.com/plug/item"; //接收任务，需要查询的商品ID
        // var postTtemResUrl = "https://api.tk.7fanli.com/plug/itemRes"; //查询完毕数据后返回
        //var getItemUrl = "https://api.tk.7fanli.com/v2/getItem"; //查询商品返利金 比率 券     参数：商品id和channelid=0
        var getItemUrl = "http://120.27.140.213:8888/sevenTransfer/transfer.do"; //新转链接口 平台淘宝
        var jd_getItemUrl = "http://120.27.140.213:8888/sevenjdTransfer/transfer.do"; //转链接口 平台京东
        var Qccode = "http://www.7fanli.com/seven/share/getPcItemQr"; //返利二维码
        var collecturl = "http://www.7fanli.com/seven/store/addStoreAuction"; //收藏商品
        var deletecollecturl = "http://tk.7fanli.com:8080/Seven/al/deleteStoreAuction.do" //删除商品,没用
        var verifyCollection = "http://www.7fanli.com/seven/store/isStored"; //验证是否收藏了该商品
        var fanlisetting = "http://www.7fanli.com/setting.html";//插件设置页面

        var postTtemResItemId = "";
        var item_show_rate = "";
        var isSuccess = true;
        var itemPrice = "";
        var ali_trackid_mid;

        var isLogin = false;
        var userName = "";
        var isChaoshi = false;
        var isJu = false;
        var isfliggy = false;
        var isMeal = false;
        var isItem = false;
        var isShop = false;
        var itemIsMall = false;
        var itemIsC = false;

        var itemId = "";
        var itemUrl = "";
        var shopId = "";
        var userId = "";
        var shopUrl = "";
        var shopName = "";
        var mealId = "";
        var user_id = "";

        var sellerId = "";
        var mealUrl = "";

        var needReBuild = false;
        var hasGuide = false;

        var items = new Array();

        var siteId = "";
        var channelId = "";
        var adzoneId = "";

        var openFanli = "";
        var taokeUrl = "";
        var clickUrl = "";
        var hasFanli = false;

        var fanliPrice = 0;
        var fanliRate = 0;
        var eventFanliPrice = 0;
        var eventFanliRate = 0;
        var couponInfo = "";
        var couponStartFee = 0;
        var couponAmount = "";

        var IX = 0;
        var itemAmountPrice = 0;

        var memberId = "";
        var price = 0;
        var newMid = [];

        var fingerCode = "";
        var inFanli = "no";
        var pos = "leftm";
        var aitao = "open";

        var ismobile = false;

        var loginname = "";
        var photo = "";
        var balance = 0;
        var unused = 0;
        var order = 0;
        var total = 0;
        var Qc_url = "";
        var collectstyle = "";
        var collectstyle2 = "";
        var iscollect = false;
        var isRefresh = false; //判断是否刷新
        var isPlatform = true; //判断平台

        if (location.href.indexOf("buyertrade.taobao.com") != -1) {
            return;
        }
        //common func

        // sendMes(function(res) {
        //     console.log("图片加载执行");
        // }, "http://t.cn/EwPfDVY", "");

        function isJson(obj) {

            if (obj.indexOf("{") == 0) {
                return true;
            } else {
                return false;
            }
        }

        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        }

        function bin2hex(str) {
            var result = "";
            for (i = 0; i < str.length; i++) {
                result += int16_to_hex(str.charCodeAt(i));
            }
            return result;
        }

        function int16_to_hex(i) {
            var result = i.toString(16);
            var j = 0;
            while (j + result.length < 4) {
                result = "0" + result;
                j++;
            }
            return result;
        }

        function fpCode() {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var txt = 'http://www.7fanli.com/';
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "tencent";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.fillText(txt, 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText(txt, 4, 17);
            var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
            var bin = atob(b64);
            var crc = bin2hex(bin.slice(-16, -12));
            fingerCode = crc;
        }

        //
        function sayMes(status, info, data) {
            var text = "";
            var text_2 = "";
            var url = "";
            var link_text = "";
            var link_text_no = "";
            var bg_height = "";
            var bg_width = "";
            var target = "";
            var textflag = ""; //1表示一般显示文案的正常格式，2表示文案前带图标；
            var btnflag = ""; //0表示没有按钮，1表示绿色按钮，2表示橙色按钮
            var shareflag = 0; //0表示不显示分享，1表示显示分享按钮
            var taokeTips = "";
            var obj = document.getElementById("tc_left");
            var obj_m = document.getElementById("tc_left_m");

            if (obj) { obj.innerHTML = ""; } else { obj_m.innerHTML = ""; }

            switch (status) {
                case "notaoke":
                    text = "暂未开通<span style='color:#4daa00'>返现金</span>权限";
                    text_2 = "暂未开通<span style='color:#4daa00'>返现金</span>权限"
                    url = "http://pub.alimama.com/myunion.htm";
                    link_text = "立即开通";
                    bg_width = "6px";
                    bg_height = "-303px";
                    target = "_blank";
                    textflag = "1";
                    btnflag = "1";
                    taokeTips = "开通返现金，比集分宝多返一倍"
                    shareflag = 0;
                    break;
                case "logmm":
                    text = "";
                    text_2 = "";
                    url = loginLocUrl;
                    link_text = "登录返现金";
                    bg_width = "6px";
                    bg_height = "-340px";
                    target = "_blank";
                    textflag = "1";
                    btnflag = "1";
                    taokeTips = "";
                    shareflag = 0;
                    break;
                case "notfinish":
                    text = "没有完善<span style='color:#4daa00'>返现金</span>权限";
                    text_2 = "没有完善<span style='color:#4daa00'>返现金</span>权限";
                    url = "http://pub.alimama.com/myunion.htm";
                    link_text = "点此完善";
                    bg_width = "6px";
                    bg_height = "-303px";
                    target = "_blank";
                    textflag = "1";
                    btnflag = "1";
                    taokeTips = "开通返现金，比集分宝多返一倍";
                    shareflag = 0;
                    break;
                case "rebuild":
                    text = "返利账户遇到问题";
                    text_2 = "返利账户遇到问题";
                    url = "http://7fanli.com/rebuild.html";
                    link_text = "点此修复";
                    bg_width = "6px";
                    bg_height = "-303px";
                    target = "_blank";
                    textflag = "1";
                    btnflag = "1";
                    taokeTips = "";
                    shareflag = 0;
                    break;
                case "nofanli":
                    if (isShop) {
                        text = "打开任意商品查询佣金";
                        text_2 = "打开任意商品查询佣金";
                    } else {
                        text = "啊哦，这个宝贝没有返利";
                        text_2 = "啊哦，这个宝贝没有返利";
                    }
                    url = "javascript:void(0)";
                    link_text = "";
                    bg_width = "6px";
                    bg_height = "-504px";
                    target = "_self";
                    textflag = "1";
                    btnflag = "0";
                    taokeTips = "";
                    shareflag = 0;
                    break;
                case "aitaobao":
                    text = "已进入返利模式";
                    text_2 = "已进入返利模式";
                    var anodes = document.getElementsByTagName("a");
                    for (var i in anodes) {
                        if (anodes[i].className == "right-btn") {
                            url = anodes[i].href;
                            break;
                        }
                    }

                    link_text = "立即购买";
                    bg_width = "6px";
                    bg_height = "-504px";
                    target = "_self";
                    textflag = "1";
                    btnflag = "1";
                    taokeTips = "";
                    shareflag = 1;
                    // 获取窗口宽度
                    var winWidth = 0;
                    var winHeight = 0;
                    if (window.innerWidth)
                        winWidth = window.innerWidth;
                    else if ((document.body) && (document.body.clientWidth))
                        winWidth = document.body.clientWidth;
                    // 获取窗口高度
                    if (window.innerHeight)
                        winHeight = window.innerHeight;
                    else if ((document.body) && (document.body.clientHeight))
                        winHeight = document.body.clientHeight;
                    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
                    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                        winHeight = document.documentElement.clientHeight;
                        winWidth = document.documentElement.clientWidth;
                    }

                    if (url != "" && aitao == "open") {
                        var loading = document.createElement("div");
                        loading.id = "layerlayerlayer";
                        loading.style.cssText = "background:#fff;width:" + winWidth + "px;height:" + winHeight + "px;position:absolute;z-index:2147483647;top:0px;opacity:.9;";
                        //loading.innerHTML='<div style="margin:auto;margin-top:250px;width:400px;text-align:center;color:#675667;font-size:18px;opacity:1;"><div style="background:url(http://img.7fanli.com/monilsls.gif) no-repeat;height:176px;width:128px;margin-left:120px;opacity:1;"></div><div style="line-height:30px;opacity:1;">伦家很努力在跑了啦，再等我下下~</div></div>';
                        document.getElementsByTagName("body")[0].appendChild(loading);
                        var lodingcont = document.createElement("div");
                        lodingcont.style.cssText = "top:" + (winHeight - 400) / 2 + "px;width:400px;left:" + (winWidth - 400) / 2 + "px;text-align:center;color:#675667;font-size:18px;opacity:1;position:absolute;z-index:2147483647;"
                        lodingcont.innerHTML = '<div style="background:url(https://img.alicdn.com/imgextra/i3/380087440/TB24ErIhXXXXXcgXpXXXXXXXXXX-380087440.gif) no-repeat;height:176px;width:128px;margin-left:120px;opacity:1;"></div><div style="line-height:30px;opacity:1;">伦家很努力在跑了啦，再等我下下~</div>';
                        document.getElementsByTagName("body")[0].appendChild(lodingcont);
                        var lodingcont = document.createElement("div");
                        self.location = url;
                    }
                    break;
                case "congratulations":
                    collectstyle = "margin-right: 10px;padding: 5px 10px;background:#018203 url(http://www.7fanli.com/collect_imgon.png)no-repeat 10px;color: #fff;padding-left: 30px;text-decoration: none;cursor: pointer;";
                    collectstyle2 = "margin-right: 10px;padding: 5px 10px;background:#018203 url(http://www.7fanli.com/collect_img.png)no-repeat 10px;color: #fff;padding-left: 30px;text-decoration: none;cursor: pointer;";
                    if (ali_trackid_mid && isLogin) {
                        //运行
                        if (isShop) {
                            text = "店铺平均返利 " + fanliRate + " %";
                            text_2 = "店铺平均返利<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliRate + "</span> %";
                        } else {

                            // if (clickUrl && !isSuccess) {
                            //     text += "  <a style='color:#68BE00;font-weight:bold' target='_blank' href='" + clickUrl + "'>点此领内部优惠券</a>";
                            //     text_2 += "  <a style='color:#68BE00;font-weight:bold' target='_blank' href='" + clickUrl + "'><span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>点此领内部优惠券</span></a>";
                            // }

                            if (couponInfo != "无") {
                                if (!info) {
                                    text = "扫码购买赚" + fanliPrice + " 元<span style='color:#68BE00;font-weight:bold'> " + couponInfo + "</span><div style='text-align:center;'><a class='collect_R_taobao' style='" + collectstyle + "'>点击收藏</a><a href='http://7fanli.com/fanliht/pc/dist/index.html#/collectDetail' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                    text_2 = "扫码购买赚<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliPrice + "</span> 元<span style='color:#68BE00;font-weight:bold'><span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'> " + couponInfo + "</span></span><div style='text-align:center;'><a class='collect_R_taobao' style='" + collectstyle + "'>点击收藏</a><a  href='http://7fanli.com/fanliht/pc/dist/index.html#/collectDetail' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                } else {
                                    text = "已进入赚钱模式，购买可赚" + fanliPrice + " 元<span style='color:#68BE00;font-weight:bold'> " + couponInfo + "</span><div style='text-align:center;'><a class='already_collect' style='" + collectstyle2 + "'>已收藏</a><a  href='http://7fanli.com/fanliht/pc/dist/index.html#/collectDetail' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                    text_2 = "已进入赚钱模式，购买可赚<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliPrice + "</span> 元<span style='color:#68BE00;font-weight:bold'><span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'> " + couponInfo + "</span></span><div style='text-align:center;'><a class='already_collect' style='" + collectstyle2 + "'>已收藏</a><a href='http://7fanli.com/fanliht/pc/dist/index.html#/collectDetail' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                }

                            }
                        }

                        // url = "javascript:void(0)";
                        // link_text = ""; //link_text = "继续购物"
                        // bg_width = "6px";
                        // bg_height = "-504px";
                        // target = "_self";
                        // textflag = "2";
                        // btnflag = "0";
                        // taokeTips = "";
                        // shareflag = 1;
                        // sendInfo(function(data) {}, "set", shopId + "| " + itemId);
                        bg_width = "6px";
                        bg_height = "-380px";
                        textflag = "1";
                        btnflag = "2";
                        taokeTips = "";
                        shareflag = 1;

                    } else if (isLogin) {
                        if (isShop) {
                            text = "店铺平均返利 " + fanliRate + " %";
                            text_2 = "店铺平均返利<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliRate + "</span> %";
                        } else {
                            if (couponInfo != "无") {
                                if (!info) {
                                    text = "扫码购买赚" + fanliPrice + " 元<span style='color:#68BE00;font-weight:bold'> " + couponInfo + "</span><div style='text-align:center;'><a class='collect_R_taobao' style='" + collectstyle + "'>点击收藏</a><a href='http://7fanli.com/fanliht/pc/dist/index.html#/collectDetail' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                    text_2 = "扫码购买赚<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliPrice + "</span> 元<span style='color:#68BE00;font-weight:bold'><span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'> " + couponInfo + "</span></span><div style='text-align:center;'><a class='collect_R_taobao' style='" + collectstyle + "'>点击收藏</a><a  href='http://7fanli.com/fanliht/pc/dist/index.html#/collectDetail' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                } else {
                                    text = "已收藏，去收藏夹购买可赚" + fanliPrice + " 元<span style='color:#68BE00;font-weight:bold'> " + couponInfo + "</span><div style='text-align:center;'><a class='already_collect' style='" + collectstyle2 + "'>已收藏</a><a href='http://7fanli.com/fanliht/pc/dist/index.html#/collectDetail' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                    text_2 = "已收藏，去收藏夹购买可赚<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliPrice + "</span> 元<span style='color:#68BE00;font-weight:bold'><span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'> " + couponInfo + "</span></span><div style='text-align:center;'><a class='already_collect' style='" + collectstyle2 + "'>已收藏</a><a href='http://7fanli.com/fanliht/pc/dist/index.html#/collectDetail' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                }

                            }
                        }

                        bg_width = "6px";
                        bg_height = "-380px";
                        textflag = "1";
                        btnflag = "2";
                        taokeTips = "";
                        shareflag = 1;

                    } else {
                        if (isShop) {
                            text = "店铺平均返利 " + fanliRate + "%，买~";
                            text_2 = "店铺平均返利<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliRate + "</span>%，买~";

                        } else {

                            // if (clickUrl && !isSuccess) {
                            //     text += "  <a style='color:#68BE00;font-weight:bold' target='_blank' href='" + clickUrl + "'>点此领内部优惠券</a>";
                            //     text_2 += "  <a style='color:#68BE00;font-weight:bold' target='_blank' href='" + clickUrl + "'><span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>点此领内部优惠券</span></a>";
                            // }

                            if (couponInfo != "无") {
                                //领取优惠券
                                if (!isRefresh) {
                                    text = "扫码购买赚 " + fanliPrice + " 元<span style='color:#68BE00;font-weight:bold'> " + couponInfo + "</span><div style='text-align:center;'><a class='refresh'  href='http://7fanli.com/fanliht/login.html' target='_blank' style='" + collectstyle + "'>点击收藏</a><a class='refresh' href='http://7fanli.com/fanliht/login.html' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                    text_2 = "扫码购买赚<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliPrice + "</span>元<span style='color:#68BE00;font-weight:bold'><span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'> " + couponInfo + "</span></span><div style='text-align:center;'><a class='refresh' href='http://7fanli.com/fanliht/login.html' target='_blank' style='" + collectstyle + "'>点击收藏</a><a class='refresh' href='http://7fanli.com/fanliht/login.html' target='_blank' style='padding: 5px 10px;background-color: #72d100;color: #fff;text-decoration: none;cursor: pointer;'>去收藏夹购买</a></div>";
                                } else {
                                    text = "扫码购买赚 " + fanliPrice + " 元<span style='color:#68BE00;font-weight:bold'> " + couponInfo + "</span><div style='text-align:center;'><a onclick='this.href=\"#\";location.reload();return false;' style='padding:5px 25px;background-color:#ff9600;color:#fff;text-decoration:none;cursor:pointer;'>刷新</a></div>";
                                    text_2 = "扫码购买赚<span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'>" + fanliPrice + "</span>元<span style='color:#68BE00;font-weight:bold'><span style='width:70px;position: relative;white-space: nowrap;word-break: normal;display: block;text-align: center;margin-left: -27px;line-height:18px;'> " + couponInfo + "</span></span><div style='text-align:center;'><a onclick='this.href=\"#\";location.reload();return false;' style='padding:5px 25px;background-color:#ff9600;color:#fff;text-decoration:none;cursor:pointer;'>刷新</a></div>";
                                }
                            }
                        }


                        if (!isLogin) {
                            url = loginLocUrl;
                            link_text = "登录启动返利模式";
                            target = "_blank";
                        } else {
                            url = openFanli;
                            link_text = "启动返利模式";
                            target = "_self";
                        }

                        bg_width = "6px";
                        bg_height = "-380px";
                        textflag = "1";
                        btnflag = "2";
                        taokeTips = "";
                        shareflag = 1;
                    }

                    break;
                case "notFanli":
                    if (document.getElementById("taoke_dialog")) {
                        document.getElementById("taoke_dialog").style.display = "none";
                    }

                    if (document.getElementById("taoke_dialog_m")) {
                        document.getElementById("taoke_dialog_m").style.display = "none";

                    }
                    break;
                default:
                    text = "发生未知错误";
                    text_2 = "发生未知错误";
                    url = "mailto:service@7fanli.com";
                    link_text = "点此反馈";
                    bg_width = "6px";
                    bg_height = "-380px";
                    target = "_target";
                    textflag = "1";
                    btnflag = "1";
                    taokeTips = "";
                    shareflag = 0;


            }




            var ml_taoke_7fanli = pos == "leftm" ? "60px" : "-120px";
            var img_taoke_7fanli = pos == "leftm" ? "https://img.alicdn.com/imgextra/i4/380087440/TB23nrUhXXXXXXcXpXXXXXXXXXX-380087440.png" : "https://img.alicdn.com/imgextra/i3/380087440/TB2.Gf7hXXXXXbiXXXXXXXXXXXX-380087440.png";
            var img_ml_7fanli = pos == "leftm" ? "-6px" : "128px";
            var addtips_h = taokeTips != "" ? '<div id="tips_7fanli" style="display:none;margin-left:20px;position: absolute;margin-top:-30px;"><div style="background: url(https://img.alicdn.com/imgextra/i2/380087440/TB2Z6v5hXXXXXbCXXXXXXXXXXXX-380087440.png) repeat-x;height: 24px;line-height: 24px;font-size: 14px;padding: 0 10px;border-radius: 2px;color: #fff;">' + taokeTips + '</div><span style="background: url(https://img.alicdn.com/imgextra/i4/380087440/TB25obZhXXXXXczXXXXXXXXXXXX-380087440.png) no-repeat;display: block;height: 5px;width: 10px;margin-left: 130px;"></span></div>' : "";
            var addtips_s = taokeTips == "" ? "" : '<div id="tips_7fanli_m" style="display:none;position: absolute;text-align:left;margin-left:' + ml_taoke_7fanli + '"><span style="background: url(' + img_taoke_7fanli + ') no-repeat;display: block;height: 10px;width: 6px;margin-left:' + img_ml_7fanli + ';top: 20px;position: relative;"></span><div style="background: url(https://img.alicdn.com/imgextra/i2/380087440/TB2Z6v5hXXXXXbCXXXXXXXXXXXX-380087440.png) repeat;line-height: 20px;font-size: 14px;padding: 5px 10px;border-radius: 2px;color: #fff;width: 108px;word-wrap: break-word;white-space: normal;">' + taokeTips + '</div></div>';
            var clickStr = "";
            if (status == "logmm" || status == "notfinish" || status == "notaoke") {
                clickStr = 'onclick="if(this.innerText==\'刷&nbsp;&nbsp;新\'){this.href=\'#\';location.reload();return false;}else{this.innerText=\'刷&nbsp;&nbsp;新\';}"';
            }

            //var fanliout = "padding-right:20px;padding-left:20px;font-size:14px;color:#fff;background:#4daa00;display:inline-block;height:30px;line-height:30px;border-radius:2px;text-decoration: none;";
            var fanliout = "width:90px;height:90px;position:absolute;top:-20px;";
            var fanliover = "padding-right:20px;padding-left:20px;font-size:14px;color:#fff;background:#57c000;display:inline-block;height:30px;line-height:30px;border-radius:2px;text-decoration: none;";
            var fanliouty = "padding-right:20px;padding-left:20px;font-size:14px;color:#fff;background:#ff7e00;display:inline-block;height:30px;line-height:30px;border-radius:2px;text-decoration: none;";
            var fanliovery = "padding-right:20px;padding-left:20px;font-size:14px;color:#fff;background:#ff9c00;display:inline-block;height:30px;line-height:30px;border-radius:2px;text-decoration: none;";

            var fanliout_m = "margin-left:20px;overflow: hidden;white-space:normal;word-wrap:break-word;width:12px;padding-left:9px;padding-right:9px;padding-top:20px;padding-bottom:20px;font-size:14px;color:#fff;background:#4daa00;display:inline-block;line-height:14px;border-radius:2px;text-decoration: none;";
            var fanliover_m = "margin-left:20px;overflow: hidden;white-space:normal;word-wrap:break-word;width:12px;padding-left:9px;padding-right:9px;padding-top:20px;padding-bottom:20px;font-size:14px;color:#fff;background:#57c000;display:inline-block;line-height:14px;border-radius:2px;text-decoration: none;";
            var fanliouty_m = "margin-left:20px;overflow: hidden;white-space:normal;word-wrap:break-word;width:12px;padding-left:9px;padding-right:9px;padding-top:20px;padding-bottom:20px;font-size:14px;color:#fff;background:#ff7e00;display:inline-block;line-height:14px;border-radius:2px;text-decoration: none;";
            var fanliovery_m = "margin-left:20px;overflow: hidden;white-space:normal;word-wrap:break-word;width:12px;padding-left:9px;padding-right:9px;padding-top:20px;padding-bottom:20px;font-size:14px;color:#fff;background:#ff9c00;display:inline-block;line-height:14px;border-radius:2px;text-decoration: none;";

            // var htmltext = btnflag == "0" ? "" : btnflag == "1" ? addtips_h + "<a href='" + url + "' style='" + fanliout + "' onmouseover='this.style.cssText=\"" + fanliover + "\";document.getElementById(\"tips_7fanli\").style.display=\"block\";' onmouseout='this.style.cssText=\"" + fanliout + "\";document.getElementById(\"tips_7fanli\").style.display=\"none\"' " + clickStr + " target='" + target + "'>" + link_text + "</a>" : isLogin ? "<a id='startFanli' href='javascript:;' style='" + fanliouty + "' onmouseover='this.style.cssText=\"" + fanliovery + "\"' onmouseout='this.style.cssText=\"" + fanliouty + "\"' " + clickStr + " target='" + target + "'>" + link_text + "</a>" : "<a onclick='if(this.innerText==\"刷&nbsp;&nbsp;新\"){this.href=\"#\";location.reload();return false;}else{this.innerText=\"刷&nbsp;&nbsp;新\"}' href='" + loginLocUrl + "?v="+ v +"' target='_blank' style='" + fanliouty + "' onmouseover='this.style.cssText=\"" + fanliovery + "\"' onmouseout='this.style.cssText=\"" + fanliouty + "\"' " + clickStr + " target='" + target + "'>" + link_text + "</a>";

            if (isShop) {
                var htmltext = "";
                var htmltext_m = "";
            } else {
                //var htmltext = btnflag == "0" ? "" : btnflag == "1" ? addtips_h + "<a href='" + url + "' style='" + fanliout + "' onmouseover='this.style.cssText=\"" + fanliover + "\";document.getElementById(\"tips_7fanli\").style.display=\"block\";' onmouseout='this.style.cssText=\"" + fanliout + "\";document.getElementById(\"tips_7fanli\").style.display=\"none\"' " + clickStr + " target='" + target + "'>" + link_text + "</a>" : "<a onclick='if(this.innerText==\"刷&nbsp;&nbsp;新\"){this.href=\"#\";location.reload();return false;}else{this.innerText=\"刷&nbsp;&nbsp;新\"}' href='" + url + "' style='" + fanliouty + "' onmouseover='this.style.cssText=\"" + fanliovery + "\"' onmouseout='this.style.cssText=\"" + fanliouty + "\"' " + clickStr + " target='" + target + "'>" + link_text + "</a>";
                var htmltext = btnflag == "0" ? "" : btnflag == "1" ? "" : "<img class='QC_enlarge' src='" + Qc_url + "' style='" + fanliout + "' />";
                //var htmltext_m = btnflag == "0" ? "" : btnflag == "1" ? addtips_s + "<a href='" + url + "' style='" + fanliout_m + "' onmouseover='this.style.cssText=\"" + fanliover_m + "\";document.getElementById(\"tips_7fanli_m\").style.display=\"block\";' onmouseout='this.style.cssText=\"" + fanliout_m + "\";document.getElementById(\"tips_7fanli_m\").style.display=\"none\";' " + clickStr + " target='" + target + "'>" + link_text + "</a>" : "<a onclick='if(this.innerText==\"刷&nbsp;&nbsp;新\"){this.href=\"#\";location.reload();return false;}else{this.innerText=\"刷&nbsp;&nbsp;新\"}' href='" + url + "' style='" + fanliouty_m + "' onmouseover='this.style.cssText=\"" + fanliovery_m + "\"' onmouseout='this.style.cssText=\"" + fanliouty_m + "\"' " + clickStr + " target='" + target + "'>" + link_text + "</a>";
                var htmltext_m = btnflag == "0" ? "" : btnflag == "1" ? "" : "<img class='QC_enlarge' src='" + Qc_url + "' style='" + fanliout + "' />";
            }
            var link_dom = document.createElement("span");
            var link_dom_m = document.createElement("span");
            if (Qc_url != "") {
                link_dom.style.cssText = "display: inline-block;width:90px;";
                link_dom_m.style.cssText = "display: inline-block;width:90px;";
            } else {
                link_dom.style.cssText = "display: inline-block;width:0px;";
                link_dom_m.style.cssText = "display: inline-block;width:0px;";
            }
            // link_dom.style.cssText = text != "" ? textflag == "1" ? "display: inline-block;width:0px;" : "display: inline-block;width:140px;" : "display: inline-block;width:150px;";
            // link_dom_m.style.cssText = text != "" ? textflag == "1" ? "display: inline-block;width:0px;" : "display: inline-block;width:140px;" : "display: inline-block;width:150px;";
            link_dom.innerHTML = htmltext;
            link_dom_m.innerHTML = htmltext_m;

            var title_dom = document.createElement('div');
            var title_dom_m = document.createElement('div');
            title_dom.id = "textcont";
            title_dom_m.id = "textcont_m";
            title_dom.style.cssText = text != "" ? textflag == "1" ? "float:left;color:#333;display:inline-block;line-height:30px;margin-left:20px;font-size:14px;margin-right:10px;" : "float:left;display:inline-block;margin-left:20px;height:34px;line-height:34px;text-indent:35px;color:#ff7e00;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2CUK5hXXXXXagXXXXXXXXXXXX-380087440.png) no-repeat;" : "float:left;color:#333;display:inline-block;height:30px;line-height:30px;margin-left:20px;font-size:14px;";
            title_dom.innerHTML = text;

            title_dom_m.style.cssText = text != "" ? textflag == "1" ? "width:12px;color:#333;display:block;line-height:14px;margin-left:27px;font-size:14px;margin-bottom:10px;word-wrap:break-word;" : "display:block;margin-left:20px;line-height:14px;width:12px;color:#ff7e00;" : "width:12px;color:#333;display:block;line-height:14px;margin-left:27px;font-size:14px;";
            textflag == "1" ? title_dom_m.innerHTML = text_2 : title_dom_m.innerHTML = '<img style="width:26px;height:34px;margin-bottom:10px;" src="https://img.alicdn.com/imgextra/i1/380087440/TB2CUK5hXXXXXagXXXXXXXXXXXX-380087440.png"></img><span style="display:block;width:12px;white-space: normal;word-break: break-all;word-wrap: break-word;margin-left:6px;line-height:14px;">' + text_2 + '</span>';
            if (obj) {
                obj.appendChild(title_dom);
                obj.appendChild(link_dom);
            }
            if (obj_m) {
                obj_m.appendChild(title_dom_m);
                obj_m.appendChild(link_dom_m);
            }
            if (info != undefined) {
                if (info) {
                    //取消收藏
                    // document.getElementsByClassName("already_collect")[0].onclick = function() {
                    //     sendMes(function(res) {
                    //         console.log(res);
                    //     }, deletecollecturl + "?storeId=" + data.auctionId, "");
                    // }
                } else {
                    document.getElementsByClassName("collect_R_taobao")[0].onclick = function() {
                        console.log("收藏");
                        if (isPlatform) {
                            sendMes(function(res) {
                                if (res.success) {
                                    document.getElementById("div_off").classList.add("off");
                                    document.getElementById("div_off").addEventListener("animationend", function() {
                                        iscollectshop(data);
                                    });
                                }
                            }, collecturl + "?auctionid=" + itemId + "&transferTo=1", "");
                        } else {
                            sendMes(function(res) {
                                if (res.success) {
                                    document.getElementById("div_off").classList.add("off");
                                    document.getElementById("div_off").addEventListener("animationend", function() {
                                        iscollectshop(data);
                                    });
                                }
                            }, collecturl + "?auctionid=" + itemId + "&transferTo=2", "");
                        }

                    }
                }
            }
            if (!isLogin) {
                console.log(isRefresh);
                if (!isRefresh) {
                    document.getElementsByClassName("refresh")[0].onclick = function() {
                        isRefresh = true;
                        sayMes("congratulations", info, data);
                    }
                    document.getElementsByClassName("refresh")[1].onclick = function() {
                        isRefresh = true;
                        sayMes("congratulations", info, data);
                    }
                }
            }
            // document.getElementsByClassName("AD")[0].onclick = function() {
            //     sendMes(function(res) {
            //         console.log(res);
            //         console.log("图片点击执行");
            //     }, "http://stats.ztcadx.com/click?adx=2&b=YmRiZXMsMDAwMDAwMDAwMDAwMDAwMCwyLGJlc18wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAsMjg4MjMwMzc2MjU5MjQ3Mzc3LDEwODYwNDEzNSwxMDg2MDQxMzYsMTA4NjExNzA2LCUlTVBSSUNFJSUsLTEsMCwwLDAsMCwxLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxOTgsMCww&mprice=+&burl=aHR0cHM6Ly90YnZyLmV3cy5tLmphZWFwcC5jb20vdnIvMTEtMTEvP3NwbT1hMXoxMC4xLWItcy4wLjAuMjEzNDJmM2ZSYzN1c2gjL3NlbGVjdGVk&plat_id=204", "");
            // }

            var share_class_h = 'float:left;block;width:20px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2Eb51hXXXXXbtXXXXXXXXXXXX-380087440.png) no-repeat;cursor:pointer';
            var share_class_h_h = 'float:left;width:20px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2Eb51hXXXXXbtXXXXXXXXXXXX-380087440.png) no-repeat 0 -22px;cursor:pointer';
            var share_class_s = 'width:20px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2Eb51hXXXXXbtXXXXXXXXXXXX-380087440.png) no-repeat;cursor:pointer';
            var share_class_s_h = 'width:20px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2Eb51hXXXXXbtXXXXXXXXXXXX-380087440.png) no-repeat 0 -22px;cursor:pointer';
            var qqsh_h = 'float:left;display:block;margin-left:12px;margin-top:3px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat;';
            var weixin_h = 'float:left;display:block;margin-left:7px;margin-top:1px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat -23px 0;';
            var weibo_h = 'float:left;display:block;margin-left:7px;margin-top:3px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat -46px 0;';
            var douban_h = 'float:left;display:block;margin-left:7px;margin-top:1px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat -69px 0;';
            var renren_h = 'float:left;display:block;margin-left:7px;margin-top:1px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat -92px 0;';

            var qqsh_s = 'display:block;margin-top:12px;margin-left:1px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat;';
            var weixin_s = 'display:block;margin-top:7px;margin-left:1px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat -23px 0;';
            var weibo_s = 'display:block;margin-top:7px;margin-left:1px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat -46px 0;';
            var douban_s = 'display:block;margin-top:7px;margin-left:1px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat -69px 0;';
            var renren_s = 'display:block;margin-top:7px;margin-left:1px;width:18px;height:18px;background:url(https://img.alicdn.com/imgextra/i1/380087440/TB2ucW3hXXXXXavXXXXXXXXXXXX-380087440.png) no-repeat -92px 0;';

            var detail_share_h = '<a style="' + qqsh_h + '" target="_blank" href="http://7fanli.com/share.html?type=qq&urllink=' + taokeUrl + '"></a>' + '<a style="' + weibo_h + '" target="_blank" href="http://7fanli.com/share.html?type=weibo&urllink=' + taokeUrl + '"></a>' + '<a style="' + douban_h + '" target="_blank" href="http://7fanli.com/share.html?type=douban&urllink=' + taokeUrl + '"></a>' + '<a style="' + weixin_h + '" target="_blank" href="http://7fanli.com/share.html?type=weixin&urllink=' + taokeUrl + '"></a>' + '<a style="' + renren_h + '" target="_blank" href="http://7fanli.com/share.html?type=renren&&urllink=' + taokeUrl + '"></a>';
            var detail_share_s = '<a style="' + qqsh_s + '" target="_blank" href="http://7fanli.com/share.html?type=qq&urllink=' + taokeUrl + '"></a>' + '<a style="' + weibo_s + '" target="_blank" href="http://7fanli.com/share.html?type=weibo&urllink=' + taokeUrl + '"></a>' + '<a style="' + weixin_s + '" target="_blank" href="http://7fanli.com/share.html?type=weixin&urllink=' + taokeUrl + '"></a>' + '<a style="' + douban_s + '" target="_blank" href="http://7fanli.com/share.html?type=douban&urllink=' + taokeUrl + '"></a>' + '<a style="' + renren_s + '" target="_blank" href="http://7fanli.com/share.html?type=renren&&urllink=' + taokeUrl + '"></a>';

            var funclick_h = "onclick=\"if(this.parentNode.style.width=='20px'){this.parentNode.style.width='75px'}else{this.parentNode.style.width='20px'}\"";
            var funclick_s = "onclick=\"if(this.parentNode.style.height=='22px'){this.parentNode.style.height='77px'}else{this.parentNode.style.height='22px'}\"";
            var share_html_h = '<span style="display:block;float:left;margin-left:0px;margin-top:25px;margin-right:20px;width:1px;height:28px"></span><div style="float:left;width:20px;height:22px;margin-top:25px;overflow:hidden;"><div style="' + share_class_h + '" onmouseover="this.style.cssText=\'' + share_class_h_h + '\'" onmouseout="this.style.cssText=\'' + share_class_h + '\'"' + funclick_h + ' title="分享宝贝赚佣金"></div>' + detail_share_h + '</div>';
            var share_html_s = '<span style="display:block;margin-left:21px;margin-top:20px;margin-bottom:20px;width:28px;height:1px;background:#e9e9e9"></span><div style="width:20px;height:22px;margin-left:25px;overflow:hidden;"><div style="' + share_class_s + '" onmouseover="this.style.cssText=\'' + share_class_s_h + '\'" onmouseout="this.style.cssText=\'' + share_class_s + '\'"' + funclick_s + ' title="分享宝贝赚佣金"></div>' + detail_share_s + '</div>'


            if (shareflag == 1) {
                if (document.getElementById("tc_share_cont")) {
                    document.getElementById("tc_share_cont").innerHTML = share_html_h;
                }
                if (document.getElementById("tc_share_cont_m")) {
                    document.getElementById("tc_share_cont_m").innerHTML = share_html_s;
                }
            }
            //添加高返
            //addGaofan();

            //add extshow
            //createExtShow();


            //清空内存
            if (status != "congratulations") {

                sendInfo(function(data) {}, "clear", "");

            }
            //for opera
            /*var aimg = new Image();
            aimg.src = "//www.7fanli.com/gif?r=" + encodeURIComponent(document.referrer) + "&pt=" + encodeURIComponent(document.title) + "&p=" + encodeURIComponent(price) + "&fp=" + encodeURIComponent(fanliPrice) + "&fr=" + encodeURIComponent(fanliRate) + "&fc=" + encodeURIComponent(fingerCode) + "&v=" + v;
            */

        }



        function addGaofan() {

            var text = "";
            if (eventFanliPrice > 0 && eventFanliPrice > fanliPrice) {
                text = "如何获得" + eventFanliRatePercent + "的返利<span style='background:url(https://img.alicdn.com/imgextra/i1/201544069/TB2aAy0bTIlyKJjSZFrXXXn2VXa-201544069.png) 4px 2px no-repeat;font-size:18px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
                var gaofan_dom = document.createElement("a");
                gaofan_dom.style.cssText = "display:none;text-decoration:none;vertical-align:middle;cursor:pointer;font-size:14px;color:#ffffff;padding-left:34px;padding-right:20px;height:70px;line-height:70px;background:url(https://img.alicdn.com/imgextra/i1/201544069/TB2iqFTbNolyKJjSZFDXXbNfpXa-201544069.jpg) no-repeat #68Be00;";
                gaofan_dom.innerHTML = text;
                gaofan_dom.href = "https://www.7fanli.com/gaofan2.html?itemid=" + itemId;
                gaofan_dom.target = "_blank";
                gaofan_dom.id = "gaofan_open";


                var gaofan_closedom = document.createElement("a");
                gaofan_closedom.style.cssText = "background:url(https://img.alicdn.com/imgextra/i1/201544069/TB2W8rIa.3iyKJjy1zeXXbxZFXa-201544069.jpg) right no-repeat #68BE00;text-decoration:none;display:block;height:70px;vertical-align;width:35px;font-size:14px;color:#ffffff;padding-left:4px;margin-left:14px;cursor:pointer;";
                gaofan_closedom.innerHTML = "&nbsp;返<br/>&nbsp;更<br/>&nbsp;多";
                gaofan_closedom.onclick = function() {
                    this.style.display = "none";
                    document.getElementById("gaofan_open").style.display = "block";

                }


                if (document.getElementById("tc_gf_cont")) {

                    document.getElementById("tc_gf_cont").appendChild(gaofan_dom);
                    document.getElementById("tc_gf_cont").appendChild(gaofan_closedom);


                }
            } else {
                if (document.getElementById("tc_gf_cont")) {

                    document.getElementById("tc_gf_cont").display = "none";

                }
            }




        }

        function getOtherTrans(data) {

            if (null != data.auction) {

                sayMes("otherFanli");

            } else {

                sayMes("notFanli");
            }

        }

        function getOther() {

            var timestamp = (new Date()).getTime();
            sendMes(getOtherTrans, getTransUrl + "?siteid=" + siteId + "&adzoneid=" + adzoneId + "&promotionURL=" + encodeURIComponent(location.href) + "&t=" + timestamp, "getTransUrl");
        }

        function getItemInfo() {



            if (document.getElementById("LineZing")) {

                shopId = document.getElementById("LineZing").getAttribute("shopid");

            }
            var meta_data = document.getElementsByName('microscope-data');
            if (meta_data.length > 0) {

                var shop_content = meta_data[0].getAttribute("content");
                var shop_rex = /(?:shopId=)(.*?)(;)/gi;
                var shop_result = shop_content.match(shop_rex);
                if (shop_result.length > 0) {
                    shopId = shop_result[0].replace("shopId=", "").replace(";", "");

                }
                var user_rex = /(?:userId=)(\d){1,14}/gi;
                var user_result = shop_content.match(user_rex);

                if (user_result.length > 0) {

                    userId = user_result[0].replace("userId=", "");

                }
            }



            if (location.href.indexOf("chaoshi.detail.tmall.com") != -1) {
                isChaoshi = true;
                isItem = true;

            }



            if (location.href.indexOf("detail.ju.taobao.com") != -1 || location.href.indexOf("tuan.alitrip.com") != -1) {

                isJu = true;
                isItem = true;
            }

            if (location.href.indexOf("item.taobao.com") != -1 || location.href.indexOf("items.alitrip.com") != -1 || location.href.indexOf("detail.yao.95095.com") != -1) {

                isItem = true;
                itemIsC = true;
            }



            if (location.href.indexOf("detail.tmall.com") != -1 || location.href.indexOf("detail.tmall.hk") != -1 || location.href.indexOf("detail.liangxinyao.com") != -1 || location.href.indexOf("detail.m.tmall.com") != -1) {

                isItem = true;
                itemIsMall = true;
            }

            if (location.href.indexOf("baoxian.taobao.com/item.htm") != -1) {


                isItem = true;

            }

            if (location.href.indexOf("item.yiyaojd.com") != -1 || location.href.indexOf("item.jd.com") != -1 || location.href.indexOf("item.jd.hk") != -1) {
                isPlatform = false;
                isItem = true;
            }

            if (location.href.indexOf("traveldetail.fliggy.com/item.htm") != -1) {


                isItem = true;

            }

            if (location.href.indexOf("hotel.fliggy.com/item2.htm") != -1) {

                isfliggy = true;
                isItem = true;

            }

            if (isChaoshi || isItem) {
                if (isPlatform) {
                    itemId = getQueryString("id");
                    itemUrl = "http://item.taobao.com/item.htm?id=" + itemId;
                } else {
                    console.log(window.location.href.match(/\d+/g)[0]);
                    itemId = window.location.href.match(/\d+/g)[0];
                }


            }

            if (isJu) {
                var itemTips = "item_id";
                itemId = getQueryString("item_id");
                if (null == itemId) {
                    itemTips = itemId;
                    itemId = getQueryString("itemId");
                    if (null == itemId) {
                        itemTips = id;
                        itemId = getQueryString("id");
                        if (null == itemId) {
                            itemTips = itemid;
                            itemId = getQueryString("itemid");
                        }
                    }
                }
                //itemUrl = "http://detail.ju.taobao.com/home.htm?" + itemTips + "=" + itemId;
                itemUrl = "http://item.taobao.com/item.htm?id=" + itemId;
                //console.log(itemUrl);
            }

            if (isfliggy) {
                itemId = getQueryString("item_id");
            }


            var meta_data = document.getElementsByName('microscope-data');
            if (!isItem && !isJu && !isChaoshi && meta_data.length > 0) {

                var shop_content = meta_data[0].getAttribute("content");
                var shop_rex = /(?:shopId=)(.*?)(;)/gi;
                var shop_result = shop_content.match(shop_rex);

                if (shop_result.length > 0) {

                    isShop = true;

                    shopId = shop_result[0].replace("shopId=", "").replace(";", "");
                    shopUrl = "http://shop" + shopId + ".taobao.com";

                    var shopNames = document.getElementsByClassName('shop-name');

                    if (null != shopNames && shopNames.length > 0) {
                        if (shopNames.length >= 2) {

                            shopName = shopNames[1].innerText;

                        } else {

                            shopName = shopNames[0].innerText;

                        }
                    } else {


                        shopNames = document.getElementsByClassName('slogo-shopname')[0];

                        if (null != shopNames) {
                            shopName = shopNames.innerText;
                        } else {

                            if (shopNames == undefined) {

                                shopNames = document.getElementsByClassName("shop-card");
                                if (null != shopNames) {

                                    shopName = shopNames[0].getElementsByTagName("a");
                                    shopName = shopName[0].getAttribute("title");

                                }


                            } else {

                                shopName = shopNames[0].getElementsByTagName("strong")[0].innerText;
                            }


                        }

                    }
                }

            }

            if (!isChaoshi && !isShop && !isJu && !isItem) {
                //getOther();
                sayMes("notFanli");
            }


        }

        // 获取商品价格
        function getItemPrice() {

            if (document.getElementsByClassName('tm-price').length) {
                if (document.getElementsByClassName('tm-price').length > 1) {
                    itemPrice = document.getElementsByClassName('tm-price')[1].innerText;
                } else {
                    itemPrice = document.getElementsByClassName('tm-price')[0].innerText;
                }
            } else if (document.getElementsByClassName('tb-rmb-num').length) {
                if (document.getElementsByClassName('tb-rmb-num').length > 1) {
                    itemPrice = document.getElementsByClassName('tb-rmb-num')[1].innerText;
                } else {
                    itemPrice = document.getElementsByClassName('tb-rmb-num')[0].innerText;
                }
            } else if (document.getElementsByClassName('price-content').length) {
                if (document.getElementsByClassName('price-content').length > 1) {
                    itemPrice = document.getElementsByClassName('price-content')[1].getElementsByTagName('span')[0].innerText;
                } else {
                    itemPrice = document.getElementsByClassName('price-content')[0].getElementsByTagName('span')[0].innerText;
                }
            } else if (document.getElementById('actPrice')) {
                itemPrice = document.getElementById('actPrice').value;
            }

            if (itemPrice.indexOf('-') != -1) {

                itemPrice = itemPrice.split('-')[1].replace(/(^\s*)|(\s*$)/g, "");

            }
        }

        function getCode(data) {
            //console.log(data);
            getItemPrice();

            var rate = 0.00;
            var eventRate = 0.00;

            if (data && data.ok) {
                // 打开页面是店铺页面

                if (isShop) {

                    if (data.shop_fanli.shopCommissionRate == null) {

                        hasFanli = false;
                        sayMes("nofanli", "");
                        return;
                    }

                    hasFanli = true;
                    var commission = data.shop_fanli;
                    rate = commission.shopCommissionRate;

                    fanliRate = rate / 100;

                    sayMes("congratulations", "");
                    //console.log("congratulations" + "-进入状态判断");
                    return;
                } else {
                    // 打开页面是商品页面

                    if (data.status == "FAILURE" || data.tkCommFee_channel == 0) {

                        hasFanli = false;
                        sayMes("nofanli", "");
                        return;
                    }

                    hasFanli = true;
                    if (isPlatform) {
                        var commission = data;
                        rate = commission.tkRate_channel;
                        if (null != commission.eventRate) {
                            eventRate = commission.eventRate;
                        }
                        if (null != commission.zkPrice) {
                            price = commission.zkPrice;
                        } else {
                            price = commission.reservePrice;
                        }

                        //是否存在二合一优惠券
                        if (null != commission.taoBaoResult.couponInfo && commission.taoBaoResult.couponInfo != '无') {
                            couponStartFee = commission.couponStartFee;
                            couponInfo = commission.taoBaoResult.couponInfo;
                            couponAmount = commission.couponLeftCount + "/" + commission.couponTotalCount;
                        }
                        fanliRate = rate / 100;

                        // 查询到的商品价格大于页面展示价格；itemPrice——页面展示价格
                        if (commission.taoBaoResult.tkCommFee != null) {
                            fanliPrice = commission.taoBaoResult.tkCommFee;
                        } else if (Number(itemPrice) < Number(price)) {
                            // fanliPrice = (price * rate / 100).toFixed(2)
                            fanliPrice = (Number(itemPrice) * 0.02).toFixed(2) + ' ~ ' + (Number(itemPrice) * 0.06).toFixed(2);
                            price = itemPrice;
                        }

                        if (eventRate != null) {

                            eventFanliRate = eventRate / 100 * 0.95;
                            eventFanliRatePercent = Math.round(eventFanliRate * 10000) / 100 + "%";
                            eventFanliPrice = Math.round(price * eventRate) / 100;
                        }
                    } else {
                        fanliPrice = data.data.tkCommFee;
                    }

                }

                getSelectUser(data);
                //console.log("getSelectUser-判断进入");
            } else {

                getItem();
                hasFanli = false;
                sayMes("nofanli", "");
                return;

            }

        }

        function getSelectUser(res) {
            sendInfo(function(data) {
                inFanli = data.msg; //接口有改动，没有这参数
                QR_code(res);
                if (!isLogin) {
                    //sayMes("congratulations", "");
                    //console.log("congratulations" + "-进入getSelectUser");
                } else {
                    //sendMes(getUser, selectUserUrl + "?userName=" + userName, "getUserInfo");
                }
            }, "get", shopId + "|" + itemId);
        }

        function getItem() {
            if (isItem) {
                if (isPlatform) { //isPlatform判断平台，true为淘宝 默认值，false为京东
                    sendMes(function(data) {
                        if (data.zkPrice) {
                            // 存在折扣后优惠价格，价格返回优惠价格
                            price = data.zkPrice;

                        } else {
                            // 不存在折扣后优惠价格，价格返回普通价格
                            price = data.reservePrice;
                        }

                        // 查询到的商品价格大于页面展示价格；itemPrice——页面展示价格
                        if (data.taoBaoResult.tkCommFee != null) {
                            fanliPrice = data.taoBaoResult.tkCommFee;
                        } else if (Number(itemPrice) < Number(price)) {
                            fanliPrice = (Number(itemPrice) * 0.02).toFixed(2) + ' ~ ' + (Number(itemPrice) * 0.06).toFixed(2);
                        }

                        getSelectUser(data);

                    }, getItemUrl + "?itemdata=" + itemId + "&userId=1&wxid=&platform=1", "");
                } else {
                    sendMes(function(data) {
                        price = data.data.zkPrice;

                        // 查询到的商品价格大于页面展示价格；itemPrice——页面展示价格
                        if (data.tkCommFee != null) {
                            fanliPrice = data.data.tkCommFee;
                        } else if (Number(itemPrice) < Number(price)) {
                            fanliPrice = (Number(itemPrice) * 0.02).toFixed(2) + ' ~ ' + (Number(itemPrice) * 0.06).toFixed(2);
                        }

                        getSelectUser(data);

                    }, jd_getItemUrl + "?itemdata=" + itemId + "&userId=1&wxid=&platform=1", "");
                }
            }
        }

        function getTaokeUrl() {
            //发起获取商品淘客链接,转链接口

            if (isItem) {

                // sendMes(function(data) {

                //     if (data.link != null) {

                //         openFanli = data.auction.url;
                //         taokeUrl = data.link.clickUrl;
                //         clickUrl = data.link.couponLink;

                //     } else {
                //         clickUrl = data.auction.url;
                //     }
                //     sayMes("congratulations", "");

                // }, getTaokeApi + "?itemid=" + itemId + "&userid=" + user_id, "");
            }
        }

        function getFanliInfo() {

            var timestamp = (new Date()).getTime();

            if (isItem) {
                //发起获取返利信息(从阿里妈妈接口) getAuctionDetailUrl
                if (isPlatform) {
                    sendMes(getCode, getItemUrl + "?itemdata=" + itemId + "&userId=1&wxid=&platform=1", "getDetail");
                } else {
                    sendMes(getCode, jd_getItemUrl + "?itemdata=" + itemId + "&userId=1&wxid=&platform=1", "getDetail");
                }
            } else if (isShop) {
                sendMes(getCode, getShopDetailUrl + "?memberid=" + userId + "&shopname=" + encodeURIComponent(shopName) + "&" + "&interfaceName=getShopCode", "getDetail");

            }

        }

        function QR_code(data) {
            if (isPlatform) {
                sendMes(function(res) {
                    if (res.data != "") {
                        Qc_url = res.data;
                    } else {
                        Qc_url = "http://www.7fanli.com/jiazaisb.jpg";
                    }
                    iscollectshop(data);
                }, Qccode + "?itemId=" + itemId, "");
            } else {
                sendMes(function(res) {
                    if (res.data != "") {
                        Qc_url = res.data;
                    } else {
                        Qc_url = "http://www.7fanli.com/jiazaisb.jpg";
                    }
                    iscollectshop(data);
                }, Qccode + "?itemId=" + itemId + "&type=jd", "");
            }

        }

        function collectshop(data) {
            //商品收藏

        }

        function iscollectshop(data) {
            //验证收藏
            sendMes(function(res) {
                iscollect = res.success;
                sayMes("congratulations", iscollect, data);
            }, verifyCollection + "?auctionid=" + itemId, "");
        }

        function getTaskItemId() {

            sendMes(getTaskItemIdData, getTaskItemIdUrl, "");
        }

        function getTaskItemIdData(data) {
            if (data.itemid) {

                postTtemResItemId = data.itemid;
                item_show_rate = data.item_show_rate;
                sendMes(function(data) {

                    data.auction.pageList[0].tkRate_channel = Number(item_show_rate) * data.auction.pageList[0].tkRate;
                    data.auction.pageList[0].tkCommFee_channel = Number(item_show_rate) * data.auction.pageList[0].tkCommFee_channel;
                    data.auction.pageList[0].ok = "True";

                    sendMes(function() {}, postTtemResUrl + "?itemid=" + postTtemResItemId + "&fanlidata=" + JSON.stringify(data.auction.pageList[0]));

                }, getItemUrl + "?id=" + data.itemid, data.itemid); //getAuctionDetailUrl
            }
        }


        function getUser(data) {

            user_id = data.user_id;
            getTaokeUrl();
            // loginname = data.user_name;
            // photo = data.user_pic;
            // balance = data.balance;
            // unused = data.unused;
            // order = data.total_amt;
            // total = data.total_amt;

            // var tc_btn = document.getElementById("tc_btn");
            // tc_btn.innerHTML = '<span style="color:#999;height:22px;line-height:22px;">使用7返利</span><br/><table><tr><td><span style="color:#999;height:22px;line-height:22px;">已返现 </span><span style="color:red;font-weight:700;height:22px;line-height:22px">' + total + '元&nbsp;&nbsp;</span> </td><td> <span style="color:#999;height:22px;line-height:22px;">返利订单 </span><span style="color:#280;font-weight:700;height:26px;line-height:26px">' + order + '笔&nbsp;&nbsp;</span></td></tr><tr><td><span style="color:#999;height:22px;line-height:22px;">可提现 </span><span style="color:#280;font-weight:700;height:22px;line-height:22px">' + balance + '元&nbsp;&nbsp;</span> </td><td> <span style="color:#999;height:22px;line-height:22px;">未结算 </span><span style="color:#280;font-weight:700;height:26px;line-height:26px">' + unused + '元&nbsp;&nbsp;</span></td></tr></table>';

            // if (photo != "") {
            //     var qifanli_logo = document.getElementById("qifanli_logo");

            //     qifanli_logo.innerHTML = '<img src="' + photo + '" height="50" width="50"/>';
            // }

        }

        function chkLogin(data) {

            newMid = data.data.mid;
            for (var i = 0; i < newMid.length; i++) {
                if (location.href.indexOf("ali_trackid=2:mm_" + newMid[i]) != -1 || location.href.indexOf("ali_trackid=2%3Amm_" + newMid[i]) != -1 || location.href.indexOf("&utm_campaign=") != -1) {
                    ali_trackid_mid = true;
                }
            }

            if (null == data || data.success == false) {

                //无法正常返利.未开通淘宝客
                // sayMes("logmm", "");
                isLogin = false;
            } else {

                isLogin = true;
                userName = data.data.userName;
            }
            getFanliInfo();
            //getTaskItemId();
        }



        function createExtShow() {
            var t = (new Date()).getTime();
            var extUrl = "http://style.7fanli.com/js/ext_show.js?t=" + t;
            sendMesText(function(data) {

                eval(data);


            }, extUrl, "");

        }

        function createDialog() {
            if (pos == "leftb" || pos == "rightb") {
                var img_src = "https://img.alicdn.com/imgextra/i4/380087440/TB2dA29hXXXXXX9XXXXXXXXXXXX-380087440.png";
                // console.log("创建界面");
                var setout = "display:block;margin-left:5px;margin-top:25px;margin-right:20px;width:22px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2qiW7hXXXXXXVXXXXXXXXXXXX-380087440.png) 0 -22px no-repeat;cursor:pointer;"
                var setover = "display:block;margin-left:20px;margin-top:25px;margin-right:20px;width:22px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2qiW7hXXXXXXVXXXXXXXXXXXX-380087440.png) 0 0px no-repeat;cursor:pointer;"
                    //左下
                var trends_dom = document.createElement('div');
                trends_dom.id = "taoke_dialog";
                var fixpos = (pos == "leftb" ? 'left:0px;' : 'right:0px;');
                var css_1 = ['height:110px;', 'border:1px solid #d2d2d2;', 'position:fixed;', fixpos, 'bottom:0;', 'z-index:2147483647;', 'color:#fff;', 'text-align:left;', 'background-color:#fff;', 'background-repeat:repeat-x;', 'color:#666666'];
                trends_dom.style.cssText = css_1.join("");
                var taoke_content = document.createElement("div");
                taoke_content.id = "taoke_content";
                // taoke_content.innerHTML = '<ul id="ul_off" style="background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2nsaThXXXXXcxXXXXXXXXXXXX-380087440.png) 20px 10px no-repeat;height:100px;position:relative;"><div id="div_off" style="position:absolute;"></div>' + '<li style="margin-top:20px;"><a id="qifanli_logo" href="https://7fanli.com" target="_blank"></a></li>' + '<li style="float:left;height:40px;width:1px;background-color:#e9e9e9;margin-top:17px;margin-left:80px;"></li>' + '<li id="tc_left" style="float:left;height:70px;display:flex;align-items:center;"><img src="https://img.alicdn.com/imgextra/i2/201544069/TB2eZ47XPS_LeJjSZFxXXaP8XXa-201544069.gif" height="70" width="70" style="margin-top:-20px"/></li>' + '<li id="tc_gf_cont" style="float:left"></li>' + '<li id="tc_jfb_cont" style="float:left;margin-top:23px;"></li>' + '<li style="float:left;height:48px;width:1px;margin-top:10px;"></li>' + '<li id="tc_btn" style="float:left"><a href="' + loginLocUrl + '?v=' + v + '" style="' + setout + '" onmouseout="this.style.cssText=\'' + setout + '\'" onmouseover="this.style.cssText=\'' + setout + '\'" target="_blank"></a></li><a href="#" target="_blank"><img class="AD" style="width:90px;height:90px;" src="http://www.7fanli.com/guanggao.jpg" /></a></li>' + '</ul>' + '<div style="clear:both;"></div>'; //<a href="https://tbvr.ews.m.jaeapp.com/vr/11-11/#/selected"><img class="AD" style="width:100px;height:83px;" src="http://www.7fanli.com/guanggao.jpg" /></a></li>
                taoke_content.innerHTML = '<ul id="ul_off" style="background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2nsaThXXXXXcxXXXXXXXXXXXX-380087440.png) 20px 10px no-repeat;height:100px;position:relative;"><div id="div_off" style="position:absolute;"></div>' + '<li style="margin-top:20px;"><a id="qifanli_logo" href="https://7fanli.com" target="_blank"></a></li>' + '<li style="float:left;height:40px;width:1px;background-color:#e9e9e9;margin-top:17px;margin-left:80px;"></li>' + '<li id="tc_left" style="float:left;height:70px;display:flex;align-items:center;"><img src="https://img.alicdn.com/imgextra/i2/201544069/TB2eZ47XPS_LeJjSZFxXXaP8XXa-201544069.gif" height="70" width="70" style="margin-top:-20px"/></li>' + '<li id="tc_gf_cont" style="float:left"></li>' + '<li id="tc_jfb_cont" style="float:left;margin-top:23px;"></li>' + '<li style="float:left;height:48px;width:1px;margin-top:10px;"></li>' + '<li id="tc_btn" style="float:left"><a href="' + fanlisetting + '?v=' + v + '" style="' + setout + '" onmouseout="this.style.cssText=\'' + setout + '\'" onmouseover="this.style.cssText=\'' + setout + '\'" target="_blank"></a></li><a href="#" target="_blank"><img class="AD" style="width:90px;height:90px;" src="http://www.7fanli.com/guanggao.jpg" /></a></li>' + '</ul>' + '<div style="clear:both;"></div>'; //<a href="https://tbvr.ews.m.jaeapp.com/vr/11-11/#/selected"><img class="AD" style="width:100px;height:83px;" src="http://www.7fanli.com/guanggao.jpg" /></a></li>
                trends_dom.appendChild(taoke_content);
                document.body.insertBefore(trends_dom, document.body.lastChild);
                let style_off = document.createElement("style");
                style_off.type = "text/css";
                style_off.appendChild(document.createTextNode(".off{position:absolute;height:50px;width:50px;top:11px;left:20px;background:url(http://7fanli.com/fanliht/default_tx.png)no-repeat;background-size:100%;animation-name:offon;animation-duration:1.5s;animation-timing-function:cubic-bezier(0.6, 0.4, 0.4, 0.6);animation-fill-mode:forwards;opacity:0;z-index:21474836470;}" +
                    "@keyframes offon{0%{top:11px;left:20px;opacity:1;transform:rotate(360deg);height:50px;width:50px;}25%{top:-15px;left:50px;opacity:1;transform:rotate(180deg);height:40px;width:40px;}50%{top:-46px;left:80px;opacity:1;transform:rotate(0deg);height:30px;width:30px;}75%{top:40px;left:109px;opacity:1;transform:rotate(360deg);height:20px;width:20px;}80%{top:6px;left:109px;opacity:1;transform:rotate(360deg);height:20px;width:20px;}100%{top:40px;left:109px;opacity:0;transform:rotate(360deg);height:20px;width:20px;}}"));
                let head_off = document.getElementById("taoke_content");
                head_off.appendChild(style_off);

            } else if (pos == "leftm" || pos == "rightm") {
                var setout_2 = "display:block;margin-left:25px;margin-top:20px;width:22px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2qiW7hXXXXXXVXXXXXXXXXXXX-380087440.png) 0 -22px no-repeat;cursor:pointer;"
                var setover_2 = "display:block;margin-left:25px;margin-top:20px;width:22px;height:22px;background:url(https://img.alicdn.com/imgextra/i4/380087440/TB2qiW7hXXXXXXVXXXXXXXXXXXX-380087440.png) 0 0px no-repeat;cursor:pointer;"

                //左侧
                var trends_dom_m = document.createElement('div');
                trends_dom_m.id = "taoke_dialog_m";

                var fixpos = (pos == "leftm" ? 'left:0px;' : 'right:0px;');

                var css_2 = ['width:70px;', 'border:1px solid #d2d2d2;', 'position:fixed;', fixpos, 'top:140px;', 'z-index:2147483647;', 'color:#fff;', 'text-align:center;', 'background-color:#fff;', 'background-repeat:repeat-x;', 'color:#666666'];

                trends_dom_m.style.cssText = css_2.join("");

                var taoke_content_m = document.createElement("div");

                taoke_content_m.id = "taoke_content_m";

                taoke_content_m.innerHTML = '<ul style="width:70px;padding-bottom:20px;">' + '<li style="background: url(https://img.alicdn.com/imgextra/i4/380087440/TB2nsaThXXXXXcxXXXXXXXXXXXX-380087440.png) no-repeat;width: 50px;height: 50px;margin-left: 10px;margin-top: 10px;"><a id="qifanli_logo" style="display:block;width:50px;height:50px;" href="https://7fanli.com" target="_blank"></a></li>' + '<li style="height:1px;background:#e9e9e9;width:28px;margin-left:21px;margin-top:20px;margin-bottom:20px;"></li>' + '<li id="tc_left_m" style="width:14px;line-height:14px;"></li>' + '<li id="tc_jfb_cont_m" style="width:14px;line-height:14px;"></li>' + '<li id="tc_share_cont_m"></li>' + '<li id="tc_add_m"></li>' + '<li style="width:48px;height:1px;background-color:#e9e9e9;margin-top:20px;margin-left:10px;"></li>' + '<li></li>' + '<li id="tc_btn_m"><a href="' + loginLocUrl + '?v=' + v + '" style="' + setout_2 + '" onmouseout="this.style.cssText=\'' + setout_2 + '\'" onmouseover="this.style.cssText=\'' + setover_2 + '\'" target="_blank"></a></li>' + '</ul>' + '<div style="clear:both;"></div>';
                trends_dom_m.appendChild(taoke_content_m);
                document.body.insertBefore(trends_dom_m, document.body.lastChild);
            } else if (pos == "mtop") {

                var img_src = "https://img.alicdn.com/imgextra/i4/380087440/TB2dA29hXXXXXX9XXXXXXXXXXXX-380087440.png";
                // console.log("创建界面");
                //移动顶部
                var trends_dom = document.createElement('div');
                trends_dom.id = "taoke_dialog";

                var css_1 = ['height:0.5rem;', 'border:none;', 'position:fixed;', 'top:0.4rem;', 'z-index:2147483647;', 'color:#fff;', 'text-align:left;', 'background-color:#fff;', 'background-repeat:repeat-x;', 'color:#666666;', 'width:100%'];
                trends_dom.style.cssText = css_1.join("");
                var taoke_content = document.createElement("div");
                taoke_content.id = "taoke_content";
                taoke_content.innerHTML = '<ul style="height:0.5rem">' + '<li id="tc_left" style="float:left;height:0.5rem;"></li>' + '<li id="tc_gf_cont" style="float:left"></li>' + '</ul>' + '<div style="clear:both;"></div>';
                trends_dom.appendChild(taoke_content);
                document.body.insertBefore(trends_dom, document.body.lastChild);

            }


            if (location.href.indexOf("ai.taobao.com") != -1) {

                sayMes("aitaobao", "");

            } else {
                //检查登陆状态
                //console.log("检查登陆状况");
                //获取商品信息
                getItemInfo();
                /*测试关闭*/
                //chkLogin(null);
                //chkLogin({"flag":true});
                sendMes(chkLogin, loginUrl, "loginUrl");
            }
        }


        // 返利抽成函数

        function fanliRake(rate) {
            if (rate < 6) {
                rate = (rate * 0.9).toFixed(2);
            } else if (rate < 11) {
                rate = (rate - 1).toFixed(2);
            } else if (rate < 21) {
                rate = (rate - 3.5).toFixed(2);
            } else if (rate < 31) {
                rate = (rate - 6.5).toFixed(2);
            } else {
                rate = (rate - 8.5).toFixed(2);
            }
            return rate;

        }


        //start
        qifanli_extension.sendRequest({
            "type": "getcookie"
        }, function(response) {
            pos = response[0].pos;
            aitao = response[1].aitao;

            if (window.navigator.userAgent.indexOf("Android") != -1) {
                ismobile = true;
                pos = "mtop";
            }

            createDialog();
        });



        window.addEventListener('load', function() {

            if (document.getElementById("youdaoGWZS") || document.getElementById("TTS_bijia_wrap")) {

                document.getElementById("taoke_dialog").style.marginBottom = "50px";

            }

        }, false);

    }
})();
