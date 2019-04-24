package com.jk.controller;

import com.jk.mapper.TravelMapper;
import com.jk.pojo.Order;
import com.jk.pojo.TravelInfo;
import com.jk.pojo.User;
import com.jk.service.TravelApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
@Controller
public class TravelController implements TravelApi {
    @Autowired
    private TravelMapper travelMapper;
    @GetMapping("getTravelInfo")
    @ResponseBody
    @Override
    public List<TravelInfo> getTravelInfo() {

        return travelMapper.getTravelInfo();
    }

    @Override
    @GetMapping("getTravelDetail")
    @ResponseBody
    public List<TravelInfo> getTravelDetail(@RequestParam("ids")Integer ids) {
        return travelMapper.getTravelDetail(ids);
    }
    @PostMapping("login")
    @ResponseBody
    @Override
    public User login(@RequestBody User user) {
        User user1=  travelMapper.login(user.getUsername());

        return user1;
    }



}
