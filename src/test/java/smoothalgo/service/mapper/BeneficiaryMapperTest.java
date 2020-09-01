package smoothalgo.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class BeneficiaryMapperTest {

    private BeneficiaryMapper beneficiaryMapper;

    @BeforeEach
    public void setUp() {
        beneficiaryMapper = new BeneficiaryMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(beneficiaryMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(beneficiaryMapper.fromId(null)).isNull();
    }
}
