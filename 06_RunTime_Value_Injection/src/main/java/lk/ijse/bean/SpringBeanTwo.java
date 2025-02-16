package lk.ijse.bean;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SpringBeanTwo implements InitializingBean {
    @Value("Chamath")
    private String name;

    public SpringBeanTwo() {
        System.out.println("Initializing SpringBeanTwo In Constructor");
        System.out.println(name);
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("Initializing SpringBeanTwo");
        System.out.println(name);
    }
}
