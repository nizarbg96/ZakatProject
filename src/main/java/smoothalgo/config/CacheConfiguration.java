package smoothalgo.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, smoothalgo.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, smoothalgo.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, smoothalgo.domain.User.class.getName());
            createCache(cm, smoothalgo.domain.Authority.class.getName());
            createCache(cm, smoothalgo.domain.User.class.getName() + ".authorities");
            createCache(cm, smoothalgo.domain.BankAccount.class.getName());
            createCache(cm, smoothalgo.domain.BankAccount.class.getName() + ".balances");
            createCache(cm, smoothalgo.domain.Balance.class.getName());
            createCache(cm, smoothalgo.domain.Period.class.getName());
            createCache(cm, smoothalgo.domain.Period.class.getName() + ".balances");
            createCache(cm, smoothalgo.domain.Zakat.class.getName());
            createCache(cm, smoothalgo.domain.Zakat.class.getName() + ".payments");
            createCache(cm, smoothalgo.domain.Payment.class.getName());
            createCache(cm, smoothalgo.domain.Beneficiary.class.getName());
            createCache(cm, smoothalgo.domain.Beneficiary.class.getName() + ".payments");
            createCache(cm, smoothalgo.domain.ExtraUser.class.getName());
            createCache(cm, smoothalgo.domain.ExtraUser.class.getName() + ".beneficiarys");
            createCache(cm, smoothalgo.domain.ExtraUser.class.getName() + ".zakats");
            createCache(cm, smoothalgo.domain.ExtraUser.class.getName() + ".periods");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
