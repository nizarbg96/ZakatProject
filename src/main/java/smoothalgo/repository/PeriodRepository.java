package smoothalgo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import smoothalgo.domain.BankAccount;
import smoothalgo.domain.Beneficiary;
import smoothalgo.domain.Period;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import smoothalgo.domain.User;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Period entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeriodRepository extends JpaRepository<Period, Long> {
    List<Period> findAllByExtraUser_User_Login (String login);

    @Query(value = "SELECT TOP 1 * FROM (SELECT PERIOD.id,PERIOD.begin_date,PERIOD.end_date," +
        "PERIOD.duration,PERIOD.taxable,PERIOD.zakat_id,PERIOD.extra_user_id FROM PERIOD,JHI_USER " +
        "WHERE (JHI_USER.id = PERIOD.extra_user_id) AND JHI_USER.login = ?1 ) AS PU ORDER BY PU.id DESC ",nativeQuery = true)
    Optional<Period> findLatestPeriod(String login);

    void deleteAllByExtraUser_User_Login(String login);

    Page<Period> findAllByExtraUser_User_Login (Pageable pageable, String login);



}
