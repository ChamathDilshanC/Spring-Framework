package lk.ijse.spring_boot.Repo;

import lk.ijse.spring_boot.dto.OrderDetailDTO;
import lk.ijse.spring_boot.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepo extends JpaRepository<Item,String> {
    Item findFirstByOrderByItemCodeDesc();
}
