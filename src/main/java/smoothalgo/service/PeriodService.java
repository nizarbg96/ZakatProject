package smoothalgo.service;

import smoothalgo.domain.Period;
import smoothalgo.service.dto.BalanceDTO;
import smoothalgo.service.dto.BeneficiaryDTO;
import smoothalgo.service.dto.PeriodDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link smoothalgo.domain.Period}.
 */
public interface PeriodService {

    /**
     * Save a period.
     *
     * @param periodDTO the entity to save.
     * @return the persisted entity.
     */
    PeriodDTO save(PeriodDTO periodDTO);

    /**
     * Get all the periods.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PeriodDTO> findAll(Pageable pageable);

    Page<PeriodDTO> findAllPeriodsByLoginUserPagination(Pageable pageable, String login);

    /**
     * Get the "id" period.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PeriodDTO> findOne(Long id);

    /**
     * Delete the "id" period.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);


    /**
     * Delete all the entities of the user by its login.
     *
     * @param login the login  of the user.
     */
    void deleteAllByLogin(String login);
    /**
     * find All Periods of User.
     *
     *
     */
    List<PeriodDTO> findAllPeriodsByLoginUser( String login);


    /**
     * find the last element in the Table Period
     *
     *
     */
    PeriodDTO findLatestPeriod(String login);
    /**
     * Update Periods when user make an old date balance input
     *
     *
     */
     Period updatePeriodWhenOldBalance(BalanceDTO balance,String login);
    /**
     * Update Periods when user make a new date balance input
     *
     *
     */
    Period updatePeriodWhenNewBalance(BalanceDTO balance,String login);
    /**
     * assign taxable attribute to Periods Table
     *
     *
     */
     void assignTexable(String login);
    /**
     * get Taxable Periods
     *
     *
     */
    List<PeriodDTO> getTaxablePeriods(String login,String taxable);

    List<PeriodDTO> assignPeriodsToBalances(List<BalanceDTO> balances, Long userId, String userLogin);

}
