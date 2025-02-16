package lk.ijse.spring_boot.service;

import lk.ijse.spring_boot.Repo.ItemRepo;
import lk.ijse.spring_boot.dto.ItemDTO;
import lk.ijse.spring_boot.entity.Customer;
import lk.ijse.spring_boot.entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepo itemRepo;

    public List<ItemDTO> getAllItems() {
        List<Item> all = itemRepo.findAll();
        List<ItemDTO> itemDTOS = new ArrayList<>();
        for (Item item : all) {
            ItemDTO itemDTO = new ItemDTO(item.getItemCode(), item.getName(), item.getPrice(), item.getQty());
            itemDTOS.add(itemDTO);
        }
        return itemDTOS;
    }

    public boolean addItem(ItemDTO itemDTO) {
        if (itemRepo.existsById(itemDTO.getItemCode())) {
            return false;
        }else {
            Item item = new Item(itemDTO.getItemCode(),itemDTO.getName(),itemDTO.getPrice(),itemDTO.getQty());
            itemRepo.save(item);
            return true;
        }
    }
}
