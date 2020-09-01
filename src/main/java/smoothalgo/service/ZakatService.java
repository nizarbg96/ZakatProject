package smoothalgo.service;

import smoothalgo.domain.Zakat;
import smoothalgo.service.dto.PeriodDTO;
import smoothalgo.service.dto.ZakatDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link smoothalgo.domain.Zakat}.
 */
public interface ZakatService {

    /**
     * Save a zakat.
     *
     * @param zakatDTO the entity to save.
     * @return the persisted entity.
     */
    ZakatDTO save(ZakatDTO zakatDTO);

    /**
     * Get all the zakats.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ZakatDTO> findAll(Pageable pageable);
    Page<ZakatDTO> findAllByLogin(Pageable pageable,String login);
    /**
     * Get all the ZakatDTO where Period is {@code null}.
     *
     * @return the list of entities.
     */
    List<ZakatDTO> findAllWherePeriodIsNull();

    /**
     * Get the "id" zakat.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ZakatDTO> findOne(Long id);

    /**
     * Delete the "id" zakat.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<ZakatDTO> findAllZakatsByLoginUser(String login);



}
