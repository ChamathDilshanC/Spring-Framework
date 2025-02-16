package lk.ijse.repository;

import lk.ijse.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, String> {//entity ek saha primary key type


    @Override
    List<Customer> findAll();
}
