(function() {

    window.onload = function() {
        var v = "4.3.5";
        var loginUrl = "http://tk.7fanli.com:9000/auth/isLogin"; //登陆状态
        var getShopDetailUrl = "https://api.tk.7fanli.com/getShopCode"; //查询店铺返利信息
        var getItemUrl = "http://120.27.140.213:8888/sevenTransfer/transfer.do"; //新转链接口 平台淘宝
        var jd_getItemUrl = "http://120.27.140.213:8888/sevenjdTransfer/transfer.do"; //转链接口 平台京东
        var Qccode = "http://tk.7fanli.com:9000/share/getPcItemQr"; //返利二维码
        var collecturl = "http://tk.7fanli.com:9000/store/addStoreAuction"; //收藏商品
        var verifyCollection = "http://tk.7fanli.com:9000/store/isStored"; //验证是否收藏了该商品
        var fanlisetting = "http://www.7fanli.com/setting.html";//插件设置页面

        var itemPrice = "";//平台：淘宝true，京东false

        var pos = ''//插件位置

        var isLogin = false;
        var isChaoshi = false;
        var isJu = false;
        var isfliggy = false;
        var isItem = false;
        var isShop = false;

        var itemId = "";
        var shopId = "";
        var userId = "";
        var shopName = "";

        var fanliPrice = 0;
        var fanliRate = 0;
        var eventFanliRate = 0;
        var couponInfo = "";
        var price = 0;
        var Qc_url = "";
        var iscollect = false;
        var isPlatform = true; //判断平台

        let trends_dom = ''; // 插件整体容器
        let trends_logo = ''; //插件logo容器
        let loading_dom = '' //加载操作容器
        let taoke_content = ''; //插件内容容器
        let goods_info = '' //商品样式信息容器
        let goods_but = '' //插件操作按钮信息
        let goods_info_text = '' //商品提示信息文字
        let goods_info_earn = '' //商品收益信息文字
        let goods_info_coupon = '' //商品优惠卷信息
        let div_off = '' //收藏时的动态容器
        let collectin_but = '' //收藏按钮
        let rebate_buy_but = '' //返利购买按钮
        let same_but = '' //找同款按钮
        let versatile_but = '' //多用按钮
        let qrCode_dom = '' //二维码存放容器
        let qrCode_tailor = '' //二维码裁剪容器
        let qrCode_img = '' //二维码图片
        

        if (location.href.indexOf("buyertrade.taobao.com") != -1) {
            return;
        }
     
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        }

       
        function sayMes(status, info, data) {

            switch (status) {
                case "logmm":
                    trends_dom.className = 'tipsBut';
                    goods_info_text.innerText = '用户未登录，其前往7返利官网进行登录';
                    versatile_but.innerText = '前往登录';
                    versatile_but.onclick = function(){
                        if (versatile_but.innerText == '刷新'){
                            location.reload();
                        }else{
                            window.open('https://7fanli.com/fanliht/login.html','_blank')
                            versatile_but.innerText = '刷新'
                        }
                    }
                    break;
                case "nofanli":
                    if (isShop) {
                        trends_dom.className = 'tipsNoBut';
                        goods_info_text.innerText = '打开任意商品查询佣金'
                    } else {
                        if (isPlatform) {
                            trends_dom.className = 'norevenue';
                            goods_info_text.innerText = '这个宝贝没有返利，别灰心，试试找同款吧~'
                            same_but.href = 'https://s.taobao.com/search?type=similar&app=i2i&rec_type=1&nid='+itemId
                        }else{
                            trends_dom.className = 'tipsNoBut';
                            goods_info_text.innerText = '啊哦，这个宝贝没有返利'
                        }
                    }
                    break;
                case "aitaobao":
                    trends_dom.className = 'tipsNoBut';
                    goods_info_text.innerText = '已进入返利模式';
                    break;
                case "congratulations":
                    if (isLogin) {
                        if (isShop) {
                            trends_dom.className = 'tipsNoBut';
                            goods_info_text.innerText = "店铺平均返利 " + fanliRate + " %";
                        } else {
                            trends_dom.className = 'revenue';
                            qrCode_img.src = Qc_url
                            goods_info_text.innerText = info?'已收藏，去收藏夹购买':'添加收藏购买';
                            goods_info_earn.innerText = '约赚'+fanliPrice+'元';
                            collectin_but.className = info?'iscollectin_but':'collectin_but';
                            rebate_buy_but.onclick = function(){
                                    window.open('https://7fanli.com/fanliht/pc/dist/index.html#/collectDetail','_blank')
                            }
                            if (!couponInfo||couponInfo == "无") {
                                goods_info_coupon.style.display = 'none'
                            }else{
                                goods_info_coupon.innerText = (couponInfo.replace('元','')).replace('满','');
                            }
                            if (isPlatform) {
                                same_but.href = 'https://s.taobao.com/search?type=similar&app=i2i&rec_type=1&nid='+itemId
                            }else{
                                same_but.style.display = 'none'
                            }
                            if (!info) {
                                collectin_but.onclick = function() {
                                    if (isPlatform) {
                                        sendMes(function(res) {
                                            if (res.success) {
                                                div_off.classList.add("off");
                                                div_off.addEventListener("animationend", function() {
                                                    iscollectshop(data);
                                                });
                                            }
                                        }, collecturl + "?auctionid=" + itemId + "&transferTo=1", "");
                                    } else {
                                        sendMes(function(res) {
                                            if (res.success) {
                                                div_off.classList.add("off");
                                                div_off.addEventListener("animationend", function() {
                                                    iscollectshop(data);
                                                });
                                            }
                                        }, collecturl + "?auctionid=" + itemId + "&transferTo=2", "");
                                    }
            
                                }
                            }
                        }

                    } else {
                        trends_dom.className = 'tipsBut';
                        goods_info_text.innerText = '用户未登录，其前往7返利官网进行登录';
                        versatile_but.innerText = '前往登录';
                        versatile_but.onclick = function(){
                            if (versatile_but.innerText == '刷新'){
                                location.reload();
                            }else{
                                window.open('https://7fanli.com/fanliht/login.html','_blank')
                                versatile_but.innerText = '刷新'
                            }
                        }
                    }
                    break;
                case "notFanli":
                        trends_dom.style.display = "none";
                    break;
                default:
                    trends_dom.className = 'tipsBut';
                    goods_info_text.innerText = '发生未知错误';
                    versatile_but.innerText = '点此反馈';
                    versatile_but.onclick = function(){
                        if (versatile_but.innerText == '刷新'){
                            location.reload();
                        }else{
                            window.open('mailto:service@7fanli.com','_blank')
                            versatile_but.innerText = '刷新'
                        }
                    }
            }

            

            //清空内存
            if (status != "congratulations") {

                sendInfo(function(data) {}, "clear", "");

            }

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


        function getFanliInfo() {


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
                        Qc_url = "https://www.7fanli.com/jiazaisb.jpg";
                    }
                    iscollectshop(data);
                }, Qccode + "?itemId=" + itemId, "");
            } else {
                sendMes(function(res) {
                    if (res.data != "") {
                        Qc_url = res.data;
                    } else {
                        Qc_url = "https://www.7fanli.com/jiazaisb.jpg";
                    }
                    iscollectshop(data);
                }, Qccode + "?itemId=" + itemId + "&type=jd", "");
            }

        }


        function iscollectshop(data) {
            //验证收藏
            sendMes(function(res) {
                iscollect = res.success;
                sayMes("congratulations", iscollect, data);
            }, verifyCollection + "?auctionid=" + itemId, "");
        }



        function chkLogin(data) {

            if (data.success == false) {

                //无法正常返利.未开通淘宝客
                sayMes("logmm", "");
                isLogin = false;
            } else {

                isLogin = true;
            }
            getFanliInfo();
            //getTaskItemId();
        }


        function createDialog() {
            //设置按钮图片链接
            let set_img_src = "https://img.alicdn.com/imgextra/i4/380087440/TB2dA29hXXXXXX9XXXXXXXXXXXX-380087440.png";
            //左下
            // console.log("创建界面");
            trends_dom = document.createElement('div'); // 插件整体容器
            trends_dom.id = "taoke_dialog";
            switch(pos){
                case 'leftm': trends_dom.style.left = '0px',trends_dom.style.right = 'unset';break;
                case 'rightm': trends_dom.style.left = 'unset',trends_dom.style.right = '0px';break;
            }
            trends_logo = document.createElement('span'); //插件logo容器
            let setting_a = document.createElement('a'); //设置a标签
            setting_a.className = 'setting_a'
            setting_a.href = fanlisetting
            trends_logo.appendChild(setting_a);
            trends_logo.className = 'trends_logo'
            trends_dom.appendChild(trends_logo);
            loading_dom = document.createElement('img') // 加载动画
            loading_dom.className = 'loading_dom'
            loading_dom.src = 'https://img.alicdn.com/imgextra/i2/201544069/TB2eZ47XPS_LeJjSZFxXXaP8XXa-201544069.gif'
            trends_dom.appendChild(loading_dom);
            taoke_content = document.createElement("div"); //插件内容容器
            taoke_content.id = "taoke_content";
            trends_dom.appendChild(taoke_content);
            goods_info = document.createElement('div') //商品样式信息容器
            goods_info.className = 'goods_info'
            taoke_content.appendChild(goods_info)
            goods_info_text = document.createElement('span') // 商品提示内容
            goods_info_earn = document.createElement('span') //约赚金额内容
            goods_info_coupon = document.createElement('span') //优惠卷内容
            goods_info_text.className = 'goods_info_text'
            goods_info_earn.className = 'goods_info_earn'
            goods_info_coupon.className = 'goods_info_coupon'
            goods_info.appendChild(goods_info_text)
            goods_info.appendChild(goods_info_earn)
            goods_info.appendChild(goods_info_coupon)
            goods_but = document.createElement('div') //插件操作按钮容器
            goods_but.className = 'goods_but'
            taoke_content.appendChild(goods_but)
            div_off = document.createElement('span') // 收藏时的动态容器
            collectin_but = document.createElement('span') // 收藏按钮
            rebate_buy_but = document.createElement('span') //返利购买按钮
            versatile_but = document.createElement('span') //多用按钮
            same_but = document.createElement('a') //找同款按钮
            collectin_but.className = 'collectin_but'
            rebate_buy_but.className = 'rebate_buy_but'
            versatile_but.className = 'versatile_but'
            same_but.className = 'same_but'
            same_but.href = 'https://s.taobao.com/search?type=similar&app=i2i&rec_type=1&nid=587148657849'
            goods_but.appendChild(div_off)
            goods_but.appendChild(collectin_but)
            goods_but.appendChild(rebate_buy_but)
            goods_but.appendChild(same_but)
            goods_but.appendChild(versatile_but)
            qrCode_dom = document.createElement('span')//二维码容器
            qrCode_tailor = document.createElement('span') //二维码裁剪容器
            qrCode_img = document.createElement('img')//二维码图片
            qrCode_dom.className = Math.random()>=0.5?'qrCode_red':'qrCode_green'
            qrCode_tailor.className = 'qrCode_tailor'
            qrCode_dom.appendChild(qrCode_tailor)
            qrCode_tailor.appendChild(qrCode_img)
            trends_dom.appendChild(qrCode_dom);
            document.body.insertBefore(trends_dom, document.body.lastChild);
            goods_info_text.innerText = '添加收藏购买'
            goods_info_earn.innerText = '约赚15.36元'
            goods_info_coupon.innerText = '399减50'
            collectin_but.innerText = '收藏'
            rebate_buy_but.innerText = '返利购买'
            same_but.innerText = '找同款'
            versatile_but.innerText = '刷新'

            trends_dom.className = 'isloading';

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


        //start
        qifanli_extension.sendRequest({
            "type": "getcookie"
        }, function(response) {
            pos = response[0].pos;
            var t = (new Date()).getTime();
            var fanlicss = document.createElement('link');
            fanlicss.setAttribute('rel', 'stylesheet');
            fanlicss.setAttribute('type', 'text/css');
            fanlicss.setAttribute('charset', 'utf-8');
            if (pos== 'leftb'){
                fanlicss.setAttribute('href', 'https://style.7fanli.com/css/7fanli_horizontal.css?t='+t);
            }else{
                fanlicss.setAttribute('href', 'https://style.7fanli.com/css/7fanli_vertical.css?t='+t);
            }
            document.head.appendChild(fanlicss);
            createDialog();
        });


        window.addEventListener('load', function() {

            if (document.getElementById("youdaoGWZS") || document.getElementById("TTS_bijia_wrap")) {

                document.getElementById("taoke_dialog").style.marginBottom = "50px";

            }

        }, false);

    }
})();
