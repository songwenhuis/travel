package com.jk.mapper;

import com.jk.pojo.TravelInfo;
import com.jk.pojo.User;

import java.util.List;

public interface TravelMapper {
    List<TravelInfo> getTravelInfo();

    List<TravelInfo> getTravelDetail(Integer ids);

    User login(String username);
}
