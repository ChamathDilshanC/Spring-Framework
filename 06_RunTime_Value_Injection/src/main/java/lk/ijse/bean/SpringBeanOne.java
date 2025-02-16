package lk.ijse.bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class SpringBeanOne {
    //COnstuctor 2 m required = false karoth wadima parameters count ekk thiyen constructor ek use karanawa
    @Autowired(required = false)
    public SpringBeanOne(@Value("Chamath") String name,@Value("1") int id,@Value("true") boolean enabled) {
        System.out.println("Hello Spring BeanOne constructor !!!");
        System.out.println(name);
        System.out.println(id);
        System.out.println(enabled);
    }

    @Autowired(required = false)
    public SpringBeanOne(@Value("2") int id,@Value("false") boolean enabled) {
        System.out.println("Hello Spring BeanOne constructor !!!");
        System.out.println(id);
        System.out.println(enabled);
    }
}
