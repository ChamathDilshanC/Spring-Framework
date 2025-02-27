package lk.ijse.spring_boot.Controller;

import lk.ijse.spring_boot.dto.OrderDTO;
import lk.ijse.spring_boot.service.Impl.OrderServiceImpl;
import lk.ijse.spring_boot.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderServiceImpl orderService;

    @PostMapping("/save")
    public ResponseUtil saveOrder(@RequestBody OrderDTO orderDTO) {
        if (orderDTO.getOrderId() == null || orderDTO.getCustomerId() == null ||
                orderDTO.getOrderDetails() == null || orderDTO.getOrderDetails().isEmpty()) {
            return new ResponseUtil(400, "Invalid Order Details", null);
        }

        ResponseUtil response = orderService.saveOrder(orderDTO);
        return new ResponseUtil(response.getCode(), response.getMessage(), response.getData());
    }

    @GetMapping("/generateNextId")
    public ResponseUtil generateNextId() {
        return new ResponseUtil(201, "Order Id Generated", orderService.generateNextOrderId());
    }
}