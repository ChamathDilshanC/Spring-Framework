package lk.ijse.spring_boot.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {
    private String orderId;
    private LocalDateTime orderDate;
    private String customerId;
    private List<OrderDetailDTO> orderDetails;
    private double total;

    public OrderDTO() {
    }

    public OrderDTO(String orderId, LocalDateTime orderDate, String customerId, List<OrderDetailDTO> orderDetails, double total) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.orderDetails = orderDetails;
        this.total = total;
    }

    // Getters and Setters
    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public List<OrderDetailDTO> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetailDTO> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}