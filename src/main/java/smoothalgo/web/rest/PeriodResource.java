package smoothalgo.web.rest;

import smoothalgo.domain.Period;
import smoothalgo.service.PeriodService;
import smoothalgo.service.dto.BalanceDTO;
import smoothalgo.service.dto.BeneficiaryDTO;
import smoothalgo.web.rest.errors.BadRequestAlertException;
import smoothalgo.service.dto.PeriodDTO;

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

/**
 * REST controller for managing {@link smoothalgo.domain.Period}.
 */
@RestController
@RequestMapping("/api")
public class PeriodResource {

    private final Logger log = LoggerFactory.getLogger(PeriodResource.class);

    private static final String ENTITY_NAME = "period";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PeriodService periodService;

    public PeriodResource(PeriodService periodService) {
        this.periodService = periodService;
    }

    /**
     * {@code POST  /periods} : Create a new period.
     *
     * @param periodDTO the periodDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new periodDTO, or with status {@code 400 (Bad Request)} if the period has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/periods")
    public ResponseEntity<PeriodDTO> createPeriod(@Valid @RequestBody PeriodDTO periodDTO) throws URISyntaxException {
        log.debug("REST request to save Period : {}", periodDTO);
        if (periodDTO.getId() != null) {
            throw new BadRequestAlertException("A new period cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PeriodDTO result = periodService.save(periodDTO);
        return ResponseEntity.created(new URI("/api/periods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /periods} : Updates an existing period.
     *
     * @param periodDTO the periodDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated periodDTO,
     * or with status {@code 400 (Bad Request)} if the periodDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the periodDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/periods")
    public ResponseEntity<PeriodDTO> updatePeriod(@Valid @RequestBody PeriodDTO periodDTO) throws URISyntaxException {
        log.debug("REST request to update Period : {}", periodDTO);
        if (periodDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PeriodDTO result = periodService.save(periodDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, periodDTO.getId().toString()))
            .body(result);
    }

    @PostMapping("/balances/userLogin/{login}/{id}")
    public ResponseEntity<List<PeriodDTO>> updateBalances(@Valid @RequestBody List<BalanceDTO> balanceDTOs,
                                                           @PathVariable String login,@PathVariable Long id)
        throws URISyntaxException {
        log.debug("REST request to update Balances : {}", balanceDTOs);
        balanceDTOs.forEach(balanceDTO -> {
            if (balanceDTO.getId() == null) {
                throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
            }
        });
        List<PeriodDTO> list = periodService.assignPeriodsToBalances(balanceDTOs,id,login);
        return ResponseEntity.ok().body(list);
    }

    /**
     * {@code GET  /periods} : get all the periods.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of periods in body.
     */
    @GetMapping("/periods")
    public ResponseEntity<List<PeriodDTO>> getAllPeriods(Pageable pageable) {
        log.debug("REST request to get a page of Periods");
        Page<PeriodDTO> page = periodService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    @GetMapping("/periods/loginUser-pagination/{login}")
    public ResponseEntity<List<PeriodDTO>> findAllPeriodsByLoginUser(Pageable pageable, @PathVariable String login) {
        log.debug("REST request to get a page of periods by UserLogin with pagination");
        Page<PeriodDTO> page = periodService.findAllPeriodsByLoginUserPagination(pageable, login);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /periods/:id} : get the "id" period.
     *
     * @param id the id of the periodDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the periodDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/periods/{id}")
    public ResponseEntity<PeriodDTO> getPeriod(@PathVariable Long id) {
        log.debug("REST request to get Period : {}", id);
        Optional<PeriodDTO> periodDTO = periodService.findOne(id);
        return ResponseUtil.wrapOrNotFound(periodDTO);
    }

    /**
     * {@code DELETE  /periods/:id} : delete the "id" period.
     *
     * @param id the id of the periodDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/periods/{id}")
    public ResponseEntity<Void> deletePeriod(@PathVariable Long id) {
        log.debug("REST request to delete Period : {}", id);
        periodService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code DELETE  /periods/allByLogin/:login} : delete the "id" period.
     *
     * @param login the id of the periodDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/periods/allByLogin/{login}")
    public ResponseEntity<Void> deleteAllPeriodsByLogin(@PathVariable String login) {
        log.debug("REST request to delete Periods by Login : {}", login);
        periodService.deleteAllByLogin(login);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, login)).build();
    }

    @GetMapping("/periods/loginUser/{login}")
    public ResponseEntity<List<PeriodDTO>> findAllPeriodsByLoginUser(@PathVariable String login) {
        log.debug("REST request to get a page of periods by UserLogin");
        List<PeriodDTO> list = periodService.findAllPeriodsByLoginUser(login);
        return ResponseEntity.ok(list);
    }



    /**
     * find the last element in the Table.
     *
     * .
     */

    @GetMapping("/periods/latestPeriod/{login}")
    public ResponseEntity<PeriodDTO> findLatestPeriod(@PathVariable  String login) {
        log.debug("REST request to get the latest Period");
        PeriodDTO periodDTO = periodService.findLatestPeriod(login);
        if (periodDTO == null){
            return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.ok(periodDTO);
        }


    }

    @PutMapping("/periods/balanceInput/{login}")
    public Period createPeriod(@Valid @RequestBody BalanceDTO balanceDTO,@PathVariable  String login
        ,@RequestParam(name = "type") String type) {
        log.debug("REST request to update Period by balance input : {}", balanceDTO);
        Period result = null;
        if (type.equalsIgnoreCase("old"))
        result = periodService.updatePeriodWhenOldBalance(balanceDTO,login);
        else
        result = periodService.updatePeriodWhenNewBalance(balanceDTO,login);
        return result;
    }
    @GetMapping("/periods/taxable/{login}")
    public ResponseEntity<List<PeriodDTO>> getTaxablePeriods(@PathVariable  String login,
                                                      @RequestParam(name = "taxable") String taxable) {
        log.debug("REST request to get  taxable Periods");
        List<PeriodDTO> periods = periodService.getTaxablePeriods(login,taxable);
        if (periods == null){
            return ResponseEntity.notFound().build();
        }
        else {
            return ResponseEntity.ok(periods);
        }






    }
}

