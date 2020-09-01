package smoothalgo.web.rest;

import smoothalgo.domain.Zakat;
import smoothalgo.service.ZakatService;
import smoothalgo.service.dto.PeriodDTO;
import smoothalgo.web.rest.errors.BadRequestAlertException;
import smoothalgo.service.dto.ZakatDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link smoothalgo.domain.Zakat}.
 */
@RestController
@RequestMapping("/api")
public class ZakatResource {

    private final Logger log = LoggerFactory.getLogger(ZakatResource.class);

    private static final String ENTITY_NAME = "zakat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ZakatService zakatService;

    public ZakatResource(ZakatService zakatService) {
        this.zakatService = zakatService;
    }

    /**
     * {@code POST  /zakats} : Create a new zakat.
     *
     * @param zakatDTO the zakatDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new zakatDTO, or with status {@code 400 (Bad Request)} if the zakat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/zakats")
    public ResponseEntity<ZakatDTO> createZakat(@Valid @RequestBody ZakatDTO zakatDTO) throws URISyntaxException {
        log.debug("REST request to save Zakat : {}", zakatDTO);
        if (zakatDTO.getId() != null) {
            throw new BadRequestAlertException("A new zakat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ZakatDTO result = zakatService.save(zakatDTO);
        return ResponseEntity.created(new URI("/api/zakats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /zakats} : Updates an existing zakat.
     *
     * @param zakatDTO the zakatDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zakatDTO,
     * or with status {@code 400 (Bad Request)} if the zakatDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the zakatDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/zakats")
    public ResponseEntity<ZakatDTO> updateZakat(@Valid @RequestBody ZakatDTO zakatDTO) throws URISyntaxException {
        log.debug("REST request to update Zakat : {}", zakatDTO);
        if (zakatDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ZakatDTO result = zakatService.save(zakatDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, zakatDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /zakats} : get all the zakats.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of zakats in body.
     */
    @GetMapping("/zakats")
    public ResponseEntity<List<ZakatDTO>> getAllZakats(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("period-is-null".equals(filter)) {
            log.debug("REST request to get all Zakats where period is null");
            return new ResponseEntity<>(zakatService.findAllWherePeriodIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of Zakats");
        Page<ZakatDTO> page = zakatService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/zakats/queryBylogin/{login}")
    public ResponseEntity<List<ZakatDTO>> getAllZakats(@PathVariable String login,Pageable pageable, @RequestParam(required = false) String filter) {
        if ("period-is-null".equals(filter)) {
            log.debug("REST request to get all Zakats where period is null");
            return new ResponseEntity<>(zakatService.findAllWherePeriodIsNull(),
                HttpStatus.OK);
        }
        log.debug("REST request to get a page of Zakats");
        Page<ZakatDTO> page = zakatService.findAllByLogin(pageable, login);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /zakats/:id} : get the "id" zakat.
     *
     * @param id the id of the zakatDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the zakatDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/zakats/{id}")
    public ResponseEntity<ZakatDTO> getZakat(@PathVariable Long id) {
        log.debug("REST request to get Zakat : {}", id);
        Optional<ZakatDTO> zakatDTO = zakatService.findOne(id);
        return ResponseUtil.wrapOrNotFound(zakatDTO);
    }

    /**
     * {@code DELETE  /zakats/:id} : delete the "id" zakat.
     *
     * @param id the id of the zakatDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/zakats/{id}")
    public ResponseEntity<Void> deleteZakat(@PathVariable Long id) {
        log.debug("REST request to delete Zakat : {}", id);
        zakatService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/zakats/loginUser/{login}")
    public ResponseEntity<List<ZakatDTO>> findAllZakatsByLoginUser(@PathVariable String login) {
        log.debug("REST request to get a page of zakats by UserLogin");
        List<ZakatDTO> list = zakatService.findAllZakatsByLoginUser(login);
        return ResponseEntity.ok().body(list);
    }
}
