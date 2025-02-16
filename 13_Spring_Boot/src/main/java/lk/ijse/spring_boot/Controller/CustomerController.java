package lk.ijse.spring_boot.Controller;

import lk.ijse.spring_boot.dto.CustomerDTO;
import lk.ijse.spring_boot.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/customer")
public class    CustomerController {
    // Property Injection
    @Autowired
    private CustomerService customerService;

    @GetMapping(path = "getAll")
    public List<CustomerDTO> getCustomer(){
        List<CustomerDTO> allCustomers = customerService.getAllCustomers();
        return allCustomers;

    }

    @PostMapping(path = "save" , consumes = "application/json")
    public boolean saveCustomer(@RequestBody CustomerDTO customerDTO){
        return customerService.addCustomer(customerDTO);
    }

    @PostMapping(path = "update" , consumes = "application/json")
    public boolean updateCustomer(@RequestBody CustomerDTO customerDTO){
        return customerService.updateCustomer(customerDTO);
    }

    @DeleteMapping(path = "delete/{id}")
    public boolean deleteCustomer(@PathVariable("id") String id){
        return customerService.deleteCustomer(id);
    }


}
