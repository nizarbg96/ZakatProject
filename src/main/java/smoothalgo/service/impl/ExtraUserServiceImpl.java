package smoothalgo.service.impl;

import smoothalgo.service.ExtraUserService;
import smoothalgo.domain.ExtraUser;
import smoothalgo.repository.ExtraUserRepository;
import smoothalgo.service.dto.ExtraUserDTO;
import smoothalgo.service.mapper.ExtraUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ExtraUser}.
 */
@Service
@Transactional
public class ExtraUserServiceImpl implements ExtraUserService {

    private final Logger log = LoggerFactory.getLogger(ExtraUserServiceImpl.class);

    private final ExtraUserRepository extraUserRepository;

    private final ExtraUserMapper extraUserMapper;

    public ExtraUserServiceImpl(ExtraUserRepository extraUserRepository, ExtraUserMapper extraUserMapper) {
        this.extraUserRepository = extraUserRepository;
        this.extraUserMapper = extraUserMapper;
    }

    /**
     * Save a extraUser.
     *
     * @param extraUserDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ExtraUserDTO save(ExtraUserDTO extraUserDTO) {
        log.debug("Request to save ExtraUser : {}", extraUserDTO);
        ExtraUser extraUser = extraUserMapper.toEntity(extraUserDTO);
        extraUser = extraUserRepository.save(extraUser);
        return extraUserMapper.toDto(extraUser);
    }

    /**
     * Get all the extraUsers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ExtraUserDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ExtraUsers");
        return extraUserRepository.findAll(pageable)
            .map(extraUserMapper::toDto);
    }

    /**
     * Get one extraUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ExtraUserDTO> findOne(Long id) {
        log.debug("Request to get ExtraUser : {}", id);
        return extraUserRepository.findById(id)
            .map(extraUserMapper::toDto);
    }

    /**
     * Delete the extraUser by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ExtraUser : {}", id);
        extraUserRepository.deleteById(id);
    }
    @Override
    public Optional<ExtraUserDTO> findOneByLogin(String login){
        return extraUserRepository.findByUser_Login(login)
            .map(extraUserMapper::toDto);

    }

}
