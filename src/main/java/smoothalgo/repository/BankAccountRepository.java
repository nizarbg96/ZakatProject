package smoothalgo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import smoothalgo.domain.BankAccount;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the BankAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

   Optional<BankAccount> findOneByExtraUser_Id(Long id);
   Page<BankAccount> findAllByExtraUser_User_Login(Pageable pageable,String login);
}
