package lk.ijse;
import lk.ijse.bean.SpringBeanTwo;
import lk.ijse.config.AppConfig;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AppInitializer {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(AppConfig.class);
        context.refresh();

        SpringBeanTwo ref1 = context.getBean(SpringBeanTwo.class);
        SpringBeanTwo ref2 = context.getBean(SpringBeanTwo.class);

        System.out.println(ref1);
        System.out.println(ref2);


        context.registerShutdownHook();
    }
}
