package smoothalgo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import smoothalgo.domain.Balance;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import smoothalgo.domain.BankAccount;
import smoothalgo.service.dto.BalanceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Balance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BalanceRepository extends JpaRepository<Balance, Long> {
    @Query("SELECT b FROM Balance b WHERE b.bankAccount.id = ?1")
    Balance[] findAllByBankAccount_Id(Long id);

    List<Balance> findBalancesByBankAccount_ExtraUser_User_Login(String login);
    Page<Balance> findBalancesByBankAccount_ExtraUser_User_Login(Pageable var1,String login);
    List<Balance> findBalancesByPeriod_Id( Long id);
    Page<Balance> findBalancesByPeriod_Id(Pageable pageable, Long id);






}
