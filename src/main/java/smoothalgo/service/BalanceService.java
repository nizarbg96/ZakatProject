package smoothalgo.service;

import smoothalgo.domain.Balance;
import smoothalgo.service.dto.BalanceDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link smoothalgo.domain.Balance}.
 */
public interface BalanceService {

    /**
     * Save a balance.
     *
     * @param balanceDTO the entity to save.
     * @return the persisted entity.
     */
    BalanceDTO save(BalanceDTO balanceDTO);

    /**
     * Get all the balances.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BalanceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" balance.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BalanceDTO> findOne(Long id);

    /**
     * Delete the "id" balance.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Find all Balances By bankAccount Id
     *
     * @param id the id of the bankAccount.
     */
    Balance[] findAllByBankAccount_Id(Long id);

    List<BalanceDTO> findAllBalancesByLoginUser(String login);

    Page<BalanceDTO> findAllBalancesByLoginUser(Pageable pegeable, String login);

    /**
     * Find all Balances By Period Id
     *
     * @param id the id of the period.
     */
    List<BalanceDTO> findAllBalancesByPeriodId(Long id);
    Page<BalanceDTO> findAllBalancesByPeriodIdPagination(Pageable pageable, Long id);

    List<BalanceDTO> saveAll(List<BalanceDTO> balances);



}


