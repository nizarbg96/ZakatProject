package smoothalgo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import smoothalgo.domain.Balance;
import smoothalgo.domain.Beneficiary;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Beneficiary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
    Page<Beneficiary> findAllByExtraUser_User_Login (Pageable var1, String login);
    List<Beneficiary> findAllByExtraUser_User_Login (String login);


}
