package smoothalgo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import smoothalgo.repository.PeriodRepository;
import smoothalgo.service.BalanceService;
import smoothalgo.domain.Balance;
import smoothalgo.repository.BalanceRepository;
import smoothalgo.service.PeriodService;
import smoothalgo.service.dto.BalanceDTO;
import smoothalgo.service.dto.PeriodDTO;
import smoothalgo.service.mapper.BalanceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

/**
 * Service Implementation for managing {@link Balance}.
 */
@Service
@Transactional
public class BalanceServiceImpl implements BalanceService {

    private final Logger log = LoggerFactory.getLogger(BalanceServiceImpl.class);
    private final BalanceRepository balanceRepository;
    private final BalanceMapper balanceMapper;
    private final BigDecimal NISAB = new BigDecimal(11880);

    public BalanceServiceImpl(BalanceRepository balanceRepository, BalanceMapper balanceMapper) {
        this.balanceRepository = balanceRepository;
        this.balanceMapper = balanceMapper;

    }

    /**
     * Save a balance.
     *
     * @param balanceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BalanceDTO save(BalanceDTO balanceDTO) {
        log.debug("Request to save Balance : {}", balanceDTO);
        Balance balance = balanceMapper.toEntity(balanceDTO);
        balance = balanceRepository.save(balance);
        return balanceMapper.toDto(balance);
    }

    /**
     * Save a list of balances.
     *
     * @param balanceDTOs the entities to save.
     * @return the persisted entities.
     */
    @Override
    public List<BalanceDTO> saveAll(List<BalanceDTO> balanceDTOs) {
        log.debug("Request to save Balance : {}", balanceDTOs);
        List<Balance> balances = balanceMapper.toEntity(balanceDTOs);
        balances = balanceRepository.saveAll(balances);
        return balanceMapper.toDto(balances);
    }

    /**
     * Get all the balances.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BalanceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Balances");
        return balanceRepository.findAll(pageable)
            .map(balanceMapper::toDto);
    }
    @Override
    @Transactional(readOnly = true)
    public Page<BalanceDTO> findAllBalancesByPeriodIdPagination(Pageable pageable, Long id){
        log.debug("Request to get all Balances with Period Id paginated");
        return balanceRepository.findBalancesByPeriod_Id(pageable,id)
            .map(balanceMapper::toDto);
    }

    /**
     * Get one balance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BalanceDTO> findOne(Long id) {
        log.debug("Request to get Balance : {}", id);
        return balanceRepository.findById(id)
            .map(balanceMapper::toDto);
    }

    /**
     * Delete the balance by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Balance : {}", id);
        balanceRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Balance[] findAllByBankAccount_Id(Long id) {
        log.debug("Request to get all Balances By bankAccountId");
        return balanceRepository.findAllByBankAccount_Id(id);

    }

    @Override
    @Transactional(readOnly = true)
    public List<BalanceDTO> findAllBalancesByLoginUser(String login) {
        log.debug("Request to get all Balances");
        return balanceMapper.toDto(balanceRepository.findBalancesByBankAccount_ExtraUser_User_Login(login));


    }

    @Override
    @Transactional(readOnly = true)
    public Page<BalanceDTO> findAllBalancesByLoginUser(Pageable pageable, String login) {
        log.debug("Request to get all Balances");
        return balanceRepository.findBalancesByBankAccount_ExtraUser_User_Login(pageable, login)
            .map(balanceMapper::toDto);


    }

    @Override
    @Transactional(readOnly = true)
    public List<BalanceDTO> findAllBalancesByPeriodId(Long id) {
        log.debug("Request to get all Balances by Period Id");
        List<BalanceDTO> balances = balanceMapper.toDto(balanceRepository.findBalancesByPeriod_Id(id));
        Collections.sort(balances, new Comparator<BalanceDTO>() {
            @Override
            public int compare(BalanceDTO o1, BalanceDTO o2) {
                return o1.getBalanceDate().compareTo(o2.getBalanceDate());
            }
        });
        return balances;

    }



}
