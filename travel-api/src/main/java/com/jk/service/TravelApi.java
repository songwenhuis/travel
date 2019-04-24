package com.jk.service;

import com.jk.pojo.Order;
import com.jk.pojo.TravelInfo;
import com.jk.pojo.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface TravelApi {
    @GetMapping("getTravelInfo")
    List<TravelInfo> getTravelInfo();
    @GetMapping("getTravelDetail")
    List<TravelInfo> getTravelDetail(@RequestParam("ids") Integer ids);
    @PostMapping("login")
    User login(@RequestBody User user);
}
