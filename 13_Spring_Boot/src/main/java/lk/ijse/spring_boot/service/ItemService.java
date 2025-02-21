package lk.ijse.spring_boot.service;

import lk.ijse.spring_boot.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    List<ItemDTO> getAllItems();
    void addItem(ItemDTO itemDTO);
    void updateItem(ItemDTO itemDTO);
    void deleteItem(String id);
    String generateNextItemId();
}
