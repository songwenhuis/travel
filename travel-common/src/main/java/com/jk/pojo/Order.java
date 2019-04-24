package com.jk.pojo;

public class Order extends TravelInfo {
    private String id;
    private Integer userId;
    private Integer productId;
    private String usernameInfo;
    private String username;
    //身份证
    private String identity;
    private Integer num;
    //手机
    private String phone;
    //电话
    private String telephone;
    //备注
    private String remarks;
    //编号
    private String serialNum;
    //出发日期
    private String startDate;

    private Double totalPrice;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsernameInfo() {
        return usernameInfo;
    }

    public void setUsernameInfo(String usernameInfo) {
        this.usernameInfo = usernameInfo;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getSerialNum() {
        return serialNum;
    }

    public void setSerialNum(String serialNum) {
        this.serialNum = serialNum;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", usernameInfo='" + usernameInfo + '\'' +
                ", username='" + username + '\'' +
                ", identity='" + identity + '\'' +
                ", num=" + num +
                ", phone='" + phone + '\'' +
                ", telephone='" + telephone + '\'' +
                ", remarks='" + remarks + '\'' +
                ", serialNum='" + serialNum + '\'' +
                ", startDate='" + startDate + '\'' +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
