    /*
    layer.config({
        //path: '/res/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
        path: require.resolve('layer').replace('layer.js', ''),
        extend: ['skin/bsskin/style.css'], //加载新皮肤
        skin: 'layer-ext-bsskin' //一旦设定，所有弹层风格都采用此主题。
    });
    */
    
    /*
    function layerMsg(msg){
        layer.alert(msg, {
          icon: 1,
          skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
        });
    }
    */

    // 根据对象属性值获取对象属性
    function getKeyByValue(obj, val){
        if(!obj){
            return null;
        }

        for(var k in obj){
            if(obj[k] == val){
                return k;
                break;
            }
        }

        return null;
    };

    // 判断数字是否 正整数 或 0
    function isNotNegativeInt(num) {
        if (num == null) return false;
        else if (num == '0' ) return true;
        //else if (num == '0' || num == '0.5' || num == '1.5') return true;
        var reg = /^[0-9]*[1-9][0-9]*$/; //正整数      
        return reg.test(num);
    };

    // VM公共方法start
    // ============================================

    /*
    window.fillSetDesc = function (data){
        if(data){
            var descHtml = buildSetDisplay(data);
            $("td.setDetail").html(descHtml);
            //$("#price").html(data['Price']);
            $("#priceInput").val(data['Price']);
        }else{
            var descHtml = '<p style="color: red;">获取套餐信息失败</p>';
            $("td.setDetail").html(descHtml);
            //$("#price").html('N/A');
            $("#priceInput").val(0);
        }
    }

    // 生成套餐描述, data -- 套餐配置
    window.buildSetDisplay = function (data){
        var html = '';
        html += '\
            <p style="font-weight: bold;">套餐配置：</p>\
            <p>机房：' + data['HouseName'] + '</p>\
            <p>系统：' + data['System'] + '</p>\
            <p>CPU：' + data['CPU'] + '核</p>\
            <p>内存：' + data['RAM'] / 1024 + 'GB</p>';

        data['DISK'].forEach(function(n, i, arr){
            var useTypeDesc = n['useType'] == 'SYS' ? '系统盘' : '数据盘';
            var typeDesc = n['type'] == 'iSCSI_SATA' ? 'SATA' : 'SSD';
            html += '<p>' + useTypeDesc + '：' + n['capacity'] + 'GB,' + typeDesc + '盘</p>';
        });

        html += '\
            <p>带宽类型：' + bandDescMap[data['IPType']] + '</p>\
            <p>带宽：' + data['BandWidthCount'] + 'Mbps</p>\
            <p>数量：' + data['Count'] + '台</p>\
        ';

        return html;
    }

    // 将云主机配置信息，转换为套餐格式
    window.convertVMDataToPkg = function (vm){
        var disks = JSON.parse(vm.disks);
        var diskarr = [];
        //console.log(disks);

        disks.forEach(function(n, i, arr){
            var type = n.Type;
            var useType = n.Bootable == 'True' ? 'SYS' : 'DATA';
            var size = n.Size;

            diskarr.push({type: type, useType: useType, capacity: size});
        });

        var data = {
            CPU: vm.cpu,
            RAM: vm.ram,
            DISK: diskarr,
            System: vm.os,
            BandWidthCount: vm.bandwidthbgp,
            IPCount: 1,
            HouseName: vm.house,
            IPType: vm.iptype,
            Count: 1,
            Price: vm.price
        };

        return data;
    }
    */

    function getTypeDesc(type){
        return type == 'formal' ? '正式' : '测试';
    }

    function getCodeTypeDesc(codeType){
        return codeType == 'idcard' ? '身份证' : '营业执照';
    }

    function getSetDesc(set){
        switch(parseInt(set)){
            case 0: 
                return '公有云自定义';
            case 1: 
                return '公有云套餐一-Linux';
            case 2: 
                return '公有云套餐二-Linux';
            case 3: 
                return '公有云套餐三-Linux';
            case 4: 
                return '公有云套餐一-Windows';
            case 5: 
                return '公有云套餐二-Windows';
            case 6: 
                return '公有云套餐三-Windows';
            case 100: 
                return '国际云';
            case 101: 
                return '私有云';
            default:
        };
    }

    var diskDescMap ={
        'iSCSI_SATA': '中心存储',
        'iSCSI_SSD': 'SSD存储'
    };

    var bandDescMap ={
        'VM_Y1IP':'香港国际',
        'VM_V1IP':'香港带宽',
        'VM_W1IP':'国际线路',
        'VM_X1IP':'香港带宽',
        'VM_U1IP':'广电单线',
        'VM_T1IP':'铁通单线',
        'VM_S1IP':'移动单线',
        'VM_Z1IP':'双线',
        'VM_P1IP':'三线带宽',
        'VM_O1IP':'三线带宽',
        'VM_N1IP':'三线带宽',
        'VM_M1IP':'三线带宽',    
        'VM_L1IP':'三线带宽',
        'VM_K1IP':'双线带宽',
        'VM_J1IP':'双线带宽',
        'VM_I1IP':'双线带宽',
        'VM_BGPIP': 'BGP带宽',
        'VM_SXIP-Ⅰ': '双线带宽-I',
        'VM_R1IP' : '联通单线',
        'VM_PRIIP':'内部网络',
        'VM_Q1IP' : '电信单线'
    };

    function bandDescMaps(type,housename){
        if(housename.indexOf('香港') != -1 && type !='VM_PRIIP'){
            return '香港带宽';
        }
        var bandTypes = {
            'VM_Y1IP':'香港国际',
            'VM_V1IP':'香港带宽',
            'VM_W1IP':'国际线路',
            'VM_X1IP':'香港带宽',
            'VM_U1IP':'广电单线',
            'VM_T1IP':'铁通单线',
            'VM_S1IP':'移动单线',
            'VM_Z1IP':'双线',
            'VM_P1IP':'三线带宽',
            'VM_O1IP':'三线带宽',
            'VM_N1IP':'三线带宽',
            'VM_M1IP':'三线带宽',    
            'VM_L1IP':'三线带宽',
            'VM_K1IP':'双线带宽',
            'VM_J1IP':'双线带宽',
            'VM_I1IP':'双线带宽',
            'VM_BGPIP': 'BGP带宽',
            'VM_SXIP-Ⅰ': '双线带宽-I',
            'VM_R1IP' : '联通单线',
            'VM_PRIIP':'内部网络',
            'VM_Q1IP' : '电信单线'
        }
        return bandTypes[type];
    };


    var ipTypeDescMap = {
        'VM_Y1IP':'香港国际',
        'VM_V1IP':'香港',
        'VM_W1IP':'国际',
        'VM_X1IP':'香港',
        'VM_U1IP':'单广电',
        'VM_T1IP':'单铁通',
        'VM_S1IP':'单移动',
        'VM_Z1IP':'双线',
        'VM_P1IP':'三线',
        'VM_O1IP':'三线',
        'VM_N1IP':'三线',
        'VM_M1IP':'三线',    
        'VM_L1IP':'三线',
        'VM_K1IP':'双线',
        'VM_J1IP':'双线',
        'VM_I1IP':'双线',
        'VM_BGPIP': 'BGP',
        'VM_TCIP': '电信',
        'VM_UNIP': '联通',
        'VM_PRIIP': '内网',
        'VM_SXIP-Ⅰ' : '双线',
        'VM_R1IP' : '单联通',
        'VM_Q1IP' : '单电信',
        'undefined': ''
    };
    // 内存配置
    var ramConf = {
        '1':[1,2,4],
        '2':[2,4,8],
        '4':[4,8,16],
        '8':[8,16,32],
        '12':[12,24,48],
        '16':[16,32,64],
        '32':[64,128]
    }


    // cpu配置
    var cpuConf = [1,2,4,8,12,16,32];

	function myIPStr(IP){
        if (IP == undefined || IP.length == 0) {
            return '暂无数据';
        }
        var str = '';
        var pubIpStr = '',priIpStr = '';

        for (var i in IP) {
            var ipType = '';
            ipType = IP[i].IPType==undefined?'':(IP[i].IPType==''?'':ipTypeDescMap[IP[i].IPType]);          
            if(IP[i].Public != undefined){
                pubIpStr += '<div style="text-align: left;">'+(IP[i].Public == ""?'无':(IP[i].Public+' '+ipType))+'</div>';
            } else{
                priIpStr += '<div style="text-align: left;">'+IP[i].Private+' '+ipType+'</div>';
            }           
        }
        var html = "";
        if(priIpStr !=""){
            html += '<div class="left">内网IP：</div>'+'<div class="left" >'+priIpStr+'</div>';
        }
        html +='<div class="clear"></div>'
        if(priIpStr !=""){
            html += '<div class="left">外网IP：</div>'+'<div class="left" >'+pubIpStr+'</div>';
        }

        str = priIpStr+pubIpStr;
        return html;
	}
	
    // 过滤私网IP
    function getPrivateIp(ips){
        //val为管道符之前计算得到的结果，默认框架会帮你传入，此方法必须返回一个值
        var ret = '';
        if(ips && ips.length){
            /*
            ips.forEach(function(n, i, arr){
                if(n.Private){
                    ret = n.Private;
                    return;
                }
            });
            */
			for (var i=0;i<ips.length;i++) {
				if (ips[i].Private) {
					ret = ips[i].Private;
				}
			}
       }

        return ret;
    }	
    
    //手动自动
    function reNew(renew){
    	var ret = '';
    	if (renew == 0) {
    		ret = '手动续费';
    	}else{
    		ret = '自动续费';
    	}
    	
    	return ret;
    }
    
    // 到期时间
	function deadlineDesc(val){
        var ts = parseInt(val) * 1000;
        if(ts === 0){
            return '永久';
        }
		var ret = new Date(ts).pattern('yyyy-MM-dd HH:mm:ss');
        return ret;
    }
	
    // 日期格式过滤
    function mydate(val, format){
        var ts = parseInt(val)* 1000;
        if(ts != 0 && !ts){
            return val;
        }

        var fmt = format || 'yyyy-MM-dd HH:mm:ss';

        var ret = new Date(ts).pattern('yyyy-MM-dd HH:mm:ss');	
        return ret;
    }    

    /*
     * 获取服务器时间戳(秒) ( 同步 )
     * 参数: sync: true为同步，false为异步    
    */
    function getServerTime(sync, func){
        var isAsync = !sync;

        var time = Math.ceil(new Date().getTime() / 1000);

        $.ajax({
            url: config.APP +'/Home/Public/get_sys_time',
            cache: false,
            async: isAsync,
            dataType: 'json'
        }).done(function(data){
            if(data.type != 1){
                console.log('error: /Api/System/getSystemTime');
                return;
            }

            time = data.data;

            if(typeof func === 'function'){
                func(time);
            }
        });

        return time;
    }

    /*
        init: 初始化状态
        available: 是否可用
        ps: 电源状态
        lastopt: 上次操作 
        lastopttime: 上次操作时间 
        createtime: 创建时间 
        unixTime: 服务器时间戳
        isDelete: 欠费停机标识位
        vmType: 自购(agent)或模板用户(tpl)
    */
    function getStatus(init, available, ps, lastopt, lastopttime, createtime, unixTime, isDelete, vmType){
        if(!vmType){
            vmType = 'tpl';
        }

        var optTimePeriod = unixTime - lastopttime;
        var lifePeriod = unixTime - createtime;
        var optMin = Math.floor(optTimePeriod / 60);
        var lifeMin = Math.floor(lifePeriod / 60);
        //console.log(init, available, ps, lastopt, lastopttime, createtime, unixTime);
        //console.log(optMin, lifeMin);

        var ret = '状态失败';

        if(init == 0){
            ret = '创建中';
            return ret;
        }

        if(init >= 2){
            ret = '初始化失败';
            return ret;
        }

        // 欠费停机判断
        if(vmType == 'agent'){
            if(isDelete == 2 || isDelete == 3){
                ret = '欠费停机';
                return ret;
            }
        }else if(vmType == 'tpl'){
            // 欠费停机判断
            if(isDelete == 2){
                ret = '欠费停机';
                return ret;
            }else if(isDelete == 3){
                ret = '客户欠费';
                return ret;
            }
        }

        if(optMin < 30 && lastopt =='reinstall'){
            ret = '重装中';
            return ret;
        }else if(optMin >= 30 && lastopt =='reinstall'){
            ret = '重装失败';
            return ret;
        }else if(lastopt == 'Copy'){
            ret = '复制中';
            return ret;
        }else if(lastopt == 'reinstalled'){
            ret = '重装失败';
            return ret;
        }


        // init == 1
        if(available == 'False'){
            // 不可用，available == 'False'
            if(lifeMin < 30){
                //return '开机中';
                ret = '创建中';
                return ret;
            }else if(optMin < 30 && lastopt == 'init'){
                ret = '初始化中'
                return ret;
            }else{
                ret = '暂不可用';
                return ret;
            }
        }else if(optMin >= 10){
            // 可用并且操作时长>=10min  available == 'True' && optMin >= 10

            if(ps == 'Running'){
                ret = '运行中';
                return ret;
            }else if(ps == 'Paused'){
                ret = '暂停';
                return ret;
            }else if(ps == 'Halted'){
                ret = '已关机';
                return ret;
            }else if(ps == 'Suspended'){
                ret = '挂起';
                return ret;
            }
        }else{
            // 可用并且操作时长小于10min  available == 'True' && optMin < 10

            if( lastopt == 'Reboot' && (ps != 'Running' || optTimePeriod < 60) ){
                ret = '重启中';
                return ret;
            }

            if( lastopt == 'Run' && ps != 'Running'){
                ret = '开机中';
                return ret;
            }

            if( lastopt == 'Halt' && ps != 'Halted'){
                ret = '关机中';
                return ret;
            }

            if( (lastopt == 'Halt' || lastopt == 'Init' || lastopt == 'init') && ps == 'Halted'){
                ret = '已关机';
                return ret;
            }

            if( (lastopt == 'Init' || lastopt == 'Run' || lastopt == 'Reboot' || lastopt == 'init') && ps == 'Running'){
                ret = '运行中';
                return ret;
            }
        }

        if(!available || !ps ){
            ret = '状态同步中';
            return ret;
        }

        return ret;
    }
    
    /*****vm 展示的电源状态******/
    function renderStatus(status){
        //var desc = getStatus(row.powerstate, row.available, row.vmcreatetime, row.lastopttime, row.lastopt, VM.serverTs);
        var html = '';
        if(status == '运行中'){
            html += '<img alt="运行状态" src="'+config.PUBLIC+'/img/VMg1.jpg" style="margin-right:4px;" />';
        }else if(status == '已关机'){
            html += '<img alt="停止状态" src="'+config.PUBLIC+'/img/cc3.png" style="margin-right:4px;margin-top:4px;" />';
        }else if(status.indexOf('中') >= 0){
            html += '<img alt="操作中" src="'+config.PUBLIC+'/js/layer/skin/default/small-2.gif" style="margin-right:4px;"/> ';
        }else if(status == '欠费停机'){
        	html += '<img alt="欠费停机" src="'+config.PUBLIC+'/img/stop.png" style="margin-right:4px;"/>';
        }else{
            html += '<img alt="状态失败" src="'+config.PUBLIC+'/img/cc1.png" style="margin-right:4px;"/>';
        }

        html += '<span>' + status + '</span>';

        return html;
    }    
    
    /***disk 状态前端展示***/
    function renderDiskStatus(status){
        var html = '';
        switch(status){
        	case '正常使用':
        		html += '<img alt="正常使用" src="'+config.PUBLIC+'/img/VMg1.jpg" style="margin-right:4px;"/>';
        		break;
        	case '欠费停用':
        		html += '<img alt="欠费停用" src="'+config.PUBLIC+'/img/stop.png" style="margin-right:4px;"/>';
        		break;
            case '客户欠费':
                html += '<img alt="欠费停用" src="'+config.PUBLIC+'/img/stop.png" style="margin-right:4px;"/>';
                break;
        	case '暂不可用':
        		html += '<img alt="暂不可用" src="'+config.PUBLIC+'/img/cc1.png" style="margin-right:4px;"/>';
        		break;        		
        	default:
        		break;
        }

        html += '<span>' + status + '</span>';

        return html;
    }
    
    //开关机按钮变化
    function checkChecked(checked){
    	if (checked) {
    		$(".VMlink_5").addClass('VMlink_5_Ok');
    	} else{
    		$(".VMlink_5").removeClass('VMlink_5_Ok');
    	}
    }    


    // ===== main ======
    /*
    if( typeof layer !== 'undefined' ){

        _layer = layer; // 保存本层layer
        layer = top.layer;// 全局化layer

        var layerMsg = function(msg, options){
            var settings = {
                skin: 'layer-ext-moon'
            };
            $.extend(settings, options);

            return layer.alert(msg, settings);
        };

        function layerSuccMsg(msg, options){
            var settings = {
                  icon: 1
            };
            $.extend(settings, options);

            return layerMsg(msg, settings);
        };

        function layerErrorMsg(msg, options){
            var settings = {
                  icon: 0
            };
            $.extend(settings, options);

            return layerMsg(msg, settings);
        };
    }
    */

    /**
     通用html模板部分
     **/
     function getDestoryVMDetailHtml(priceData){
        var m = priceData;
        var detailHtml = '<ul style="list-style: none;">';
        detailHtml += '<li>云主机：<span class="price-number" style="font-size: 20px;">' + (m.vm.op == 1 ? '+' : '-') + ' ' + m.vm.total + '</span></li>';
        for(var k in m.disk){
            var n = m.disk[k];

            detailHtml += '<li>云硬盘(' + diskDescMap[n.disk_type] + ',' + (n.disk_usetype == 'DATA' ? '数据盘' : '系统盘') + ',' + n.disk_size + 'G): <span class="price-number" style="font-size: 20px;">' + (n.op == 1 ? '+' : '-') + ' ' + n.total + '</span></li>';
        }

        for(var i in m.ip){
            var n = m.ip[i];
            detailHtml += '<li>IP(' + ipTypeDescMap[n.iptype] +'): <span class="price-number" style="font-size: 20px;">' + (n.op == 1 ? '+' : '-') + ' ' + n.total + '</span></li>';
        }
        
        detailHtml += '</ul>';

        var html = '<div style="width: 330px;">' + 
            '<div style="font-size: 16px;color: #f60;text-indent: 6px;">该操作会销毁云主机及数据，是否确定？</div>' + 
                '<div style="padding: 10px;margin-top: 24px;border: 1px solid #ddd; font-size: 14px;">' + 
                '<p>销毁后总金额变化：&nbsp; <span class="price-number">' + (m.op == 1 ? '+' : '-') + ' ' + m.total + '</span> 元</p>' + 
                '<p style="margin-top: 15px;border-top: 1px solid #ccc;color: #FE6501;padding-top: 10px;">费用明细：</p>' + 
                '<div>' + 
                    detailHtml + 
                '</div>' + 
            '</div>' + 
        '</div>';

        return html;
    }
    
    function getDestoryTplVMDetailHtml(priceData){
        var mdata = priceData.zdata.data;//代理商，写反了。。
        var zdata = priceData.mdata.data;//模版

        var detailHtml = '<style type="text/css">.money_ul{font-family: "microsoft yahei",arial;} ul { margin:0;}</style>';
        detailHtml += '<ul style="list-style: none;" class="money_ul">';
        detailHtml += '<li>云主机：<span class="price-number" style="font-size: 20px;">' + (mdata.vm.op == 1 ? '+' : '-') + ' ' + mdata.vm.total + '</span></li>';
        for(var k in mdata.disk){
            var n = mdata.disk[k];

            detailHtml += '<li>云硬盘(' + diskDescMap[n.disk_type] + ',' + (n.disk_usetype == 'DATA' ? '数据盘' : '系统盘') + ',' + n.disk_size + 'G): <span class="price-number" style="font-size: 20px;">' + (n.op == 1 ? '+' : '-') + ' ' + n.total + '</span></li>';
        }
        for(var k in mdata.ip){
            var n = mdata.ip[k];
            if(n.total)
                detailHtml += '<li>IP(' + bandDescMap[n.iptype]+'): <span class="price-number" style="font-size: 20px;">' + (n.op == 1 ? '+' : '-') + ' ' + n.total + '</span></li>';
        }
        
        detailHtml += '</ul>';

        var  tplDetailHtml = '<ul style="list-style: none;" class="money_ul">';
        tplDetailHtml += '<li>云主机：<span class="price-number" style="font-size: 20px;">' + (zdata.vm.op == 1 ? '+' : '-') + ' ' + zdata.vm.total + '</span></li>';
        for(var k in zdata.disk){
            var n = zdata.disk[k];
            tplDetailHtml += '<li>云硬盘(' + diskDescMap[n.disk_type] + ',' + (n.disk_usetype == 'DATA' ? '数据盘' : '系统盘') + ',' + n.disk_size + 'G): <span class="price-number" style="font-size: 20px;">' + (n.op == 1 ? '+' : '-') + ' ' + n.total + '</span></li>';
        }
        for(var k in zdata.ip){
            var n = zdata.ip[k];
            if(n.total)
                tplDetailHtml += '<li>IP(' + bandDescMap[n.iptype]+'): <span class="price-number" style="font-size: 20px;">' + (n.op == 1 ? '+' : '-') + ' ' + n.total + '</span></li>';
        }
        
        tplDetailHtml += '</ul>';

        var html = '<div style="width: 330px;" class="money_ul">' + 
            '<div style="font-size: 16px;color: #f60;text-indent: 6px;">该操作会销毁云主机及数据，是否确定？</div>' + 
                '<div style="padding: 10px;margin-top: 24px;border: 1px solid #ddd; font-size: 14px;">' + 
                '<p>销毁后总金额变化：&nbsp; <span class="price-number" style="color:">' + (mdata.op == 1 ? '+' : '-') + ' ' + mdata.total + '</span> 元</p>' +
                 '<p>销毁后客户总金额变化：&nbsp; <span class="price-number" style="color:">' + (zdata.op == 1 ? '+' : '-') + ' ' + zdata.total + '</span> 元</p>' +  
                '<p style="margin-top: 15px;border-top: 1px solid #ccc;color: #FE6501;padding-top: 10px;">费用明细：</p>' + 
                '<div>' + 
                    detailHtml +
                '</div>' + 
                '<p style="margin-top: 0px;color: #FE6501;padding-top: 10px;">客户费用明细：</p>' + 
                '<div>' + 
                    tplDetailHtml +
                '</div>' + 
            '</div>' + 
        '</div>';

        return html;
    }

    function getLayerTotalMoneyHintHtml(){
        var totalPrice = top.total_money;
        var html = '<div style="text-align: center;margin-top: 15px;margin-bottom: -10px;">' + 
                '当前可用余额: ￥<span style="font-size: 20px;color: #3DC771;margin: 0 4px 0 8px;">' + parseFloat(totalPrice).formatMoney() + '</span>' + 
                '</div>';
         return html;
    };

    function getDistributeVMDetailHtml(data){
        var disk = data.disk;
        var ip = data.ip;
        var queue =[];
        var detailHtml = '<style type="text/css">.money_ul{font-family: "microsoft yahei",arial;} ul { margin:0;}</style>';
        detailHtml += '<ul style="list-style: none;" class="money_ul">';
        detailHtml += '<li>云主机：<span class="price-number" style="font-size: 20px;">'  + data.vm_totalmoney + '</span></li>';
        for(var k in disk){
            var n = disk[k];
            detailHtml += '<li>云硬盘(' + diskDescMap[n.disk_type] + ',' + (n.disk_usetype == 'DATA' ? '数据盘' : '系统盘') + ',' + n.disk_size + 'G): <span class="price-number" style="font-size: 20px;">' + n.data.totalmoney + '</span></li>';
            queue = n.data.queue ? n.data.queue : [];
            for(var j in queue){
                 var q = queue[j];
                detailHtml += '<li style="margin-left:5px;">---快照(' + (q.queue_type == 'fixed' ? '固定':'自动')+'): <span class="price-number" style="font-size: 20px;">'+ q.data.totalmoney + '</span></li>';
            }
        }
        for(var j in ip){
             var n = ip[j];
            detailHtml += '<li>IP(' + bandDescMap[n.iptype]+'): <span class="price-number" style="font-size: 20px;">'+ n.data.totalmoney + '</span></li>';
        }

        detailHtml += '</ul>';


        var html = '<div class="money_ul">' + 
            // '<div style="font-size: 16px;color: #f60;text-indent: 6px;">该操作会销毁云主机及数据，是否确定？</div>' + 
                '<div style="padding: 10px;margin-top: 0px;border: 1px solid #ddd; font-size: 14px;">' + 
                '<p>过户后将扣除该用户：&nbsp; <span class="price-number" style="color:#f60">' +data.totalmoney+ '</span> 元</p>' +
                 // '<p>销毁后模板用户总金额变化：&nbsp; <span class="price-number" style="color:">' + (zdata.op == 1 ? '+' : '-') + ' ' + zdata.total + '</span> 元</p>' +  
                '<p style="margin-top: 15px;border-top: 1px solid #ccc;color: #FE6501;padding-top: 10px;">费用明细：</p>' + 
                '<div>' + 
                    detailHtml +
                '</div>' + 
            '</div>' + 
        '</div>';

        return html;
    }
