package smoothalgo.web.rest;

import smoothalgo.domain.Balance;
import smoothalgo.service.BalanceService;
import smoothalgo.web.rest.errors.BadRequestAlertException;
import smoothalgo.service.dto.BalanceDTO;

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
 * REST controller for managing {@link smoothalgo.domain.Balance}.
 */
@RestController
@RequestMapping("/api")
public class BalanceResource {

    private final Logger log = LoggerFactory.getLogger(BalanceResource.class);

    private static final String ENTITY_NAME = "balance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BalanceService balanceService;

    public BalanceResource(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    /**
     * {@code POST  /balances} : Create a new balance.
     *
     * @param balanceDTO the balanceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new balanceDTO, or with status {@code 400 (Bad Request)} if the balance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/balances")
    public ResponseEntity<BalanceDTO> createBalance(@Valid @RequestBody BalanceDTO balanceDTO) throws URISyntaxException {
        log.debug("REST request to save Balance : {}", balanceDTO);
        if (balanceDTO.getId() != null) {
            throw new BadRequestAlertException("A new balance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BalanceDTO result = balanceService.save(balanceDTO);
        return ResponseEntity.created(new URI("/api/balances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }



    /**
     * {@code PUT  /balances} : Updates an existing balance.
     *
     * @param balanceDTO the balanceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated balanceDTO,
     * or with status {@code 400 (Bad Request)} if the balanceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the balanceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/balances")
    public ResponseEntity<BalanceDTO> updateBalance(@Valid @RequestBody BalanceDTO balanceDTO) throws URISyntaxException {
        log.debug("REST request to update Balance : {}", balanceDTO);
        if (balanceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BalanceDTO result = balanceService.save(balanceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, balanceDTO.getId().toString()))
            .body(result);
    }
    /**
     * {@code PUT  /balances} : Updates an existing balances.
     *
     * @param balanceDTOs the list of balanceDTO to update.
     */
    @PutMapping("/balances/list")
    public List<BalanceDTO> updateBalances(@Valid @RequestBody List<BalanceDTO> balanceDTOs)  {
        List<BalanceDTO> result = balanceService.saveAll(balanceDTOs);
        return result;
    }

    /**
     * {@code GET  /balances} : get all the balances.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of balances in body.
     */
    @GetMapping("/balances")
    public ResponseEntity<List<BalanceDTO>> getAllBalances(Pageable pageable) {
        log.debug("REST request to get a page of Balances");
        Page<BalanceDTO> page = balanceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/balances/period-withPaging/{id}")
    public ResponseEntity<List<BalanceDTO>> findAllBalancesByPeriodIdPagination(Pageable pageable,@PathVariable Long id) {
        log.debug("REST request to get a page of Balances by Period Id");
        Page<BalanceDTO> page = balanceService.findAllBalancesByPeriodIdPagination(pageable,id);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /balances/:id} : get the "id" balance.
     *
     * @param id the id of the balanceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the balanceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/balances/{id}")
    public ResponseEntity<BalanceDTO> getBalance(@PathVariable Long id) {
        log.debug("REST request to get Balance : {}", id);
        Optional<BalanceDTO> balanceDTO = balanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(balanceDTO);
    }

    /**
     * {@code DELETE  /balances/:id} : delete the "id" balance.
     *
     * @param id the id of the balanceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/balances/{id}")
    public ResponseEntity<Void> deleteBalance(@PathVariable Long id) {
        log.debug("REST request to delete Balance : {}", id);
        balanceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/balances/bankAccount/{id}")
    public Balance[] getAllBalancesByBankAccountId(@PathVariable Long id) {
        log.debug("REST request to get a page of Balances by bankAccount Id");
        Balance[] balances = balanceService.findAllByBankAccount_Id(id);
        return balances;
    }
    @GetMapping("/balances/loginUser-noPaging/{login}")
    public List<BalanceDTO> getAllBalancesByLogin(@PathVariable String login) {
        log.debug("REST request to get a list of Balances by UserLogin");
        List<BalanceDTO> balances = balanceService.findAllBalancesByLoginUser(login);
        return balances;

    }
    @GetMapping("/balances/loginUser-withPaging/{login}")
    public ResponseEntity<List<BalanceDTO>> getAllBalancesByLogin(Pageable pageable,@PathVariable String login) {
        Page<BalanceDTO> page = balanceService.findAllBalancesByLoginUser(pageable,login);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());

    }

    @GetMapping("/balances/period/{id}")
    public ResponseEntity<List<BalanceDTO>> findAllBalancesByPeriodId(@PathVariable Long id) {
        log.debug("REST request to get a page of Balances by Period Id");
        List<BalanceDTO> list = balanceService.findAllBalancesByPeriodId(id);
        return ResponseEntity.ok().body(list);
    }


}
