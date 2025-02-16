package lk.ijse.spring_boot.service;

import lk.ijse.spring_boot.Repo.CustomerRepo;
import lk.ijse.spring_boot.dto.CustomerDTO;
import lk.ijse.spring_boot.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo customerRepo;
    public CustomerService() {
        System.out.println("CustomerService Instantiated...");
    }

    public boolean addCustomer(CustomerDTO customerDTO){
        if (customerRepo.existsById(customerDTO.getId())){
            return false;
        }else{
            Customer customer = new Customer(customerDTO.getId(), customerDTO.getName(), customerDTO.getAddress());
            customerRepo.save(customer);
            return true;
        }
    }

    public List<CustomerDTO> getAllCustomers() {
        List<Customer> all = customerRepo.findAll();
        List<CustomerDTO> customerDTOS = new ArrayList<>();
        for (Customer customer : all) {
            CustomerDTO customerDTO = new CustomerDTO(customer.getId(), customer.getName(), customer.getAddress());
            customerDTOS.add(customerDTO);
        }
        return customerDTOS;
    }

    public boolean updateCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getId())){
            Customer customer = new Customer(customerDTO.getId(), customerDTO.getName(), customerDTO.getAddress());
            customerRepo.save(customer);
            return true;
        }else{
            return false;
        }
    }

    public boolean deleteCustomer(String id) {
        if (customerRepo.existsById(id)){
            customerRepo.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
}
