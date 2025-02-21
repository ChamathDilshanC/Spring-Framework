package lk.ijse.spring_boot.Repo;


import lk.ijse.spring_boot.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, String> {
    Customer findFirstByOrderByIdDesc();
    // Query Methods
    /*
    *//*List<Customer> findByName(String name);
    int countByAddress(String address);
    @Query(value = "SELECT * FROM Customer", nativeQuery = true)
    void getAllCustomers();*//*
    boolean searchById(String id);*/
    
}
