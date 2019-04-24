package com.jk.controller;

import com.jk.mapper.TravelMapper;
import com.jk.pojo.TravelInfo;
import com.jk.service.TravelApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
