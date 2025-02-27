package lk.ijse.spring_boot.service.Impl;

import lk.ijse.spring_boot.Repo.CustomerRepo;
import lk.ijse.spring_boot.Repo.ItemRepo;
import lk.ijse.spring_boot.Repo.OrderRepo;
import lk.ijse.spring_boot.dto.OrderDTO;
import lk.ijse.spring_boot.dto.OrderDetailDTO;
import lk.ijse.spring_boot.entity.Customer;
import lk.ijse.spring_boot.entity.Item;
import lk.ijse.spring_boot.entity.Order;
import lk.ijse.spring_boot.entity.OrderDetail;
import lk.ijse.spring_boot.service.OrderService;
import lk.ijse.spring_boot.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Override
    @Transactional
    public ResponseUtil saveOrder(OrderDTO orderDTO) {
        // Validate order existence
        if (orderRepo.existsById(orderDTO.getOrderId())) {
            return new ResponseUtil(400, "Order Already Exists", null);
        }

        // Validate customer
        Optional<Customer> customer = customerRepo.findById(orderDTO.getCustomerId());
        if (customer.isEmpty()) {
            return new ResponseUtil(404, "Customer Not Found", null);
        }

        List<OrderDetail> orderDetails = new ArrayList<>();
        double totalAmount = 0.0;

        // Process each order detail
        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetails()) {
            Optional<Item> item = itemRepo.findById(detailDTO.getItemCode());

            if (item.isEmpty()) {
                return new ResponseUtil(404, "Item Not Found: " + detailDTO.getItemCode(), null);
            }

            Item itemEntity = item.get();
            if (itemEntity.getQty() < detailDTO.getQuantity()) {
                return new ResponseUtil(400, "Insufficient Stock for Item: " + itemEntity.getName(), null);
            }

            // Update item stock
            itemEntity.setQty(itemEntity.getQty() - detailDTO.getQuantity());
            itemRepo.save(itemEntity);

            // Create order detail
            OrderDetail detail = new OrderDetail(
                    itemEntity,
                    detailDTO.getQuantity(),
                    detailDTO.getUnitPrice()
            );
            orderDetails.add(detail);

            // Calculate total
            totalAmount += (detailDTO.getQuantity() * detailDTO.getUnitPrice());
        }

        // Create and save order
        Order order = new Order(
                orderDTO.getOrderId(),
                LocalDateTime.now(),
                customer.get(),
                orderDetails,
                totalAmount
        );

        orderRepo.save(order);
        return new ResponseUtil(201, "Order Added Successfully", null);
    }

    @Override
    public String generateNextOrderId() {
        Order order = orderRepo.findFirstByOrderByOrderIdDesc();
        if (order == null) {
            return "OD001";
        } else {
            String lastId = order.getOrderId();
            int newId = Integer.parseInt(lastId.substring(2)) + 1;
            if (newId < 10) {
                return "OD00" + newId;
            } else if (newId < 100) {
                return "OD0" + newId;
            } else {
                return "OD" + newId;
            }
        }

    }
}