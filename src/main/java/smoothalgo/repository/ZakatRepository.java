package smoothalgo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import smoothalgo.domain.Period;
import smoothalgo.domain.Zakat;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Zakat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZakatRepository extends JpaRepository<Zakat, Long> {

    List<Zakat> findAllByExtraUser_User_Login (String login);
    Page<Zakat> findAllByExtraUser_User_Login  (Pageable pageable,String login);


}
