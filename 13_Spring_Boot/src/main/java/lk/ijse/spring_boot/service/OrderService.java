package lk.ijse.spring_boot.service;

import lk.ijse.spring_boot.dto.OrderDTO;
import lk.ijse.spring_boot.util.ResponseUtil;

public interface OrderService {
    ResponseUtil saveOrder(OrderDTO orderDTO);
}
