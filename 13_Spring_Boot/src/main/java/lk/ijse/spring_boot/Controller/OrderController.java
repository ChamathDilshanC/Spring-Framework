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
    public ResponseEntity<ResponseUtil> saveOrder(@RequestBody OrderDTO orderDTO) {
        if (orderDTO.getOrderId() == null || orderDTO.getCustomerId() == null ||
                orderDTO.getOrderDetails() == null || orderDTO.getOrderDetails().isEmpty()) {
            return new ResponseEntity<>(new ResponseUtil(400, "Invalid order details", null), HttpStatus.BAD_REQUEST);
        }

        ResponseUtil response = orderService.saveOrder(orderDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}