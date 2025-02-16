package lk.ijse;


import lk.ijse.bean.SpringBean;
import lk.ijse.config.AppConfig;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AppInitializer {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(AppConfig.class);
        context.refresh();

        SpringBean bean = context.getBean(SpringBean.class);


        context.registerShutdownHook();
    }
}
