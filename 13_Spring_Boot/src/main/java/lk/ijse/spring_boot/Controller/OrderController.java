package lk.ijse.spring_boot.Controller;

import lk.ijse.spring_boot.dto.OrderDTO;
import lk.ijse.spring_boot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/order")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/save")
    public ResponseEntity<String> saveOrder(@RequestBody OrderDTO orderDTO) {
        if (orderDTO.getOrderId() == null || orderDTO.getCustomerId() == null ||
                orderDTO.getOrderDetails() == null || orderDTO.getOrderDetails().isEmpty()) {
            return new ResponseEntity<>("Invalid order data", HttpStatus.BAD_REQUEST);
        }

        boolean saved = orderService.saveOrder(orderDTO);
        if (saved) {
            return new ResponseEntity<>("Order saved successfully", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to save order", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}