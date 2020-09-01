package smoothalgo.service.impl;


import smoothalgo.service.ZakatService;
import smoothalgo.domain.Zakat;
import smoothalgo.repository.ZakatRepository;
import smoothalgo.service.dto.ZakatDTO;
import smoothalgo.service.mapper.ZakatMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Zakat}.
 */
@Service
@Transactional
public class ZakatServiceImpl implements ZakatService {

    private final Logger log = LoggerFactory.getLogger(ZakatServiceImpl.class);

    private final ZakatRepository zakatRepository;

    private final ZakatMapper zakatMapper;

    public ZakatServiceImpl(ZakatRepository zakatRepository, ZakatMapper zakatMapper) {
        this.zakatRepository = zakatRepository;
        this.zakatMapper = zakatMapper;
    }

    /**
     * Save a zakat.
     *
     * @param zakatDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ZakatDTO save(ZakatDTO zakatDTO) {
        log.debug("Request to save Zakat : {}", zakatDTO);
        Zakat zakat = zakatMapper.toEntity(zakatDTO);
        zakat = zakatRepository.save(zakat);
        log.debug("////zakat saved ///// == "+zakat);
        return zakatMapper.toDto(zakat);
    }

    /**
     * Get all the zakats.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ZakatDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Zakats");
        return zakatRepository.findAll(pageable)
            .map(zakatMapper::toDto);
    }
    @Override
    @Transactional(readOnly = true)
    public Page<ZakatDTO> findAllByLogin(Pageable pageable,String login) {
        log.debug("Request to get all Zakats");
        return zakatRepository.findAllByExtraUser_User_Login(pageable,login)
            .map(zakatMapper::toDto);
    }


    /**
     *  Get all the zakats where Period is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ZakatDTO> findAllWherePeriodIsNull() {
        log.debug("Request to get all zakats where Period is null");
        return StreamSupport
            .stream(zakatRepository.findAll().spliterator(), false)
            .filter(zakat -> zakat.getPeriod() == null)
            .map(zakatMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one zakat by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ZakatDTO> findOne(Long id) {
        log.debug("Request to get Zakat : {}", id);
        return zakatRepository.findById(id)
            .map(zakatMapper::toDto);
    }

    /**
     * Delete the zakat by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Zakat : {}", id);
        zakatRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ZakatDTO> findAllZakatsByLoginUser( String login) {
        log.debug("Request to get all zakats");
        List<Zakat> zakats= zakatRepository.findAllByExtraUser_User_Login(login);
        return zakatMapper.toDto(zakats);
    }

}
