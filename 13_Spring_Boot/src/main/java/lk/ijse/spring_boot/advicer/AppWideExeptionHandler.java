package lk.ijse.spring_boot.advicer;

import lk.ijse.spring_boot.util.ResponseUtil;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@CrossOrigin
public class AppWideExeptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseUtil exeptionHandler(Exception e){
        return new ResponseUtil(500,"Intrernel Server Eroor", e.getMessage());
    }
}
