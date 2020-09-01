package smoothalgo.web.rest;

import smoothalgo.ZakatReminderApp;
import smoothalgo.domain.Zakat;
import smoothalgo.repository.ZakatRepository;
import smoothalgo.service.ZakatService;
import smoothalgo.service.dto.ZakatDTO;
import smoothalgo.service.mapper.ZakatMapper;
import smoothalgo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static smoothalgo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ZakatResource} REST controller.
 */
@SpringBootTest(classes = ZakatReminderApp.class)
public class ZakatResourceIT {

    private static final BigDecimal DEFAULT_DUE_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_DUE_AMOUNT = new BigDecimal(2);

    private static final BigDecimal DEFAULT_REMAINING_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_REMAINING_AMOUNT = new BigDecimal(2);

    @Autowired
    private ZakatRepository zakatRepository;

    @Autowired
    private ZakatMapper zakatMapper;

    @Autowired
    private ZakatService zakatService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restZakatMockMvc;

    private Zakat zakat;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZakatResource zakatResource = new ZakatResource(zakatService);
        this.restZakatMockMvc = MockMvcBuilders.standaloneSetup(zakatResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Zakat createEntity(EntityManager em) {
        Zakat zakat = new Zakat()
            .dueAmount(DEFAULT_DUE_AMOUNT)
            .remainingAmount(DEFAULT_REMAINING_AMOUNT);
        return zakat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Zakat createUpdatedEntity(EntityManager em) {
        Zakat zakat = new Zakat()
            .dueAmount(UPDATED_DUE_AMOUNT)
            .remainingAmount(UPDATED_REMAINING_AMOUNT);
        return zakat;
    }

    @BeforeEach
    public void initTest() {
        zakat = createEntity(em);
    }

    @Test
    @Transactional
    public void createZakat() throws Exception {
        int databaseSizeBeforeCreate = zakatRepository.findAll().size();

        // Create the Zakat
        ZakatDTO zakatDTO = zakatMapper.toDto(zakat);
        restZakatMockMvc.perform(post("/api/zakats")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zakatDTO)))
            .andExpect(status().isCreated());

        // Validate the Zakat in the database
        List<Zakat> zakatList = zakatRepository.findAll();
        assertThat(zakatList).hasSize(databaseSizeBeforeCreate + 1);
        Zakat testZakat = zakatList.get(zakatList.size() - 1);
        assertThat(testZakat.getDueAmount()).isEqualTo(DEFAULT_DUE_AMOUNT);
        assertThat(testZakat.getRemainingAmount()).isEqualTo(DEFAULT_REMAINING_AMOUNT);
    }

    @Test
    @Transactional
    public void createZakatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zakatRepository.findAll().size();

        // Create the Zakat with an existing ID
        zakat.setId(1L);
        ZakatDTO zakatDTO = zakatMapper.toDto(zakat);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZakatMockMvc.perform(post("/api/zakats")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zakatDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Zakat in the database
        List<Zakat> zakatList = zakatRepository.findAll();
        assertThat(zakatList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDueAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = zakatRepository.findAll().size();
        // set the field null
        zakat.setDueAmount(null);

        // Create the Zakat, which fails.
        ZakatDTO zakatDTO = zakatMapper.toDto(zakat);

        restZakatMockMvc.perform(post("/api/zakats")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zakatDTO)))
            .andExpect(status().isBadRequest());

        List<Zakat> zakatList = zakatRepository.findAll();
        assertThat(zakatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRemainingAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = zakatRepository.findAll().size();
        // set the field null
        zakat.setRemainingAmount(null);

        // Create the Zakat, which fails.
        ZakatDTO zakatDTO = zakatMapper.toDto(zakat);

        restZakatMockMvc.perform(post("/api/zakats")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zakatDTO)))
            .andExpect(status().isBadRequest());

        List<Zakat> zakatList = zakatRepository.findAll();
        assertThat(zakatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllZakats() throws Exception {
        // Initialize the database
        zakatRepository.saveAndFlush(zakat);

        // Get all the zakatList
        restZakatMockMvc.perform(get("/api/zakats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zakat.getId().intValue())))
            .andExpect(jsonPath("$.[*].dueAmount").value(hasItem(DEFAULT_DUE_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].remainingAmount").value(hasItem(DEFAULT_REMAINING_AMOUNT.intValue())));
    }
    
    @Test
    @Transactional
    public void getZakat() throws Exception {
        // Initialize the database
        zakatRepository.saveAndFlush(zakat);

        // Get the zakat
        restZakatMockMvc.perform(get("/api/zakats/{id}", zakat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(zakat.getId().intValue()))
            .andExpect(jsonPath("$.dueAmount").value(DEFAULT_DUE_AMOUNT.intValue()))
            .andExpect(jsonPath("$.remainingAmount").value(DEFAULT_REMAINING_AMOUNT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingZakat() throws Exception {
        // Get the zakat
        restZakatMockMvc.perform(get("/api/zakats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZakat() throws Exception {
        // Initialize the database
        zakatRepository.saveAndFlush(zakat);

        int databaseSizeBeforeUpdate = zakatRepository.findAll().size();

        // Update the zakat
        Zakat updatedZakat = zakatRepository.findById(zakat.getId()).get();
        // Disconnect from session so that the updates on updatedZakat are not directly saved in db
        em.detach(updatedZakat);
        updatedZakat
            .dueAmount(UPDATED_DUE_AMOUNT)
            .remainingAmount(UPDATED_REMAINING_AMOUNT);
        ZakatDTO zakatDTO = zakatMapper.toDto(updatedZakat);

        restZakatMockMvc.perform(put("/api/zakats")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zakatDTO)))
            .andExpect(status().isOk());

        // Validate the Zakat in the database
        List<Zakat> zakatList = zakatRepository.findAll();
        assertThat(zakatList).hasSize(databaseSizeBeforeUpdate);
        Zakat testZakat = zakatList.get(zakatList.size() - 1);
        assertThat(testZakat.getDueAmount()).isEqualTo(UPDATED_DUE_AMOUNT);
        assertThat(testZakat.getRemainingAmount()).isEqualTo(UPDATED_REMAINING_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingZakat() throws Exception {
        int databaseSizeBeforeUpdate = zakatRepository.findAll().size();

        // Create the Zakat
        ZakatDTO zakatDTO = zakatMapper.toDto(zakat);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZakatMockMvc.perform(put("/api/zakats")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(zakatDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Zakat in the database
        List<Zakat> zakatList = zakatRepository.findAll();
        assertThat(zakatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZakat() throws Exception {
        // Initialize the database
        zakatRepository.saveAndFlush(zakat);

        int databaseSizeBeforeDelete = zakatRepository.findAll().size();

        // Delete the zakat
        restZakatMockMvc.perform(delete("/api/zakats/{id}", zakat.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Zakat> zakatList = zakatRepository.findAll();
        assertThat(zakatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
