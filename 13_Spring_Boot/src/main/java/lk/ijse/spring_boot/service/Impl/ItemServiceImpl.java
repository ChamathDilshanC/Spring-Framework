package lk.ijse.spring_boot.service.Impl;

import lk.ijse.spring_boot.Repo.ItemRepo;
import lk.ijse.spring_boot.dto.ItemDTO;
import lk.ijse.spring_boot.entity.Item;
import lk.ijse.spring_boot.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepo itemRepo;

    @Override
    public List<ItemDTO> getAllItems() {
        List<Item> all = itemRepo.findAll();
        List<ItemDTO> itemDTOS = new ArrayList<>();
        for (Item item : all) {
            ItemDTO itemDTO = new ItemDTO(item.getItemCode(), item.getName(), item.getPrice(), item.getQty());
            itemDTOS.add(itemDTO);
        }
        return itemDTOS;
    }

    @Override
    public void addItem(ItemDTO itemDTO) {
        if (!itemRepo.existsById(itemDTO.getItemCode())) {
            Item item = new Item(itemDTO.getItemCode(), itemDTO.getName(), itemDTO.getPrice(), itemDTO.getQty());
            itemRepo.save(item);
        } else {
            throw new RuntimeException("Item Already Exists");
        }
    }
    @Override
    public void updateItem(ItemDTO itemDTO) {
        if (itemRepo.existsById(itemDTO.getItemCode())) {
            Item item = new Item(itemDTO.getItemCode(), itemDTO.getName(), itemDTO.getPrice(), itemDTO.getQty());
            itemRepo.save(item);
        } else {
            throw new RuntimeException("Item Not Found");
        }
    }
    @Override
    public void deleteItem(String id) {
        if (itemRepo.existsById(id)) {
            itemRepo.deleteById(id);
        } else {
            throw new RuntimeException("Item Not Found");
        }
    }

}
