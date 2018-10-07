<?php
/**
 * 列表接口
 */
namespace app\api\controller;

use app\api\Service\JD_sdk\jd\JdClient;
use app\api\Service\JD_sdk\jd\request\ServicePromotionGoodsInfoRequest;

class ListController
{

    /*
     *搜索列表接口
     */
    public function search(){

        $keyword = $_REQUEST['q'];
        $page = empty($_REQUEST['page'])?1:$_REQUEST['page'];
        $sort_type = 'sort_brokerage_desc';

        $result = $this->getSearchList($keyword,$sort_type,$page);
        if(!empty($result)){
            $res_list = $this->jd_search($result);

            echo json_encode(array('error_code'=>200,
                'page'=>$_REQUEST['page'],
                'result'=>$res_list));
        }else{
            echo json_encode(array('error_code'=>60010));
        }

    }

    /*
     * 京东内部搜索列表接口
     */
    public function jd_search($search){

        $ids = array_column($search,'sku_id');

        $ids_str = implode(',',$ids);

        $c = new JdClient();

        $c->appKey = Config('appKey');
        $c->appSecret = Config('appSecret');
        $c->accessToken = Config('accessToken');

        $req = new ServicePromotionGoodsInfoRequest();

        $req->setSkuIds( $ids_str );

        $resp = $c->execute($req, $c->accessToken);

        $result = json_decode($resp->getpromotioninfo_result,true);

        $search_list = array();

        foreach ($search as $row){
            $search_list[$row['sku_id']] = $row;
        }

        $list = array();

        foreach ($result['result'] as $value){
            $sku_item = $search_list[$value['skuId']];

            $item = array();
            $item['pic_url'] = $value['imgUrl'];
            $item['item_url'] = $value['materialUrl'];
            $item['num_iid'] = $value['skuId'];
            $item['seller_id'] =  $value['shopId'];
            $item['zk_final_price_wap'] = $value['wlUnitPrice'];
            $item['zk_final_price'] = $value['unitPrice'];
            $item['title'] = $value['goodsName'];
            $item['commission_rate'] = $value['commisionRatioPc'];
            $item['commission_rate_wap'] = $value['commisionRatioWl'];
            $item['comment_num'] = $sku_item['comment_num'];
            $item['good_comment_num'] = $sku_item['good_comment_num'];
            $item['commission_fee'] = number_format($item['zk_final_price'] * ($item['commission_rate'] / 100),2) ;
            $item['commission_fee_wap'] = number_format($item['zk_final_price_wap'] * ($item['commission_rate_wap'] / 100),2) ;
            $list[] = $item;
         }

        return $list;
    }



    /**
     * 获取搜索列表
     */
    public function getSearchList($keyword,$sort_type='sort_brokerage_desc',$page=1){
        $url = 'https://ifanli.m.jd.com/swc/cjf';

        $content = array();

        $content['keyword'] = $keyword;
        $content['page'] = $page;
        $content['page_size'] = '20';
        $content['type'] = 'search_list';
        $content['sort_type'] = $sort_type;

        $heard = array(
            'Content-Type: application/json'
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "{\"keyword\":\"".$keyword."\",\"page\":$page,\"page_size\":".$content['page_size'].",\"type\":\"search_list\",\"sort_type\":\"".$sort_type."\"} ",
            CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
                "content-type: application/json",
                "host: ifanli.m.jd.com",
                "origin: https://ifanli.m.jd.com",
                "postman-token: 98f66a1c-7dfa-b322-409d-95f1e4033cf0",
                "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if(empty($err)){
            $result = array();
            $result = json_decode($response,true);

            return $result['content'];
        }else{
            return array();
        }
    }

    public function getGoodsInfoByIds($ids) {
        $c = new JdClient();

        $c->appKey = appKey;

        $c->appSecret = appSecret;

        $c->accessToken = accessToken;

        $c->serverUrl = SERVER_URL;

        $req = new ServicePromotionGoodsInfoRequest();

        $req->setSkuIds( "jingdong" );

        $resp = $c->execute($req, $c->accessToken);

    }
}