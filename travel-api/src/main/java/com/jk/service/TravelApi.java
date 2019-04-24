package com.jk.service;

import com.jk.pojo.TravelInfo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface TravelApi {
    @GetMapping("getTravelInfo")
    List<TravelInfo> getTravelInfo();
    @GetMapping("getTravelDetail")
    List<TravelInfo> getTravelDetail(@RequestParam("ids") Integer ids);
}
