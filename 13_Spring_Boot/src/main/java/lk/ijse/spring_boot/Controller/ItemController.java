package lk.ijse.spring_boot.Controller;

import lk.ijse.spring_boot.dto.ItemDTO;
import lk.ijse.spring_boot.service.Impl.ItemServiceImpl;
import lk.ijse.spring_boot.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/v1/item")
@CrossOrigin
public class ItemController {

    @Autowired
    private ItemServiceImpl itemService;

    @GetMapping("getAll")
    public ResponseUtil getAll (){
        return  new ResponseUtil(200, "Item List", itemService.getAllItems());
    }

    @PostMapping("save")
    public ResponseUtil saveItem(@RequestBody ItemDTO itemDTO){
        itemService.addItem(itemDTO);
        return new ResponseUtil(201, "Item Added Successfully", null);
    }

    @PutMapping("update")
    public ResponseUtil updateItem(@RequestBody ItemDTO itemDTO){
        itemService.updateItem(itemDTO);
        return new ResponseUtil(201, "Item Updated Successfully", null);
    }

    @DeleteMapping("delete/{id}")
    public ResponseUtil deleteItem(@PathVariable String id){
        itemService.deleteItem(id);
        return new ResponseUtil(201, "Item Deleted Successfully", null);
    }
    @GetMapping(path = "generateNextId")
    public ResponseUtil generateId(){
        return new ResponseUtil(201, "Item Id Generated", itemService.generateNextItemId());
    }
}
