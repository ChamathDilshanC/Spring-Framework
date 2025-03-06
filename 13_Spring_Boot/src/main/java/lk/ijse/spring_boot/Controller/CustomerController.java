package lk.ijse.spring_boot.Controller;

import lk.ijse.spring_boot.dto.CustomerDTO;
import lk.ijse.spring_boot.service.Impl.CustomerServiceImpl;
import lk.ijse.spring_boot.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin(origins = "*")
public class    CustomerController {
    // Property Injection
    @Autowired
    private CustomerServiceImpl customerService;

    @GetMapping(path = "getAll")
    public ResponseUtil getCustomer() {
        System.out.println(customerService.getAllCustomers());
        return  new ResponseUtil(200, "Customer List", customerService.getAllCustomers());
    }

    @PostMapping(path = "save" , consumes = "application/json")
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.addCustomer(customerDTO);
        return new ResponseUtil(201, "Customer Added Successfully", null);
    }
    @PutMapping(path = "update" , consumes = "application/json")
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO customerDTO){
        customerService.updateCustomer(customerDTO);
        return new ResponseUtil(201, "Customer Updated Successfully", null);
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseUtil deleteCustomer(@PathVariable("id") String id){
        customerService.deleteCustomer(id);
        return new ResponseUtil(201, "Customer Deleted Successfully", null);
    }
    @GetMapping(path = "generateNextId")
    public ResponseUtil generateId() {
        return new ResponseUtil(201, "Customer Id Generated", customerService.generateNextCustomerId());
    }
    @GetMapping(path = "getCustomerCount")
    public Integer getCustomerCount() {
        Integer customerCount = customerService.getCustomerCount();
        return new ResponseUtil(200, "Customer Count", customerCount).getCode();
    }
    
}
