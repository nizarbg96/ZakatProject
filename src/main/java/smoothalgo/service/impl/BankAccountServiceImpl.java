package smoothalgo.service.impl;

import smoothalgo.service.BankAccountService;
import smoothalgo.domain.BankAccount;
import smoothalgo.repository.BankAccountRepository;
import smoothalgo.service.dto.BalanceDTO;
import smoothalgo.service.dto.BankAccountDTO;
import smoothalgo.service.mapper.BankAccountMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link BankAccount}.
 */
@Service
@Transactional
public class BankAccountServiceImpl implements BankAccountService {

    private final Logger log = LoggerFactory.getLogger(BankAccountServiceImpl.class);

    private final BankAccountRepository bankAccountRepository;

    private final BankAccountMapper bankAccountMapper;

    public BankAccountServiceImpl(BankAccountRepository bankAccountRepository, BankAccountMapper bankAccountMapper) {
        this.bankAccountRepository = bankAccountRepository;
        this.bankAccountMapper = bankAccountMapper;
    }

    /**
     * Save a bankAccount.
     *
     * @param bankAccountDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BankAccountDTO save(BankAccountDTO bankAccountDTO) {
        log.debug("Request to save BankAccount : {}", bankAccountDTO);
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        return bankAccountMapper.toDto(bankAccount);
    }

    /**
     * Get all the bankAccounts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BankAccountDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BankAccounts");
        return bankAccountRepository.findAll(pageable)
            .map(bankAccountMapper::toDto);
    }
    /**
     * Get all the bankAccounts.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<BankAccount> findAll() {
        log.debug("Request to get all BankAccounts");
        return bankAccountRepository.findAll();
    }


    /**
     *  Get all the bankAccounts where ExtraUser is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<BankAccountDTO> findAllWhereExtraUserIsNull() {
        log.debug("Request to get all bankAccounts where ExtraUser is null");
        return StreamSupport
            .stream(bankAccountRepository.findAll().spliterator(), false)
            .filter(bankAccount -> bankAccount.getExtraUser() == null)
            .map(bankAccountMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one bankAccount by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BankAccountDTO> findOne(Long id) {
        log.debug("Request to get BankAccount : {}", id);
        return bankAccountRepository.findById(id)
            .map(bankAccountMapper::toDto);
    }

    /**
     * Delete the bankAccount by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BankAccount : {}", id);
        bankAccountRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<BankAccountDTO> findOneByExtraUser_Id(Long id) {
        log.debug("Request to get BankAccount by Extra User : {}", id);
        return bankAccountRepository.findOneByExtraUser_Id(id)
            .map(bankAccountMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BankAccountDTO> findAllBankAccountsByLoginUser(Pageable pageable, String login) {
        log.debug("Request to get all bankAccounts");
        return bankAccountRepository.findAllByExtraUser_User_Login(pageable,login)
            .map(bankAccountMapper::toDto);
    }

}
