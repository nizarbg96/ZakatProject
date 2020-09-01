package smoothalgo.service;

import smoothalgo.domain.BankAccount;
import smoothalgo.service.dto.BalanceDTO;
import smoothalgo.service.dto.BankAccountDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link smoothalgo.domain.BankAccount}.
 */
public interface BankAccountService {

    /**
     * Save a bankAccount.
     *
     * @param bankAccountDTO the entity to save.
     * @return the persisted entity.
     */
    BankAccountDTO save(BankAccountDTO bankAccountDTO);

    /**
     * Get all the bankAccounts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BankAccountDTO> findAll(Pageable pageable);
    /**
     * Get all the BankAccountDTO where ExtraUser is {@code null}.
     *
     * @return the list of entities.
     */
    List<BankAccount> findAll();

    List<BankAccountDTO> findAllWhereExtraUserIsNull();

    /**
     * Get the "id" bankAccount.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BankAccountDTO> findOne(Long id);

    /**
     * Delete the "id" bankAccount.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Optional<BankAccountDTO> findOneByExtraUser_Id(Long id);

    Page<BankAccountDTO> findAllBankAccountsByLoginUser(Pageable pageable, String login);


}
