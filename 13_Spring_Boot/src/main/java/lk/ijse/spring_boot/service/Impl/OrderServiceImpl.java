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
        if (orderRepo.existsById(orderDTO.getOrderId())) {
            throw new RuntimeException("Order Already Exists");
        }
        Optional<Customer> customer = customerRepo.findById(orderDTO.getCustomerId());
        if (customer.isEmpty()) {
            throw new RuntimeException("Customer Not Found");
        }

        List<OrderDetail> orderDetails = new ArrayList<>();

        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetails()) {
            Optional<Item> item = itemRepo.findById(detailDTO.getItemCode());

            if (item.isEmpty()) {
                throw new RuntimeException("Item Not Found");
            }

            Item itemEntity = item.get();
            if (itemEntity.getQty() < detailDTO.getQuantity()) {
                throw new RuntimeException("Not Enough Items");
            }
            itemEntity.setQty(itemEntity.getQty() - detailDTO.getQuantity());
            itemRepo.save(itemEntity);

            OrderDetail detail = new OrderDetail(
                    itemEntity,
                    detailDTO.getQuantity(),
                    detailDTO.getUnitPrice()
            );
            orderDetails.add(detail);
        }

        Order order = new Order(
                orderDTO.getOrderId(),
                orderDTO.getOrderDate(),
                customer.get(),
                orderDetails,
                orderDTO.getTotal()
        );

        orderRepo.save(order);
        return new ResponseUtil(201, "Order Added Successfully", null);
    }
}