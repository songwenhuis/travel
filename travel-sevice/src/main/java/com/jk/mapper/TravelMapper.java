package com.jk.mapper;

import com.jk.pojo.TravelInfo;

import java.util.List;

public interface TravelMapper {
    List<TravelInfo> getTravelInfo();

    List<TravelInfo> getTravelDetail(Integer ids);
}
