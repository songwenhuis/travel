package com.jk.pojo;

import java.io.Serializable;


public class TravelInfo implements Serializable {
    private Integer travelId;
    //标题
    private String travelTitle;
    //标题信息
    private String travelTitleInfo;
    private String travelImg;
    private double travelPrice;
    private String travelType;
    //点评
    private String travelPraise;
    private String startCity;
    private String endCity;
    //满意度
    private String travelSatisfaction;

    public String getTravelPraise() {
        return travelPraise;
    }

    public void setTravelPraise(String travelPraise) {
        this.travelPraise = travelPraise;
    }

    public String getStartCity() {
        return startCity;
    }

    public void setStartCity(String startCity) {
        this.startCity = startCity;
    }

    public String getEndCity() {
        return endCity;
    }

    public void setEndCity(String endCity) {
        this.endCity = endCity;
    }

    public Integer getTravelId() {
        return travelId;
    }

    public void setTravelId(Integer travelId) {
        this.travelId = travelId;
    }

    public String getTravelTitle() {
        return travelTitle;
    }

    public void setTravelTitle(String travelTitle) {
        this.travelTitle = travelTitle;
    }

    public String getTravelTitleInfo() {
        return travelTitleInfo;
    }

    public void setTravelTitleInfo(String travelTitleInfo) {
        this.travelTitleInfo = travelTitleInfo;
    }

    public String getTravelImg() {
        return travelImg;
    }

    public void setTravelImg(String travelImg) {
        this.travelImg = travelImg;
    }

    public double getTravelPrice() {
        return travelPrice;
    }

    public void setTravelPrice(double travelPrice) {
        this.travelPrice = travelPrice;
    }

    public String getTravelType() {
        return travelType;
    }

    public void setTravelType(String travelType) {
        this.travelType = travelType;
    }

    public String getTravelSatisfaction() {
        return travelSatisfaction;
    }

    public void setTravelSatisfaction(String travelSatisfaction) {
        this.travelSatisfaction = travelSatisfaction;
    }

    @Override
    public String toString() {
        return "TravelInfo{" +
                "travelId=" + travelId +
                ", travelTitle='" + travelTitle + '\'' +
                ", travelTitleInfo='" + travelTitleInfo + '\'' +
                ", travelImg='" + travelImg + '\'' +
                ", travelPrice=" + travelPrice +
                ", travelType='" + travelType + '\'' +
                ", travelPraise='" + travelPraise + '\'' +
                ", startCity='" + startCity + '\'' +
                ", endCity='" + endCity + '\'' +
                ", travelSatisfaction='" + travelSatisfaction + '\'' +
                '}';
    }
}
