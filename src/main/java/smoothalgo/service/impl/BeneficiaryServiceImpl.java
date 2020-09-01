package smoothalgo.service.impl;

import smoothalgo.service.BeneficiaryService;
import smoothalgo.domain.Beneficiary;
import smoothalgo.repository.BeneficiaryRepository;
import smoothalgo.service.dto.BalanceDTO;
import smoothalgo.service.dto.BeneficiaryDTO;
import smoothalgo.service.mapper.BeneficiaryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Beneficiary}.
 */
@Service
@Transactional
public class BeneficiaryServiceImpl implements BeneficiaryService {

    private final Logger log = LoggerFactory.getLogger(BeneficiaryServiceImpl.class);

    private final BeneficiaryRepository beneficiaryRepository;

    private final BeneficiaryMapper beneficiaryMapper;

    public BeneficiaryServiceImpl(BeneficiaryRepository beneficiaryRepository, BeneficiaryMapper beneficiaryMapper) {
        this.beneficiaryRepository = beneficiaryRepository;
        this.beneficiaryMapper = beneficiaryMapper;
    }

    /**
     * Save a beneficiary.
     *
     * @param beneficiaryDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BeneficiaryDTO save(BeneficiaryDTO beneficiaryDTO) {
        log.debug("Request to save Beneficiary : {}", beneficiaryDTO);
        Beneficiary beneficiary = beneficiaryMapper.toEntity(beneficiaryDTO);
        beneficiary = beneficiaryRepository.save(beneficiary);
        return beneficiaryMapper.toDto(beneficiary);
    }

    /**
     * Get all the beneficiaries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BeneficiaryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Beneficiaries");
        return beneficiaryRepository.findAll(pageable)
            .map(beneficiaryMapper::toDto);
    }

    /**
     * Get one beneficiary by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BeneficiaryDTO> findOne(Long id) {
        log.debug("Request to get Beneficiary : {}", id);
        return beneficiaryRepository.findById(id)
            .map(beneficiaryMapper::toDto);
    }

    /**
     * Delete the beneficiary by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Beneficiary : {}", id);
        beneficiaryRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BeneficiaryDTO> findAllBeneficiarysByLoginUser(Pageable pageable, String login) {
        log.debug("Request to get all Beneficiarys page by login");
        return beneficiaryRepository.findAllByExtraUser_User_Login(pageable,login)
            .map(beneficiaryMapper::toDto);
    }
    @Override
    @Transactional(readOnly = true)
    public List<BeneficiaryDTO> findAllBeneficiarysByLoginUser2(String login) {
        log.debug("Request to get all Beneficiarys list by login");
        return beneficiaryMapper.toDto(beneficiaryRepository.findAllByExtraUser_User_Login(login));

    }
}
