package com.jk.controller;

import com.alibaba.fastjson.JSON;
import com.jk.pojo.Order;
import com.jk.pojo.TravelInfo;
import com.jk.pojo.User;
import com.jk.service.TravelService;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;


import org.apache.http.Consts;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("travel")
public class TravelController {
    @Resource
    private TravelService travelService;

    @Resource
    private ElasticsearchTemplate elasticsearchTemplate;
    @Resource
    private RedisTemplate<String ,Object> redisTemplate;
    @Resource
    private MongoTemplate mongoTemplate;

    @GetMapping("login")
    @ResponseBody
    public Boolean login(User user){
        User userinfo = travelService.login(user);
        if (userinfo!=null){
            redisTemplate.opsForValue().set("user",userinfo);
            redisTemplate.expire("user", 300, TimeUnit.SECONDS);


            return true;
        }

        return false;

    }

    @GetMapping("logOut")
    @ResponseBody
    public Boolean logOut(){
        User user = (User) redisTemplate.opsForValue().get("user");
        if (user!=null){
            redisTemplate.delete("user");
            return true;
        }
        return false;

    }
    @GetMapping("getSession")
    @ResponseBody
    public Boolean getSession(){
        User user = (User) redisTemplate.opsForValue().get("user");

        if (user!=null){
            return true;
        }else{
            return false;
        }
    }
    @GetMapping("findSession")
    @ResponseBody
    public User findSession(){
        User user = (User) redisTemplate.opsForValue().get("user");

        if (user!=null){
            return user;
        }else{
            return null;
        }
    }
    @GetMapping("queryOrder")
    @ResponseBody
    public List<Order>  queryOrder(){
        User user = (User) redisTemplate.opsForValue().get("user");
        Query query=new Query();
        Criteria criteria=new Criteria();
        criteria.andOperator(Criteria.where("userId").is(user.getUid()));
        query.addCriteria(criteria);
        List<Order> order = mongoTemplate.find(query, Order.class, "order");
        return order;
    }


    @PostMapping("addTravelDetail")
    @ResponseBody
    public void addTravelDetail(Order order){
        User user = (User) redisTemplate.opsForValue().get("user");
        System.out.println("order = [" + order + "]");
        //前台传过来的商品ID
        Integer productId = order.getProductId();
        Query query=new Query();
        Criteria criteria=new Criteria();
        criteria.andOperator(Criteria.where("productId").is(productId));
        query.addCriteria(criteria);
        List<Order> findorder = mongoTemplate.find(query, Order.class, "order");
        if (findorder.size()==0){
            order.setUserId(user.getUid());
            order.setUsernameInfo(user.getUsername());
            order.setTotalPrice(order.getNum()*order.getTravelPrice());
            mongoTemplate.save(order,"order");
        }else{
            for (Order order1 : findorder) {
                if (productId==order1.getProductId()){
                    Integer num=order1.getNum()+order.getNum();
                    Double aa=order.getTravelPrice()*order.getNum();
                    Double price=aa+order1.getTotalPrice();
                    Update update = Update.update("num", num).set("totalPrice",price);
                    mongoTemplate.updateFirst(query, update, Order.class,"order");
                }else{
                    order.setUserId(user.getUid());
                    order.setUsernameInfo(user.getUsername());
                    order.setTotalPrice(order.getNum()*order.getTravelPrice());
                    mongoTemplate.save(order,"order");
                }
            }



        }


    }


    @GetMapping("getTravelDetail")
    @ResponseBody
    public List<TravelInfo> getTravelDetail(Integer ids){

        List<TravelInfo> list = new ArrayList<TravelInfo>();

        list=travelService.getTravelDetail(ids);


        return list;
    }

    @GetMapping("getTravelInfo")
    @ResponseBody
    public List<TravelInfo> getTravelInfo(){

        List<TravelInfo> list = new ArrayList<TravelInfo>();
        String key="TravelInfo";
        Boolean info = redisTemplate.hasKey(key);
        if (info){
            list = (List<TravelInfo>) redisTemplate.opsForValue().get(key);
            System.out.println("走缓存");
        }else{
            list=travelService.getTravelInfo();
            redisTemplate.opsForValue().set(key, list);
            redisTemplate.expire(key, 30, TimeUnit.SECONDS);
            System.out.println("走数据库");
        }
        return list;
    }

    @GetMapping("querySearch")
    @ResponseBody
    public List<TravelInfo> querySearch(TravelInfo travelInfo){
        Client client = elasticsearchTemplate.getClient();
        SearchRequestBuilder searchRequestBuilder = client.prepareSearch("travel").setTypes("elTravel")
                ;



           // searchRequestBuilder.setQuery(QueryBuilders.boolQuery().must(QueryBuilders.rangeQuery("traveltitleinfo").gte(travelInfo.getTravelTitleInfo())));
        searchRequestBuilder .setQuery(QueryBuilders.matchQuery("traveltitleinfo", travelInfo.getTravelTitleInfo()));

        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.field("traveltitleinfo");
        highlightBuilder.preTags("<font color='red'>");
        highlightBuilder.postTags("</font>");
        //设置高亮查询
        searchRequestBuilder.highlighter(highlightBuilder);
        SearchResponse searchResponse = searchRequestBuilder.get();

        SearchHits hits = searchResponse.getHits();
        Iterator<SearchHit> iterator = hits.iterator();
       List<TravelInfo> list = new ArrayList<TravelInfo>();
       while (iterator.hasNext()){
           SearchHit next = iterator.next();
           String sourceAsString = next.getSourceAsString();
           Map<String, HighlightField> highlightFields = next.getHighlightFields();
           HighlightField travelTitleInfo = highlightFields.get("traveltitleinfo");

           TravelInfo travelInfo1 = JSON.parseObject(sourceAsString, TravelInfo.class);
           if (travelTitleInfo!=null){
               Text[] fragments= travelTitleInfo.fragments();
               String title = "";
               for (Text text1 : fragments) {
                   title += text1;
               }
               travelInfo1.setTravelTitleInfo(title);
           }

           list.add(travelInfo1);
       }
        return list;
    }
    @GetMapping(value="queryFlight", produces="application/json;charset=utf-8")
    @ResponseBody
    public String queryFlight(String startCity,String startDate,String endCity,String endDate) {

        String startDate1=startDate.replaceAll("-","");
        String endDate1=endDate.replaceAll("-","");


        ArrayList<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("START_CITY", startCity));
        params.add(new BasicNameValuePair("START_DATE", startDate1));
        params.add(new BasicNameValuePair("END_CITY", endCity));
        params.add(new BasicNameValuePair("END_DATE", endDate1));

//        params.add(new BasicNameValuePair("Authorization", "APPCODE " + "fcf7b6e607bb4668b2b90241545e7be7"));
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        String json = "";
        HttpGet httpGet = null;
        try {
            String paramsStr = EntityUtils.toString(new UrlEncodedFormEntity(params, Consts.UTF_8));
            httpGet = new HttpGet("http://plane.market.alicloudapi.com/ai_market/ai_airplane/get_airplane_list?" + paramsStr);
            httpGet.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1;"
                    + " Win64; x64; rv:50.0) Gecko/20100101 Firefox/50.0");
            httpGet.setHeader("Accept", "application/json");
            httpGet.setHeader("Authorization", "APPCODE " + "c16a85434f524d14bf107f56bc0b4507");
            httpGet.setHeader("Accept-Encoding", "gzip, deflate");
            httpGet.setHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            RequestConfig config = RequestConfig.custom()
                    .setConnectTimeout(10000)        //设置链接超时的时间1秒钟
                    .setSocketTimeout(10000)        //设置读取超时1秒钟
                    .build();                        //RequestConfig静态方法  setProxy  设置代理
            httpGet.setConfig(config);

            response = httpClient.execute(httpGet);

            json = EntityUtils.toString(response.getEntity(), "UTF-8");

            System.out.println(json);
        } catch (ParseException | IOException e) {
            e.printStackTrace();
        } finally {
            try {
                httpClient.close();
                response.close();
                httpGet.abort();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return json;
    }

}
