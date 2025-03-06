package lk.ijse.spring_boot.service.Impl;

import lk.ijse.spring_boot.Repo.CustomerRepo;
import lk.ijse.spring_boot.dto.CustomerDTO;
import lk.ijse.spring_boot.entity.Customer;
import lk.ijse.spring_boot.service.CustomerService;
import lk.ijse.spring_boot.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private  ModelMapper modelMapper;

    @Override
    public void addCustomer(CustomerDTO customerDTO){
        if (customerRepo.existsById(customerDTO.getId())){
            throw new RuntimeException("Customer Already Exists");
        }
        Customer customer = modelMapper.map(customerDTO, Customer.class);
        customerRepo.save(customer);
    }
    @Override
    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customers = customerRepo.findAll();
        List<CustomerDTO> customerDTOS = new ArrayList<>();
        for (Customer customer : customers) {
            CustomerDTO customerDTO = modelMapper.map(customer, CustomerDTO.class);
            customerDTOS.add(customerDTO);
        }
        return customerDTOS;
    }
    @Override

    public void updateCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getId())){
            Customer customer = modelMapper.map(customerDTO, Customer.class);
            customerRepo.save(customer);
        }else{
            throw new RuntimeException("Customer Not Found");
        }
    }
    @Override
    public void deleteCustomer(String id) {
        if (customerRepo.existsById(id)){
            customerRepo.deleteById(id);
        }else{
            throw new RuntimeException("Customer Not Found");
        }
    }

    @Override
    public String generateNextCustomerId() {
        Customer customer = customerRepo.findFirstByOrderByIdDesc();
        if (customer == null) {
            return "C001";
        }
        String lastNumber = customer.getId().substring(1);
        int newNumber = Integer.parseInt(lastNumber) + 1;
        if (newNumber < 10) {
            return "C00" + newNumber;
        } else if (newNumber < 100) {
            return "C0" + newNumber;
        } else {
            return "C" + newNumber;
        }
    }
    @Transactional
    public Integer getCustomerCount() {
        return customerRepo.getCustomerCount();
    }
}
