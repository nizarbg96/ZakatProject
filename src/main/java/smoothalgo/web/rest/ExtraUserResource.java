package smoothalgo.web.rest;

import smoothalgo.service.ExtraUserService;
import smoothalgo.web.rest.errors.BadRequestAlertException;
import smoothalgo.service.dto.ExtraUserDTO;

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

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link smoothalgo.domain.ExtraUser}.
 */
@RestController
@RequestMapping("/api")
public class ExtraUserResource {

    private final Logger log = LoggerFactory.getLogger(ExtraUserResource.class);

    private static final String ENTITY_NAME = "extraUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExtraUserService extraUserService;

    public ExtraUserResource(ExtraUserService extraUserService) {
        this.extraUserService = extraUserService;
    }

    /**
     * {@code POST  /extra-users} : Create a new extraUser.
     *
     * @param extraUserDTO the extraUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new extraUserDTO, or with status {@code 400 (Bad Request)} if the extraUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/extra-users")
    public ResponseEntity<ExtraUserDTO> createExtraUser(@RequestBody ExtraUserDTO extraUserDTO) throws URISyntaxException {
        log.debug("REST request to save ExtraUser : {}", extraUserDTO);
        if (extraUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new extraUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtraUserDTO result = extraUserService.save(extraUserDTO);
        return ResponseEntity.created(new URI("/api/extra-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /extra-users} : Updates an existing extraUser.
     *
     * @param extraUserDTO the extraUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated extraUserDTO,
     * or with status {@code 400 (Bad Request)} if the extraUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the extraUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/extra-users")
    public ResponseEntity<ExtraUserDTO> updateExtraUser(@RequestBody ExtraUserDTO extraUserDTO) throws URISyntaxException {
        log.debug("REST request to update ExtraUser : {}", extraUserDTO);
        if (extraUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExtraUserDTO result = extraUserService.save(extraUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, extraUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /extra-users} : get all the extraUsers.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of extraUsers in body.
     */
    @GetMapping("/extra-users")
    public ResponseEntity<List<ExtraUserDTO>> getAllExtraUsers(Pageable pageable) {
        log.debug("REST request to get a page of ExtraUsers");
        Page<ExtraUserDTO> page = extraUserService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /extra-users/:id} : get the "id" extraUser.
     *
     * @param id the id of the extraUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the extraUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/extra-users/{id}")
    public ResponseEntity<ExtraUserDTO> getExtraUser(@PathVariable Long id) {
        log.debug("REST request to get ExtraUser : {}", id);
        Optional<ExtraUserDTO> extraUserDTO = extraUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(extraUserDTO);
    }

    @GetMapping("/extra-users/userLogin/{login}")
    public ResponseEntity<ExtraUserDTO> getExtraUserByLogin(@PathVariable String login) {
        log.debug("REST request to get ExtraUser By Login : {}", login);
        Optional<ExtraUserDTO> extraUserDTO = extraUserService.findOneByLogin(login);
        return ResponseUtil.wrapOrNotFound(extraUserDTO);
    }

    /**
     * {@code DELETE  /extra-users/:id} : delete the "id" extraUser.
     *
     * @param id the id of the extraUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/extra-users/{id}")
    public ResponseEntity<Void> deleteExtraUser(@PathVariable Long id) {
        log.debug("REST request to delete ExtraUser : {}", id);
        extraUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
