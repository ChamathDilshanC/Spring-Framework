package lk.ijse.spring_boot.service;

import lk.ijse.spring_boot.Repo.CustomerRepo;
import lk.ijse.spring_boot.Repo.ItemRepo;
import lk.ijse.spring_boot.Repo.OrderRepo;
import lk.ijse.spring_boot.dto.OrderDTO;

import lk.ijse.spring_boot.dto.OrderDetailDTO;
import lk.ijse.spring_boot.entity.Customer;
import lk.ijse.spring_boot.entity.Item;
import lk.ijse.spring_boot.entity.Order;
import lk.ijse.spring_boot.entity.OrderDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Transactional
    public boolean saveOrder(OrderDTO orderDTO) {
        if (orderRepo.existsById(orderDTO.getOrderId())) {
            return false;
        }

        Optional<Customer> customer = customerRepo.findById(orderDTO.getCustomerId());
        if (customer.isEmpty()) {
            return false;
        }

        List<OrderDetail> orderDetails = new ArrayList<>();

        for (OrderDetailDTO detailDTO : orderDTO.getOrderDetails()) {
            Optional<Item> item = itemRepo.findById(detailDTO.getItemCode());

            if (item.isEmpty()) {
                return false;
            }

            Item itemEntity = item.get();
            if (itemEntity.getQty() < detailDTO.getQuantity()) {
                return false;
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
        return true;
    }
}