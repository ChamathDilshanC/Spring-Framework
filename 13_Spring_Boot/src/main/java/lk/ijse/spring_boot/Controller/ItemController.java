package lk.ijse.spring_boot.Controller;

import lk.ijse.spring_boot.dto.ItemDTO;
import lk.ijse.spring_boot.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("getAll")
    public List<ItemDTO> getAll (){
        List<ItemDTO> allItems = itemService.getAllItems();
        return  allItems;
    }


    @PostMapping("save")
    public boolean saveItem(@RequestBody ItemDTO itemDTO){
        return itemService.addItem(itemDTO);
    }
}
