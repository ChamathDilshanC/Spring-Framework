package lk.ijse.spring_boot.Repo;

import lk.ijse.spring_boot.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order,String> {
    Order findFirstByOrderByOrderIdDesc();
}
