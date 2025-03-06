package lk.ijse.spring_boot.service;

import lk.ijse.spring_boot.dto.CustomerDTO;
import lk.ijse.spring_boot.util.ResponseUtil;

import java.util.List;

public interface CustomerService {
    void addCustomer(CustomerDTO customerDTO);
    List<CustomerDTO> getAllCustomers();
    void updateCustomer(CustomerDTO customerDTO);
    void deleteCustomer(String id);
    String generateNextCustomerId();
    Integer getCustomerCount();

}
