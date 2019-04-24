package com.jk.service;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("travel-server")
public interface WebTest extends TravelApi {
}
