package lk.ijse.z17_springboot_bean_validation.Advice;

import lk.ijse.z17_springboot_bean_validation.DTO.ResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<ResponseDTO> handleException(Exception e) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError fieldError : ((MethodArgumentNotValidException) e).getBindingResult().getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        ResponseDTO responseDTO = new ResponseDTO(401, "Validation Error", errors);
        return new ResponseEntity<>(responseDTO, org.springframework.http.HttpStatus.BAD_REQUEST);
    }
}
