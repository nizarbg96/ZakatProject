package smoothalgo.service;

import smoothalgo.service.dto.ExtraUserDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link smoothalgo.domain.ExtraUser}.
 */
public interface ExtraUserService {

    /**
     * Save a extraUser.
     *
     * @param extraUserDTO the entity to save.
     * @return the persisted entity.
     */
    ExtraUserDTO save(ExtraUserDTO extraUserDTO);

    /**
     * Get all the extraUsers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ExtraUserDTO> findAll(Pageable pageable);

    /**
     * Get the "id" extraUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExtraUserDTO> findOne(Long id);

    /**
     * Delete the "id" extraUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * find extraUser by user Login.
     *
     * @param login the login of the user.
     */

    Optional<ExtraUserDTO> findOneByLogin(String login);
}
