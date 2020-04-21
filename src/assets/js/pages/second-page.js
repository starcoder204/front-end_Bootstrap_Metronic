jQuery(document).ready(function() {
    let necessary_data = JSON.parse(localStorage.getItem('necessary_data'));
    console.log(necessary_data);
    var credit_code = necessary_data.credit_code;
    
    var local_domain = 'http://localhost:8000'; // Laravel default port is 8000
    var server_domail = 'http://3.135.17.97:3000' // online 

    $.ajax({
        url: local_domain + '/api/businessInfo?keyword=' + credit_code,
        type: 'GET',
        dataType: 'json', // added data type
        headers: { "Accept": "application/json", 'Access-Control-Allow-Origin': '*'},
        success: function(res) {
            console.log(res);
            if (res.code == 0 && res.Status == "200") {
                let res_businessInfo = res;
                var businessInfo = res_businessInfo.data.Result[0];
                $('#company_name').html(businessInfo.Name);
                $('#oper_name').html(businessInfo.OperName);
                $('#company_no').html(businessInfo.No);
                $('#credit_code').html(businessInfo.CreditCode);
                $('#key_no').html(businessInfo.KeyNo);
                $('#start_date').html(businessInfo.StartDate.split(' ')[0]);
            }
        }
    });

    $.ajax({
        url: local_domain + '/api/taxRegistration?keyword=' + credit_code,
        type: 'GET',
        dataType: 'json', // added data type
        headers: { "Accept": "application/json", 'Access-Control-Allow-Origin': '*'},
        success: function(res) {
            console.log(res);
            if (res.code == 0 && res.Status == "200") {
                let res_taxRegistration = res;
                var taxRegistration = res_taxRegistration.data.Result;
                $('#eco_kind').html(taxRegistration.EconKind);
                $('#company_status').html(taxRegistration.Status);
                $('#company_address').html(taxRegistration.Address);
                $('#company_tel').html(taxRegistration.Tel);
            }
        }
    });

    $.ajax({
        url: local_domain + '/api/riskScan?keyword=' + credit_code,
        type: 'GET',
        dataType: 'json', // added data type
        headers: { "Accept": "application/json", 'Access-Control-Allow-Origin': '*'},
        success: function(res) {
            console.log(res);
            if (res.code == 0 && res.Status == "200") {
                let res_riskScan = res;
                var APTotalCount = res_riskScan.data.Result.APTotalCount;
                $('#AP_total_count').html(APTotalCount);
                var APList = res_riskScan.data.Result.APList;

                var block_item = $('.case-reason-block')[0];
                $('#APList_div').html('');
                for (var i = 0; i < APList.length; i++) {
                        $('#APList_div').append($(block_item).html());
                        $($('.case-no')[i]).html('No ' + (i+1));
                        $($('.case-reason')[i]).html(APList[i].CaseReason);
                }
            }
        }
    });

    // display static data if AJAX call is failed
    setTimeout(function() {
       var res_businessInfo = {"code":0,"message":"success","data":{"OrderNumber":"ECI2020042109581444802728","Paging":{"PageSize":10,"PageIndex":1,"TotalRecords":1},"Result":[{"KeyNo":"181e23a3c35a6fc18450f03cc13bb03b","Name":"腾讯科技（深圳）有限公司","OperName":"马化腾","StartDate":"2000-02-24 00:00:00","Status":"存续","No":"440301503270924","CreditCode":"9144030071526726XG"}],"Status":"200","Message":"查询成功"}};
       var businessInfo = res_businessInfo.data.Result[0];
       $('#company_name').html(businessInfo.Name);
       $('#oper_name').html(businessInfo.OperName);
       $('#company_no').html(businessInfo.No);
       $('#credit_code').html(businessInfo.CreditCode);
       $('#key_no').html(businessInfo.KeyNo);
       $('#start_date').html(businessInfo.StartDate.split(' ')[0]);

       var res_taxRegistration = {"code":0,"message":"success","data":{"Result":{"Name":"腾讯科技（深圳）有限公司","CreditCode":"9144030071526726XG","EconKind":"有限责任公司(台港澳法人独资)","Status":"存续（在营、开业、在册）","Address":"深圳市南山区高新区科技中一路腾讯大厦35层","Tel":"0755-86013388"},"Status":"200","Message":"查询成功"}};
       var taxRegistration = res_taxRegistration.data.Result;
       $('#eco_kind').html(taxRegistration.EconKind);
       $('#company_status').html(taxRegistration.Status);
       $('#company_address').html(taxRegistration.Address);
       $('#company_tel').html(taxRegistration.Tel);

       var res_creditRating = {"code":0,"message":"success","data":{"OrderNumber":"CREDITRATING2020042110140817671598","Result":null,"Status":"201","Message":"查询无结果"}};
       var orderNumber = res_creditRating.data.OrderNumber;

       var res_riskScan = {"code":0,"message":"success","data":{"OrderNumber":"RISKSCAN2020042110124987248453","Result":{"KeyNo":"181e23a3c35a6fc18450f03cc13bb03b","Name":"腾讯科技（深圳）有限公司","UpdatedDate":"2020-04-21","OperList":null,"PartnerList":null,"SxCount":0,"ZxCount":0,"JudgementTotalCount":39,"APList":[{"CaseReason":"经调查，本机关认为你（单位）在2017年10月24日 09时50分在（违法地点）南山区后海大道、滨海大道海天二路实施了未按照批准的位置、面积、期限占用或者挖掘城市道路，或者需要移动位置、扩大面积、延长时间，未提前办理变更审批手续的的违法行为","Count":1}],"APTotalCount":1,"JSCount":0,"ExList":[],"ExCount":0,"CSACount":247,"TiCount":0,"PledgeCount":0,"MPledgeCount":0,"AssistanceCount":0,"CTACount":55,"LMCount":0,"ENPList":[],"ENPTotalCount":0},"Status":"200","Message":"查询成功"}};
       var APTotalCount = res_riskScan.data.Result.APTotalCount;
       $('#AP_total_count').html(APTotalCount);
       var APList = res_riskScan.data.Result.APList;

       var block_item = $('.case-reason-block')[0];
       $('#APList_div').html('');
       for (var i = 0; i < APList.length; i++) {
            $('#APList_div').append($(block_item).html());
            $($('.case-no')[i]).html('No ' + (i+1));
            $($('.case-reason')[i]).html(APList[i].CaseReason);
       }
    }, 1000);

});